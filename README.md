<!-- TITLE/ -->
# jest-image-matcher
<!-- /TITLE -->

<!-- BADGES/ -->
  <p>
    <a href="https://npmjs.org/package/jest-image-matcher">
      <img
        src="https://img.shields.io/npm/v/jest-image-matcher.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/jest-image-matcher/actions">
      <img
        src="https://github.com/dword-design/jest-image-matcher/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/jest-image-matcher">
      <img
        src="https://codecov.io/gh/dword-design/jest-image-matcher/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/jest-image-matcher">
      <img src="https://img.shields.io/david/dword-design/jest-image-matcher" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/jest-image-matcher">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        height="32"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        height="32"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://sebastianlandwehr.com/images/paypal.svg"
        alt="PayPal"
        height="32"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://sebastianlandwehr.com/images/patreon.svg"
        alt="Patreon"
        height="32"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
A Jest matcher for image comparisons based on pixelmatch. Can also be used with Mocha. Useful for visual regression testing.
<!-- /DESCRIPTION -->

This package is solely for image comparisons and is inspired by packages like [chai-image](https://www.npmjs.com/package/chai-image). If you want to have snapshot testing, there are packages like [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot).

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install jest-image-matcher

# Yarn
$ yarn add jest-image-matcher
```
<!-- /INSTALL -->

## Usage

```js
import { toMatchImage } from 'jest-image-matcher'
import fs from 'fs'

// register the matcher
expect.extend({ toMatchImage })

it('should match', async () => {
  // get an image from somewhere as a buffer,
  // like reading it from the file system
  const image1 = fs.readFileSync('image1.png')
  const image2 = fs.readFileSync('image2.png')
  expect(image1).toMatchImage(image2)
})
```

Compare to a file directly:
```js
it('should match', () => {
  …
  expect(image).toMatchImage('image.png')
})
```

Save the diff to a file if the images do not match:
```js
it('should match', () => {
  …
  expect(image).toMatchImage('image.png', { diffPath: 'diff.png' })
})
```

Output the base64 diff image for debugging on CI servers:
```js
it('should match', () => {
  …
  expect(image).toMatchImage('image.png', { dumpDiffToConsole: true })
})
```

Usage with [puppeteer](https://www.npmjs.com/package/puppeteer):
```js
it('should match', async () => {
  const screenshot = await page.screenshot()
  expect(screenshot).toMatchImage('screenshot.png')
})
```

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/jest-image-matcher/issues) or a [pull request](https://github.com/dword-design/jest-image-matcher/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      height="32"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      height="32"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      height="32"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## See Also

* [output-files](https://github.com/dword-design/output-files): Output a tree of files and directories by providing an object. Especially useful for testing with real files.
* [with-local-tmp-dir](https://github.com/dword-design/with-local-tmp-dir): Creates a temporary folder inside cwd, cds inside the folder, runs a function, and removes the folder. Especially useful for testing.
* [expect-mocha-image-snapshot](https://github.com/dword-design/expect-mocha-image-snapshot): A wrapper around jest-image-snapshot that makes it compatible to Mocha.
* [unify-mocha-output](https://github.com/dword-design/unify-mocha-output): Adjusts a Mocha output so that it is consistent across platforms and can be used for snapshot testing. Basically adjusts the checkmark symbol and removes time values.
* [mock-argv](https://github.com/dword-design/mock-argv): Temporarily overrides the command line arguments. This is useful for testing.

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
