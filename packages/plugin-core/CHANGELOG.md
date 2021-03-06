# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.3](https://github.com/dendronhq/dendron/compare/v0.4.2...v0.4.3) (2020-07-30)

### Bug Fixes

- issue with journal names on windows ([d0bfe7f](https://github.com/dendronhq/dendron/commit/d0bfe7fb0288e8610fc4b177ee85697a8ebc3efe))
- logging bad nodes ([c013e00](https://github.com/dendronhq/dendron/commit/c013e00faff9d7a9cce7743020cb97507f826943))

### Features

- CI/CD testing ([d6ce68c](https://github.com/dendronhq/dendron/commit/d6ce68c720d7e8c96d7f4bb6ab390c1bd52c5218))
  - Dendron now has continuous integration tests for all pushes. ![](https://travis-ci.com/dendronhq/dendron.svg?branch=master)
  - Tests run on mac, linux and windows which means moving forward, there should be fewer OS related issues
- Publish local images when publishing site ([f60360d](https://github.com/dendronhq/dendron/commit/f60360d94b8149404032fc77cfa7556801768105))
  - any images you have added using [paste images](https://www.dendron.so/notes/a91fd8da-6895-49fe-8164-a17acd8d9a17.html) will now automatically be included when you run `Build Pod`

## [0.4.2](https://github.com/dendronhq/dendron/compare/v0.4.1...v0.4.2) (2020-07-30)

### Bug Fixes

- issue with backfill ([65f93e8](https://github.com/dendronhq/dendron/commit/65f93e8e81929ca2277b83a608d15a10d35cc5b3))
- root should have no parent ([bab72fd](https://github.com/dendronhq/dendron/commit/bab72fd438c541673c128caf96174d43b8eaa43a))
- stub nodes should keep parents when deleted ([f32f291](https://github.com/dendronhq/dendron/commit/f32f291bc7a1ddd6c542483730e2db74b400dafa))

### Features

- add doctor command ([d4fa71c](https://github.com/dendronhq/dendron/commit/d4fa71cd839782587d47a3ba1b0f7e89742e7ffe)) ([docs](https://www.dendron.so/notes/eea2b078-1acc-4071-a14e-18299fc28f47.html#doctor))
- backfill command ([91b2193](https://github.com/dendronhq/dendron/commit/91b21932aec72b111e1e9d458a8c7c3817c68bbe))
- backfill ids when running doctor ([3705234](https://github.com/dendronhq/dendron/commit/37052342de88107f928b16595587492e601c9831))
- publishing vaults to github ([e063732](https://github.com/dendronhq/dendron/commit/e063732d1ff082dd8520a479926e7ceb1b0893ab)) ([docs](https://www.dendron.so/notes/73d395c9-5041-4d0d-9db7-080d9586136e.html))
- convert wiki-links to markdown links while building site ([f451be4](https://github.com/dendronhq/dendron/commit/f451be4db437a9cd6c290019fd5d24fe4fd9e907))
- overwrite fields in backfill ([af504f4](https://github.com/dendronhq/dendron/commit/af504f44d73910e8687367bc203b613d774a039c))
- setup initial workspace to be ready for publishing ([e1242b4](https://github.com/dendronhq/dendron/commit/e1242b494cc91b3284053b54dccecc4e4686ab7d))
- support custom root when publishing a site ([41e3d72](https://github.com/dendronhq/dendron/commit/41e3d7283bf5719a62f8f7f6f612dc9ad07370f7))

### Performance Improvements

- add timing data ([ffef382](https://github.com/dendronhq/dendron/commit/ffef38294cd04fac6d6784865c43c7fa8af62abd))

## [0.4.1](https://github.com/dendronhq/dendron/compare/v0.4.0...v0.4.1) (2020-07-26)

**Note:** Version bump only for package root

## 0.4.0 (2020-07-26)

### Release Notes

<a href="https://marketplace.visualstudio.com/items?itemName=dendron.dendron">Version 0.4.0</a> is out 🎉 Read about the new features and fixes in our <a href="https://www.dendron.so/release.2020-07-25">release notes</a></div>

## [0.3.47](https://github.com/dendronhq/dendron/compare/v0.3.46...v0.3.47) (2020-07-26)

### Features

- initialize new vault with git ([7278b6f](https://github.com/dendronhq/dendron/commit/7278b6fbbf4e175815a0a069c449ad7ef479a77e))

## [0.3.46](https://github.com/dendronhq/dendron/compare/v0.3.45...v0.3.46) (2020-07-25)

### Features

- keyboard shortcuts for scratch and journal notes ([076fa18](https://github.com/dendronhq/dendron/commit/076fa18ceb0836736e123d7439af31da00cc2ec2))

## [0.3.45](https://github.com/dendronhq/dendron/compare/v0.3.44...v0.3.45) (2020-07-24)

### Features

- better scratch notes, [docs](https://github.com/dendronhq/dendron-template/blob/master/vault/pro.dendron.topic.special-notes.md#scratch-note) ([f1d0f94](https://github.com/dendronhq/dendron/commit/f1d0f94e871984428d442c8b54d130fff53b2b91))
- creating journals copies path to clipboard ([a34fc81](https://github.com/dendronhq/dendron/commit/a34fc815454e0e86112d5a507dd0013ec37a0edb))

## [0.3.44](https://github.com/dendronhq/dendron/compare/v0.3.43...v0.3.44) (2020-07-24)

**Note:** Version bump only for package root

## [0.3.43](https://github.com/dendronhq/dendron/compare/v0.3.42...v0.3.43) (2020-07-23)

### Features

- new getting started experience ([dd4f50e](https://github.com/dendronhq/dendron/commit/dd4f50eb169e7f9686c4e3fbabca3b2a6c1e1bb7))

## [0.3.42](https://github.com/dendronhq/dendron/compare/v0.3.41...v0.3.42) (2020-07-23)

### Features

- change workspaces accepts '~' path ([d6c4f64](https://github.com/dendronhq/dendron/commit/d6c4f64cdfbb9e6b5c44a04320a84756fefcb924))

## [0.3.41](https://github.com/dendronhq/dendron/compare/v0.3.40...v0.3.41) (2020-07-23)

### Bug Fixes

- dendron complain about engine not being initialized ([d461109](https://github.com/dendronhq/dendron/commit/d461109019609cb272fa24c6dca1fd65f82528c9))
- don't create journal entry if user cancels ([e763178](https://github.com/dendronhq/dendron/commit/e763178cae6f0c763bc432617a0e8b15f2dff532))

## [0.3.40](https://github.com/dendronhq/dendron/compare/v0.3.39...v0.3.40) (2020-07-23)

**Note:** Version bump only for package root

## [0.3.39](https://github.com/dendronhq/dendron/compare/v0.3.38...v0.3.39) (2020-07-23)

**Note:** Version bump only for package root

## [0.3.38](https://github.com/dendronhq/dendron/compare/v0.3.37...v0.3.38) (2020-07-23)

**Note:** Version bump only for package root

## [0.3.37](https://github.com/dendronhq/dendron/compare/v0.3.36...v0.3.37) (2020-07-22)

**Note:** Version bump only for package root

## [0.3.36](https://github.com/dendronhq/dendron/compare/v0.3.35...v0.3.36) (2020-07-22)

### Bug Fixes

- issue with new journal notes not initializing ([63e3e63](https://github.com/dendronhq/dendron/commit/63e3e63bd246ae7fd1587e6ea95c66ebf943bc36))

## [0.3.35](https://github.com/dendronhq/dendron/compare/v0.3.33...v0.3.35) (2020-07-22)

### Features

- add a openLogs command to help debug issues ([4f223fc](https://github.com/dendronhq/dendron/commit/4f223fc318fe033471252611c8f41d505dca1055))

## [0.3.34](https://github.com/dendronhq/dendron/compare/v0.3.33...v0.3.34) (2020-07-22)

### Features

- add a openLogs command to help debug issues ([4f223fc](https://github.com/dendronhq/dendron/commit/4f223fc318fe033471252611c8f41d505dca1055))

## [0.3.33](https://github.com/dendronhq/dendron/compare/v0.3.32...v0.3.33) (2020-07-22)

### Bug Fixes

- bad extension identifier ([a234b23](https://github.com/dendronhq/dendron/commit/a234b23b27b6e72ec5683b4c90db29149bb3a167))
- dispose of file watchers on extension deactivate ([3ef52e1](https://github.com/dendronhq/dendron/commit/3ef52e18ec26bd5b50e24f7ada69c05e0b569383))

## [0.3.31](https://github.com/dendronhq/dendron/compare/v0.3.30...v0.3.31) (2020-07-22)

### Manual Changes

🚨NOTE: if you are upgrading from version 0.3.30 or lower, manual action is needed!🚨

We've forked a bunch of the core vscode extensions to make them work better with Dendron. You will need to uninstall the previous extension and install the Dendron version of these extensions.

Changes you will need to make

Remove the following extensions and replace them with their `Dendron *` counterparts. VSCode should automatically recommend that you install them but if not, you can find the extensions by adding `Dendron` in front of the extension name (eg. Markdown Links -> Dendron Markdown Links)

- Markdown Links:
  - why: support showing graphs based on dendron's hierarchy
- Markdown Preview Enhanced:
  - why: Fix some link bugs and upcoming integration with how Dendron handles frontmatter
- Markdown Shortcuts:
  - why: Remove some default keybindings that were interferring with Dendron bindings on Linux and Windows
- Markdown Notes:
  - why: required for integrating new note creation via link with Dendron and other upcoming features

After you've made the above changes, you can run `Developer: Reload Window` for the changes to take effect.

### Features

- add reload index command ([236b2ac](https://github.com/dendronhq/dendron/commit/236b2ac70812c4df525ff27479802b6e49e0587f))
- initialize default workspace with relative paths so that its portable btw devices ([790ef50](https://github.com/dendronhq/dendron/commit/790ef503225e5b18a78e3e62e847ba8b2adfd8d0))
- upgrade settings command ([c043090](https://github.com/dendronhq/dendron/commit/c0430905d314c6ee870f9bdd45434f53e93a7098))

## [0.3.30](https://github.com/dendronhq/dendron/compare/v0.3.29...v0.3.30) (2020-07-21)

### Features

- custom front matter support [docs](https://github.com/dendronhq/dendron-template/blob/master/vault/pro.dendron.topic.frontmatter.md) ([dadd3fd](https://github.com/dendronhq/dendron/commit/dadd3fd16e2814e378b7af3c097b556c92981de3))
- remove un-used frontmatter ([e059346](https://github.com/dendronhq/dendron/commit/e0593467fca94a4d29dc9463721a99e67881cfb3))

## [0.3.23](https://github.com/dendronhq/dendron/compare/v0.3.22...v0.3.23) (2020-07-20)

### Bug Fixes

- markdown preview will now open local links ([10a3418](https://github.com/dendronhq/dendron/commit/10a3418f7a633fa9b5294794e1a912cb4ea6c066))

### Features

- basic windows support ([a789ec5](https://github.com/dendronhq/dendron/commit/a789ec5792301103d302739f00b595509128d367))

## [0.3.21](https://github.com/dendronhq/dendron/compare/v0.3.20...v0.3.21) (2020-07-19)

### Features

- add graph view [docs](https://github.com/dendronhq/dendron-template/blob/master/vault/dendron.topic.graph-view.md) ([129bf4e](https://github.com/dendronhq/dendron/commit/129bf4e4e480dfbff66530725c6db8d2321adc28))

## [0.3.20](https://github.com/dendronhq/dendron/compare/v0.3.19...v0.3.20) (2020-07-18)

### Bug Fixes

- handle special characters in file names when importing using LocalFilePod ([03e42b1](https://github.com/dendronhq/dendron/commit/03e42b167ac9f073cd56f10c4e31b5cecf66dabf))

## [0.3.19](https://github.com/dendronhq/dendron/compare/v0.3.18...v0.3.19) (2020-07-18)

### Features

- show busy ui when engine is searching ([4fc7256](https://github.com/dendronhq/dendron/commit/4fc72565c139177bd725a5599c8954c2cceed8ab))

## [0.3.18](https://github.com/dendronhq/dendron/compare/v0.3.17...v0.3.18) (2020-07-18)

### Bug Fixes

- github banner occluding text on mobile devices ([972a51d](https://github.com/dendronhq/dendron/commit/972a51df165d10b87cc8770a5264201e7239ad82))
- surface errors to user if bad frontmatter ([03107f4](https://github.com/dendronhq/dendron/commit/03107f413626362c8efde99328d9b0712e286441))

### Features

- ability to import notes from local file system [docs](https://github.com/dendronhq/dendron-template/blob/master/vault/dendron.topic.pod.md) ([e44fd11](https://github.com/dendronhq/dendron/commit/e44fd1133bec10f22831f059c8d98cf4076dcdcc))

## [0.3.17](https://github.com/dendronhq/dendron/compare/v0.3.16...v0.3.17) (2020-07-17)

### Features

- more flexible file names for [journal notes](https://github.com/dendronhq/dendron-template/blob/master/vault/dendron.special-notes.md) ([9d9f10b](https://github.com/dendronhq/dendron/commit/9d9f10bd0873c201361c4625fc49c9f62ee82991))
- open non-markdown files using native apps. [docs](https://github.com/dendronhq/dendron-template/blob/master/vault/dendron.feature.links.md) ([7f630d1](https://github.com/dendronhq/dendron/commit/7f630d1fb95d5c0d28fc5a83f4cee27bc17d452c))

## [0.3.16](https://github.com/dendronhq/dendron/compare/v0.3.15...v0.3.16) (2020-07-16)

### Features

- implement journal notes. see details here: https://github.com/dendronhq/dendron-template/blob/master/vault/dendron.feature.journals.md ([5e1236f](https://github.com/dendronhq/dendron/commit/5e1236fddbf1e0fddf4c27d1a40e9841cc99974f))
- set relative rootDir ([65bbd77](https://github.com/dendronhq/dendron/commit/65bbd77e1bc49f45776904232953dba6b4c2cca9))

## [0.3.15](https://github.com/dendronhq/dendron/compare/v0.3.14...v0.3.15) (2020-07-14)

### Bug Fixes

- don't show duplicates when surfacing schema suggestions ([d1716cc](https://github.com/dendronhq/dendron/commit/d1716ccfc3e03ffaddc8e52a3be301af926be029))
- schema suggestions not always showing ([658c9e3](https://github.com/dendronhq/dendron/commit/658c9e3215cccf1875138928a3c9a8486052b63a))

### Features

- scratch note command ([71d8433](https://github.com/dendronhq/dendron/commit/71d8433fbd10651ec7fcd13a5f7ee41199a43632))
- show note title if differ from file name ([c0e428d](https://github.com/dendronhq/dendron/commit/c0e428d259ef116d66cbe1107d7760cbb84f8d20))

## [0.3.14](https://github.com/dendronhq/dendron/compare/v0.3.13...v0.3.14) (2020-07-14)

### Performance Improvements

- add webpack to optimize bundle ([4502e49](https://github.com/dendronhq/dendron/commit/4502e49f79d490bb639d2daaf93f841e5b18449d))

## [0.3.13](https://github.com/dendronhq/dendron/compare/v0.3.12...v0.3.13) (2020-07-14)

### Features

- ability to re-use existing workspace ([7de80b1](https://github.com/dendronhq/dendron/commit/7de80b17cac4123336afb3d0dc902f22f1a0e488))

## [0.3.11](https://github.com/dendronhq/dendron/compare/v0.3.10...v0.3.11) (2020-07-13)

### Bug Fixes

- issue creating stubs ([5647a33](https://github.com/dendronhq/dendron/commit/5647a3307d4b1e42be49842db8de0a1da3d2127f))

## [0.3.10](https://github.com/dendronhq/dendron/compare/v0.1.6...v0.3.10) (2020-07-13)

### Bug Fixes

- add bond ([6e57f0c](https://github.com/dendronhq/dendron/commit/6e57f0cc03683106fef26ebebdad4408bb469342))
- issue with create new note not updating ([480d294](https://github.com/dendronhq/dendron/commit/480d29451e7db5370c6e693144d37039199396c7))
- no flickering when surfacing "create new" suggestion ([102b997](https://github.com/dendronhq/dendron/commit/102b997a3064db646743d5a1256f48614fe92964))
- remove test file ([734803f](https://github.com/dendronhq/dendron/commit/734803ffc8fcfe84433a50c0f411ea87ba8aa695))
- update lerna ([d422e5c](https://github.com/dendronhq/dendron/commit/d422e5c9266d2d7c5c7e697d062b4e2fbc718358))

### Features

- add delete note shortcut ([8b5a58b](https://github.com/dendronhq/dendron/commit/8b5a58bb41cceb5cdc59e826150aa3d3508cffb9))
- add material theme ([3973fbf](https://github.com/dendronhq/dendron/commit/3973fbf70ee776c9bb527cc218d801bca4ea2f99))
- auto add nodes when deleted or created outside of dendron ([8c311bd](https://github.com/dendronhq/dendron/commit/8c311bda948a1d54088c49fd70eb65d24af5d68f))
- better initial welcome page ([f8767c6](https://github.com/dendronhq/dendron/commit/f8767c694bd5a5516a1a052f66bce0dff74fc7db))
- better schema suggestions ([03656bc](https://github.com/dendronhq/dendron/commit/03656bc007810457cb6846f0d6adacab4a7fbd3a))
- delete, abort or work inside existing folder when creating new workspace ([1da29ec](https://github.com/dendronhq/dendron/commit/1da29ec158ec416b9ee3002faf5bb2c4b84e12ed))
- initialize workspace with autosave ([cd63346](https://github.com/dendronhq/dendron/commit/cd633462ea9ee050ad27de3de1633fa49a9ff453))
- limit initial query to just domains ([1b611e5](https://github.com/dendronhq/dendron/commit/1b611e5e55dd8e81123895a40814aa2c8f4f7eaa))
- match namespace schemas ([7a67b8b](https://github.com/dendronhq/dendron/commit/7a67b8b2fb7caa1b97ee6d492d2801782abecdf6))
- os specific keybindings ([6a016ee](https://github.com/dendronhq/dendron/commit/6a016ee34bc6e2213f46ea9aa738068b14313899))
- set default folder for all platforms ([64649d8](https://github.com/dendronhq/dendron/commit/64649d82bce35bae5db09cc83af1f398b760008a))
- show basename of node after deletion ([4c8b72e](https://github.com/dendronhq/dendron/commit/4c8b72ee8a321eb17b68b2571cddf37e57249ca7))
- show node descriptions ([aca86f2](https://github.com/dendronhq/dendron/commit/aca86f2a5fd6ee481f93553693a098db0e322890))
- show schema recommendations when no suggestions are available ([00e8b7c](https://github.com/dendronhq/dendron/commit/00e8b7c88f572487fd59fe64854a352e6c549563))
- show schema suggestion at same level as query ([830c50d](https://github.com/dendronhq/dendron/commit/830c50da3a5cddfceeec48e8c0ec2ae68af51e77))
- show schema suggestions ([1313e79](https://github.com/dendronhq/dendron/commit/1313e799874c5f706eb32342bbe86429e6ba0998))
- show schema with results ([188fdeb](https://github.com/dendronhq/dendron/commit/188fdeb760010cd6767fb47e46cdfa757371a70b))
- support automatic config updates ([637682c](https://github.com/dendronhq/dendron/commit/637682cd2c639102c0ea72a390bc781ffe6ac307))
- surface unknown schemas ([d014965](https://github.com/dendronhq/dendron/commit/d0149652c985c69a4b2607984d578902820077f1))
- update first time onboarding ([1edadf2](https://github.com/dendronhq/dendron/commit/1edadf2ff05ffb5b5fae1ca7e20513d327983043))
- update logo ([920251d](https://github.com/dendronhq/dendron/commit/920251d1c85fa5ec5094b2d0b0aa400f39f8808b))
- updated icons for schemas ([21804eb](https://github.com/dendronhq/dendron/commit/21804eba61c8dd49e499edd5d548d9d601224e8e))

## [0.3.9](https://github.com/kevinslin/dendronv2/compare/v0.3.8...v0.3.9) (2020-07-09)

### Features

- better initial welcome page ([59b8a31](https://github.com/kevinslin/dendronv2/commit/59b8a3140b1f207aad81ab17fcc4e89570961845))
- set default folder for all platforms ([b16def5](https://github.com/kevinslin/dendronv2/commit/b16def56e78da165e4b3af8f27b288add98ace3f))
- show basename of node after deletion ([fe43708](https://github.com/kevinslin/dendronv2/commit/fe4370828d775a6b418a92dfb9c724828d856664))
- updated icons for schemas ([b7a2d8a](https://github.com/kevinslin/dendronv2/commit/b7a2d8aa517cf88d7a93d07cd2ef19305e48d069))

## [0.3.7](https://github.com/kevinslin/dendronv2/compare/v0.3.6...v0.3.7) (2020-07-08)

### Features

- better schema suggestions ([ad74bc0](https://github.com/kevinslin/dendronv2/commit/ad74bc009e1544319a49689394ab8d6b684f6578))
- limit initial query to just domains ([7ca010b](https://github.com/kevinslin/dendronv2/commit/7ca010bcfb1217b8ef3facbb47d69315207aff3a))
- show node descriptions ([e08fce9](https://github.com/kevinslin/dendronv2/commit/e08fce994153e28fe504b85e6d9bc1f5fdd93e20))
- show schema recommendations when no suggestions are available ([98aa467](https://github.com/kevinslin/dendronv2/commit/98aa4672297a754b695a3c965d8af9603e8a3724))
- show schema suggestion at same level as query ([14e73fd](https://github.com/kevinslin/dendronv2/commit/14e73fd8c35a0ec01818ab5f8e20835351716dc2))

## [0.3.6](https://github.com/kevinslin/dendronv2/compare/v0.3.5...v0.3.6) (2020-07-07)

### Features

- auto add nodes when deleted or created outside of dendron ([a7e1ac9](https://github.com/kevinslin/dendronv2/commit/a7e1ac9b8a4f7f0592ab1b9f86a7a40182693a73))
- os specific keybindings ([0b49cb9](https://github.com/kevinslin/dendronv2/commit/0b49cb99e27148e88747876e4cbebd8d0ac7bba6))
- support automatic config updates ([82ea9a2](https://github.com/kevinslin/dendronv2/commit/82ea9a2abe03c7ec98990f596c05402b7cebb5af))

## [0.3.5](https://github.com/kevinslin/dendronv2/compare/v0.3.4...v0.3.5) (2020-07-07)

### Features

- update logo ([8eeb6a3](https://github.com/kevinslin/dendronv2/commit/8eeb6a3b6f5a54d558ee8ebaa635139fbbbc3631))

## [0.3.2](https://github.com/kevinslin/dendronv2/compare/v0.3.1...v0.3.2) (2020-07-07)

### Features

- add delete note shortcut ([0ba99a7](https://github.com/kevinslin/dendronv2/commit/0ba99a7d2d73fcddae3633703312fc0ad14e179d))
- delete, abort or work inside existing folder when creating new workspace ([06d2dbe](https://github.com/kevinslin/dendronv2/commit/06d2dbe55ee99c5e2c8c60a152c6294d05fa5c91))
- update first time onboarding ([d0958c0](https://github.com/kevinslin/dendronv2/commit/d0958c02d4f356f6eacc7e37d2f24c485a9af8fc))

## [0.3.1](https://github.com/kevinslin/dendronv2/compare/v0.3.0...v0.3.1) (2020-07-05)

### Features

- add material theme ([c9f8082](https://github.com/kevinslin/dendronv2/commit/c9f808288470015070d585146e593b55a80c4f82))

# [0.3.0](https://github.com/kevinslin/dendronv2/compare/v0.2.20...v0.3.0) (2020-07-05)

### Bug Fixes

- issue with create new note not updating ([502b5e6](https://github.com/kevinslin/dendronv2/commit/502b5e62ed51a50ef3dccde95806c3a83a026628))
- no flickering when surfacing "create new" suggestion ([5b765bf](https://github.com/kevinslin/dendronv2/commit/5b765bf2d33893484784be25851c324900829e6a))

### Features

- initialize workspace with autosave ([34eb272](https://github.com/kevinslin/dendronv2/commit/34eb2723d8f32adba2daf1fee7c687df7bfdd592))
- match namespace schemas ([1a960bf](https://github.com/kevinslin/dendronv2/commit/1a960bf26f8984e541b3eb118f60bdc09d8250fe))
- show schema suggestions ([5680a74](https://github.com/kevinslin/dendronv2/commit/5680a7426f35b0c43680d8b3b0011dfc0eb0d6f1))
- show schema with results ([5d7294d](https://github.com/kevinslin/dendronv2/commit/5d7294dfab1b5e4c177dd1c95d504ffcaafd09d0))
- surface unknown schemas ([9bf4d0e](https://github.com/kevinslin/dendronv2/commit/9bf4d0e61cce2f76bddae1f686f29474201466cb))

## [0.2.20](https://github.com/kevinslin/dendronv2/compare/v0.2.19...v0.2.20) (2020-07-04)

**Note:** Version bump only for package root
