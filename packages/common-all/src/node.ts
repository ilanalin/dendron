/* eslint-disable no-loop-func */
import _ from "lodash";
import minimatch from "minimatch";
import moment from "moment";
import { URI } from "vscode-uri";
import YAML from "yamljs";
import { DendronError } from "./error";
import {
  DNodeData,
  DNodeDict,
  DNodeRawOpts,
  DNodeRawProps,
  IDNode,
  IDNodeOpts,
  IDNodeType,
  INote,
  INoteOpts,
  ISchema,
  ISchemaOpts,
  NoteData,
  NoteLink,
  NoteRawProps,
  SchemaData,
  SchemaDict,
  SchemaRawOpts,
  SchemaRawProps,
} from "./types";
import { genUUID } from "./uuid";

const UNKNOWN_SCHEMA_ID = "_UNKNOWN_SCHEMA";

export class DNodeUtils {
  /**
   * Last element of path
   *
   * // don't remove extension
   * basename(foo.bar.md) // foo.bar
   *
   * // remove extension
   * basename(foo.bar.md, true) // foo
   * @param nodePath
   * @param rmExtension
   */
  static basename(nodePath: string, rmExtension?: boolean) {
    if (rmExtension) {
      const idx = nodePath.lastIndexOf(".md");
      if (idx > 0) {
        nodePath = nodePath.slice(0, idx);
      }
    }
    const [first, ...rest] = nodePath.split(".");
    return _.isEmpty(rest) ? first : rest.slice(-1)[0];
  }

  /**
   * Second last element
   * @param nodePath
   */
  static dirName(nodePath: string) {
    return nodePath.split(".").slice(0, -1).join(".");
  }

  /**
   * First element
   * eg. domainName(foo.bar.baz) // foo
   * @param nodePath
   */
  static domainName(nodePath: string) {
    return nodePath.split(".")[0];
  }

  static findClosestParent(
    fpath: string,
    nodes: DNodeDict,
    opts?: { noStubs: boolean }
  ): IDNode {
    const cleanOpts = _.defaults(opts, { noStubs: false });
    const dirname = DNodeUtils.dirName(fpath);
    if (dirname === "") {
      return nodes["root"];
    }
    const maybeNode = _.find(nodes, { fname: dirname });
    if (maybeNode && !(maybeNode?.stub && cleanOpts.noStubs)) {
      return maybeNode;
    } else {
      return DNodeUtils.findClosestParent(dirname, nodes);
    }
  }

  /**
   *
   * @param note
   * - pullCustomUp: roll custom attributes to top level, default: false
   * @param opts
   */
  static getMeta(
    note: Note,
    opts?: { pullCustomUp?: boolean; ignoreNullParent?: boolean }
  ) {
    const { pullCustomUp, ignoreNullParent } = _.defaults(opts || {}, {
      pullCustomUp: false,
      ignoreNullParent: false,
    });
    let seed = {};
    let fields = [
      "id",
      "title",
      "desc",
      "updated",
      "created",
      "data",
      "fname",
      "stub",
    ];
    if (pullCustomUp) {
      seed = note.custom;
      fields = _.reject(fields, (ent) => ent === "custom");
    }
    const meta = { ...seed, ..._.pick(note, [...fields]) };
    const family = _.pick(note.toRawProps(true, { ignoreNullParent }), [
      "parent",
      "children",
    ]);
    return { ...meta, ...family };
  }

  static isRoot(node: DNode): boolean {
    return node.id === "root";
  }
}

export type CreatePropsOpts = {
  returnExtra: boolean;
};

export class DNodeRaw {
  /**
   *
   * @param nodeOpts
   * @param opts
   *   - returnExtra: if true, return extra properties, default: false
   */
  static createProps<T>(
    nodeOpts: DNodeRawOpts<T>
  ): DNodeRawProps<T> & { extra?: any } {
    const {
      id,
      desc,
      fname,
      updated,
      created,
      parent,
      stub,
      children,
      body,
      data,
    } = _.defaults(nodeOpts, {
      updated: moment.now(),
      created: moment.now(),
      id: genUUID(),
      desc: "",
      children: [],
      stub: false,
      parent: null,
      body: "",
      data: {},
      fname: null,
    });
    const title = nodeOpts.title || DNodeUtils.basename(fname);
    const nodePropsItems = {
      id,
      title,
      desc,
      fname,
      updated,
      created,
      parent,
      children,
      stub,
      body,
      data,
    };
    const denylist = ["schemaStub", "type"];
    const custom = _.omit(nodeOpts, _.keys(nodePropsItems).concat(denylist));
    const nodeProps: DNodeRawProps<T> & { extra?: any } = {
      ...nodePropsItems,
      custom,
    };
    return nodeProps;
  }
}

/*
Create Schema based on Minimal Props
- id: b111db5b-bc52-4977-893b-307522f89ea3
  title: "foo",
  parent: null
  children:
    - one
*/
export class SchemaNodeRaw {
  static createProps(opts: SchemaRawOpts): SchemaRawProps {
    opts.title = opts.title || opts.id;
    return DNodeRaw.createProps<SchemaData>(opts);
  }
}

type QuickPickItem = {
  label: string;

  /**
   * A human-readable string which is rendered less prominent in the same line. Supports rendering of
   * [theme icons](#ThemeIcon) via the `$(<name>)`-syntax.
   */
  description?: string;

  /**
   * A human-readable string which is rendered less prominent in a separate line. Supports rendering of
   * [theme icons](#ThemeIcon) via the `$(<name>)`-syntax.
   */
  detail?: string;

  /**
   * Optional flag indicating if this item is picked initially.
   * (Only honored when the picker allows multiple selections.)
   *
   * @see [QuickPickOptions.canPickMany](#QuickPickOptions.canPickMany)
   */
  picked?: boolean;

  /**
   * Always show this item.
   */
  alwaysShow?: boolean;
};

export abstract class DNode<T = DNodeData> implements IDNode<T>, QuickPickItem {
  public id: string;
  public title: string;
  public desc: string;
  public fname: string;
  public type: IDNodeType;
  public updated: string;
  public created: string;
  public parent: IDNode<T> | null;
  public children: IDNode<T>[];
  public body: string;
  public data: T;
  public label: string;
  public stub: boolean;
  public custom: any;
  public uri: URI;

  static defaultTitle(fname: string) {
    return _.capitalize(DNodeUtils.basename(fname, true));
  }

  constructor(opts: IDNodeOpts<T>) {
    const {
      id,
      title,
      desc,
      fname,
      type,
      updated,
      created,
      stub,
      body,
      data,
      children,
      custom,
    } = _.defaults(
      opts,
      DNodeRaw.createProps(_.defaults(opts, { parent: null, children: [] }))
    );

    this.id = id;
    this.title = title || fname.split(".").slice(-1)[0];
    this.desc = desc;
    this.fname = fname;
    this.type = type;
    this.updated = updated;
    this.created = created;
    this.parent = opts.parent ? opts.parent : null;
    this.children = children;
    this.body = body;
    this.data = data;
    this.label = DNodeUtils.isRoot(this) ? "root" : this.logicalPath;
    this.stub = stub;
    this.custom = custom;
    this.uri = URI.parse(`dendron://${fname}.md`);
  }

  get domain(): DNode<T> {
    if (this.parent?.id === "root" || _.isNull(this.parent)) {
      return this;
    }
    return this.parent.domain;
  }

  get basename(): string {
    return DNodeUtils.basename(this.logicalPath);
  }

  get detail(): string {
    return "";
  }

  /**
   * Self and all children
   */
  get nodes(): DNode<T>[] {
    const out: DNode<T>[] = [this as DNode<T>].concat(
      this.children.map((c) => c.nodes).flat()
    );
    return out;
  }

  /**
   * dot delimited path
   *  - for root node, its ""
   *  - for everything else, its the dot delimited name
   *  - used when showing query
   */
  get logicalPath(): string {
    if (this.fname === "root") {
      return "";
    } else {
      return this.fname;
    }
  }

  get path(): string {
    return this.fname;
  }

  addChild(node: IDNode<T>) {
    // only add if new
    if (!this.children.some((ent) => ent.id === node.id)) {
      this.children.push(node);
      node.parent = this;
    }
  }

  equal(node: IDNode<T>) {
    const props1 = this.toRawProps();
    const props2 = node.toRawProps();
    return _.every([
      _.isEqual(_.omit(props1, "body"), _.omit(props2, "body")),
      _.trim(props1.body) === _.trim(props2.body),
    ]);
  }

  // abstract match(identifier: any): boolean;

  renderBody(): string {
    return this.body;
  }

  toDocument() {
    return {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                text: this.renderBody(),
              },
            ],
          },
        ],
      },
    };
  }

  toRawProps(
    hideBody?: boolean,
    opts?: { ignoreNullParent: boolean }
  ): DNodeRawProps<T> {
    const { ignoreNullParent } = _.defaults(opts, { ignoreNullParent: false });
    const props = _.pick(this, [
      "id",
      "title",
      "desc",
      "type",
      "updated",
      "created",
      "body",
      "fname",
      "data",
      "stub",
      "custom",
    ]);
    let parent;
    if (hideBody) {
      delete props.body;
    }
    if (this.parent?.title === "root") {
      parent = "root";
    } else if (this.id === "root") {
      parent = null;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (_.isNull(this.parent)) {
        // parent deleted when publishing site
        if (ignoreNullParent) {
          parent = null;
        } else {
          throw Error(`${props.fname} has no parent node`);
        }
      } else {
        parent = this.parent.id;
      }
    }
    const children = this.children.map((c) => c.id);
    return { ...props, parent, children };
  }

  toRawPropsRecursive(): DNodeRawProps<T>[] {
    const parent: DNodeRawProps<T> = this.toRawProps();
    const children: DNodeRawProps<T>[] = this.children
      .map(
        (ch: DNode<T>) =>
          // @ts-ignore
          ch.toRawPropsRecursive()
        // eslint-disable-next-line function-paren-newline
      )
      .flat();
    // @ts-ignore
    const out = [parent].concat(children);
    return out.flat();
  }

  //othrow Error("to implement");
  //   return [];
  // }

  validate(): boolean {
    return true;
  }
}

export class Note extends DNode<NoteData> implements INote {
  public schemaId: string;
  public schema?: Schema;
  public schemaStub: boolean;

  static createStub(fname: string, opts?: Partial<INoteOpts>): Note {
    return new Note({ stub: true, fname, ...opts });
  }

  static createRoot(): Note {
    return new Note({ fname: "root", id: "root", title: "root" });
  }

  static fromSchema(dirpath: string, schema: Schema): Note {
    const fname = [dirpath, schema.id].join(".");
    const note = new Note({
      fname,
      schemaStub: true,
      data: { schemaId: schema.id },
    });
    note.schema = schema;
    return note;
  }

  constructor(props: INoteOpts) {
    const cleanProps = _.defaults(props, {
      parent: null,
      children: [],
      schemaStub: false,
    });
    super({
      type: "note",
      ...cleanProps,
    });
    this.schemaId = props?.data?.schemaId || "-1";
    this.schemaStub = cleanProps.schemaStub;
  }

  // vscode detail pane
  get detail(): string {
    if (this.schema && this.schemaStub) {
      return this.schema.desc;
    }
    return this.desc;
  }

  get description(): string | undefined {
    const prefixParts = [];
    if (this.title !== this.fname) {
      prefixParts.push(this.title);
    }
    if (this.stub || this.schemaStub) {
      prefixParts.push("$(gist-new)");
    }
    if (this.schema) {
      // case: unknown schema
      // eslint-disable-next-line no-use-before-define
      if (SchemaUtils.isUnkown(this.schema)) {
        prefixParts.push("$(question)");
        return prefixParts.join(" ");
      }

      // case: recognized schema
      prefixParts.push(`$(repo) ${this.schema.domain.title}`);
      // check if non-domain schema
      if (this.schema.domain.id !== this.schema.id) {
        prefixParts.push("$(breadcrumb-separator)");
        prefixParts.push(this.schema.title);
      }
    }
    return prefixParts.join(" ");
  }

  get domain(): Note {
    return super.domain as Note;
  }

  get url(): string {
    return `/doc/${this.id}`;
  }
}

export class Schema extends DNode<SchemaData> implements ISchema {
  static createRoot() {
    return new Schema({
      id: "root",
      title: "root",
      fname: "root.schema",
      parent: null,
      children: [],
    });
  }

  static _UNKNOWN_SCHEMA: undefined | Schema = undefined;

  /**
   * This is attached to notes that are part of a domain with schema but
   * don't match any schema in it
   */
  static createUnkownSchema(): Schema {
    if (_.isUndefined(Schema._UNKNOWN_SCHEMA)) {
      const props = SchemaNodeRaw.createProps({
        id: UNKNOWN_SCHEMA_ID,
        fname: UNKNOWN_SCHEMA_ID,
        stub: true,
        created: "-1",
        updated: "-1",
      });
      Schema._UNKNOWN_SCHEMA = new Schema({
        ...props,
        parent: null,
        children: [],
      });
    }
    return Schema._UNKNOWN_SCHEMA as Schema;
  }

  constructor(props: ISchemaOpts) {
    super({
      type: "schema",
      ..._.defaults(props, {
        parent: null,
        children: [],
        data: {},
      }),
    });
  }

  get namespace(): boolean {
    return this.data?.namespace || false;
  }

  get logicalPath(): string {
    const part = this.namespace ? `${this.id}/*` : this.id;
    if (this.parent && this.parent.id !== "root") {
      const prefix = this.parent.logicalPath;
      return [prefix, part].join("/");
    } else {
      return part;
    }
  }

  get url(): string {
    return `/schema/${this.id}`;
  }

  match(note: Note): boolean {
    // TODO: simple version
    return this.title === note.basename;
  }

  renderBody() {
    const out = _.map(this.toRawPropsRecursive(), (props) => {
      return _.pick(props, [
        "id",
        "title",
        "desc",
        "children",
        "parent",
        "data",
        "fname",
      ]);
    });
    return ["```", YAML.stringify(out, undefined, 4), "```"].join("\n");
  }
}

const matchSchemaPropsToId = (
  id: string,
  props: SchemaRawProps[]
): SchemaRawProps => {
  const out = _.find(props, (p) => _.some([p.id === id]));
  if (_.isUndefined(out)) {
    throw Error(`no match found for ${id}, props: ${props}`);
  }
  return out;
};

// TODO:move to node
function getRoot(nodes: NoteRawProps[]) {
  // nodes: {nodes}
  const rootNode = _.find(
    nodes,
    (ent) => ent.title === "root" || _.isNull(ent.parent)
  );
  if (!rootNode) {
    throw new DendronError("no root node found");
  }
  const node = new Note({ ...rootNode, parent: null, children: [] });
  return { node, childrenIds: rootNode.children };
}

/**
 * From nodes, return a connected note tree
 */
export class NodeBuilder {
  getDomainsRoot<T extends DNodeData>(
    nodes: DNodeRawProps<T>[]
  ): DNodeRawProps<T>[] {
    return _.filter(nodes, (ent) => ent.parent === "root");
  }

  toNote(item: NoteRawProps, parents: Note[], opts: { schemas: SchemaDict }) {
    const node = new Note({ ...item, parent: null, children: [] });
    if (node.schemaId) {
      node.schema = opts.schemas[node.schemaId];
    }
    const { parent: parentId, children } = item;
    const parent: Note = _.find(parents, { id: parentId }) as Note;
    // const parent = undefined;
    if (_.isUndefined(parent)) {
      const error = JSON.stringify({
        msg: "no parent found",
        parentId,
        parents: parents.map((p) => _.omit(p.toRawProps(), "body")),
        item: _.omit(item, "body"),
      });
      throw Error(error);
    }
    // NOTE: parents don't get resolved until this is called
    parent.addChild(node);
    // eslint-disable-next-line no-use-before-define
    if (node.schemaId === UNKNOWN_SCHEMA_ID) {
      // TODO: FRAGILE, might not work with root stubs
      // const domainSchema = assertExists<Schema>(node.domain.children[0].schema as Schema, "note domain does not have schema");
      //const domainSchema = assertExists<Schema>(node.domain.schema as Schema, "note domain does not have schema");
      node.schema = Schema.createUnkownSchema();
    }
    return { node, parent, children };
  }

  toSchema(item: SchemaRawProps, parent: Schema, props: SchemaRawProps[]) {
    // DEBUG: item: {item}, parents: {parents}
    const node = new Schema({ ...item, parent, children: [] });
    item.children.forEach((chId) => {
      const match = matchSchemaPropsToId(chId, props);
      return this.toSchema(match, node, props);
    });
    parent.addChild(node);
    return node;
  }

  buildNoteFromProps(
    props: NoteRawProps[],
    opts: { schemas: SchemaDict }
  ): Note[] {
    const { node: rootNode, childrenIds } = getRoot(props);
    const out = [];
    out.push([rootNode]);

    let parentNodes = [rootNode];
    let nodeIds = childrenIds;

    while (!_.isEmpty(nodeIds)) {
      const currentNodes: Note[] = [];

      nodeIds = nodeIds
        .map((id: string) => {
          const nodePropsList = props.filter(
            (ent) => ent.id === id
          ) as NoteRawProps[];
          if (nodePropsList.length > 1) {
            const fnames = nodePropsList.map((ent) => ent.fname).join(", ");
            throw Error(
              `found multiple notes with the same id. please check the following notes: ${fnames}`
            );
          }
          const nodeProps = nodePropsList[0];
          const { node, children } = this.toNote(nodeProps, parentNodes, opts);
          currentNodes.push(node);
          return children;
        })
        .flat();
      out.push(currentNodes);
      parentNodes = currentNodes;
    }
    return out.flat();
  }

  buildSchemaFromProps(props: SchemaRawProps[]) {
    const root = Schema.createRoot();
    const rootDomains: SchemaRawProps[] = this.getDomainsRoot<SchemaData>(
      props
    );
    let out = [root];
    rootDomains.forEach((rootRaw) => {
      const domain = this.toSchema(rootRaw, root, props);
      out = out.concat(domain.nodes as Schema[]);
    });
    // DEBUG ctx: "parseSchema", out:
    return out;
  }
}

function createBackLink(note: Note): NoteLink {
  return {
    type: "note",
    id: "[[" + note.fname + "]]",
  };
}

export class NoteUtils {
  static addBackLink(from: Note, to: Note): void {
    if (_.isUndefined(from.data.links)) {
      from.data.links = [];
    }
    from.data.links.push(createBackLink(to));
  }

  /**
   * @param from
   * @param to
   */
  static createStubNotes(from: Note, to: Note): Note[] {
    const stubNodes: Note[] = [];
    const fromPath = from.logicalPath;
    const toPath = to.logicalPath;
    const index = toPath.indexOf(fromPath) + fromPath.length;
    const diffPath = _.trimStart(toPath.slice(index), ".").split(".");
    let stubPath = fromPath;
    let parent = from;
    // last element is node
    diffPath.slice(0, -1).forEach((part) => {
      // handle starting from root, path = ""
      if (_.isEmpty(stubPath)) {
        stubPath = part;
      } else {
        stubPath += `.${part}`;
      }
      const n = Note.createStub(stubPath);
      stubNodes.push(n);
      parent.addChild(n);
      parent = n;
    });
    parent.addChild(to);
    return stubNodes;
  }
}

export class SchemaUtils {
  static isUnkown(schema: Schema) {
    return schema.id === UNKNOWN_SCHEMA_ID;
  }

  /**
   *
   * @param noteOrPath
   * @param schemas
   * @param opts
   *   - matchNamespace: should match exact namespace note (in addition to wildcard), default: false
   *   - matchPrefix: allow prefix match, default: false
   */
  static matchNote(
    noteOrPath: Note | string,
    schemas: SchemaDict,
    opts?: { matchNamespace?: boolean; matchPrefix?: boolean }
  ): Schema {
    const cleanOpts = _.defaults(opts, {
      matchNamespace: true,
      matchPrefix: false,
    });
    const notePath = _.isString(noteOrPath) ? noteOrPath : noteOrPath.path;
    const notePathClean = notePath.replace(/\./g, "/");
    const out = _.find(_.values(schemas), (schema) => {
      const logicalPath = schema.logicalPath;
      if (schema.namespace && cleanOpts.matchNamespace) {
        if (minimatch(notePathClean, _.trimEnd(logicalPath, "/*"))) {
          return true;
        }
      }
      return minimatch(notePathClean, logicalPath);
    });
    if (_.isUndefined(out)) {
      return Schema.createUnkownSchema();
    }
    return out;
  }

  // static matchNote(note: Note, schemas: SchemaDict): Schema{
  //   const matches = _.filter(_.values(schemas), schema => {
  //      return minimatch(note.path.replace(/\./g, '/'), schema.logicalPath);
  //    });
  //    if (_.isEmpty(matches)) {
  //     return Schema.createUnkownSchema();
  //    } else if (matches.length > 1) {
  //      console.log("BOND");
  //      // TODO
  //    } else {
  //      return matches;
  //    }
  // }V
}
