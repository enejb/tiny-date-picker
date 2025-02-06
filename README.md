# Tiny Date Picker

[![NpmLicense](https://img.shields.io/npm/l/@verivox/tiny-date-picker.svg?style=flat-square)](https://www.npmjs.com/package/@verivox/tiny-date-picker)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@verivox/tiny-date-picker.svg?style=flat-square)](https://www.npmjs.com/package/@verivox/tiny-date-picker)
[![npm (scoped)](https://img.shields.io/npm/v/@verivox/tiny-date-picker.svg?style=flat-square)](https://www.npmjs.com/package/@verivox/tiny-date-picker)

A light-weight date picker with zero dependencies

- Typescript
- Zero dependencies
- Roughly [5KB minified and gzipped](https://bundlephobia.com/result?p=@verivox/tiny-date-picker)
- Mobile-friendly/responsive
- Supports multiple languages

TinyDatePicker was originally developed by [Chris Davies](https://github.com/chrisdavies/tiny-date-picker), but seems to be discontinued.


## Installation

    npm install --save @verivox/tiny-date-picker


## Usage

Include a reference to `tiny-date-picker.css` and `tiny-date-picker.js`, or import it `import TinyDatePicker from 'tiny-date-picker';` then call it like this:

```javascript
// Initialize a date picker on the specified input element
DatePicker(document.querySelector('input'));

// Or with a CSS selector
DatePicker('.some-class-or-id-or-whatever');
```

Have a look at the [./test/index.html](./test/index.html)-file for further usage examples.


## Development

npm start
npm run tests
npm run build

## Authors

* Kim Almasan <kim@kumbier.it>
* Lars Kumbier <lars@kumbier.it>


## License MIT

Copyright (c) 2020 Verivox GmbH (transformed to typescript)

Copyright (c) 2018 Chris Davies (Original library)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
