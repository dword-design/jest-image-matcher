<!-- TITLE/ -->
# jest-image-matcher
<!-- /TITLE -->

<!-- BADGES/ -->
[![NPM version](https://img.shields.io/npm/v/jest-image-matcher.svg)](https://npmjs.org/package/jest-image-matcher)
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)
[![Build status](https://github.com/dword-design/jest-image-matcher/workflows/build/badge.svg)](https://github.com/dword-design/jest-image-matcher/actions)
[![Coverage status](https://img.shields.io/coveralls/dword-design/jest-image-matcher)](https://coveralls.io/github/dword-design/jest-image-matcher)
[![Dependency status](https://img.shields.io/david/dword-design/jest-image-matcher)](https://david-dm.org/dword-design/jest-image-matcher)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

<a href="https://gitpod.io/#https://github.com/dword-design/bar">
  <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod">
</a><a href="https://www.buymeacoffee.com/dword">
  <img
    src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
    alt="Buy Me a Coffee"
    height="32"
  >
</a><a href="https://paypal.me/SebastianLandwehr">
  <img
    src="https://dword-design.de/images/paypal.svg"
    alt="PayPal"
    height="32"
  >
</a><a href="https://www.patreon.com/dworddesign">
  <img
    src="https://dword-design.de/images/patreon.svg"
    alt="Patreon"
    height="32"
  >
</a>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
A Jest matcher for image comparisons based on pixelmatch. Can also be used with Mocha. Useful for visual regression testing.
<!-- /DESCRIPTION -->

This package is solely for image comparisons and is inspired by packages like [chai-image](https://www.npmjs.com/package/chai-image). If you want to have snapshot testing, there are packages like [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot).

<!-- INSTALL/ -->
## Install

```bash
# NPM
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
  expect(image1).toMatchImage('image.png')
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
## License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->
