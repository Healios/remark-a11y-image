# Remark Accessible Image Plugin

This is a plugin for [Remark](https://remark.js.org/), and allows you to embed accessible images in [markdown](https://daringfireball.net/projects/markdown/) files. This plugin can also be used with [Gridsome](https://gridsome.org/).

## Installation

```bash
npm i remark-a11y-image --save-dev
# yarn add remark-a11y-image --dev
```

## Configuration
If you want alignment to work, you'll have to supply css classes.

There's three options:
- **cssClassToCenterImage**

  Example value `w-full flex justify-center`

- **cssClassToLeftAlignImage**

  Example value `w-full flex justify-start`

- **cssClassToRightAlignImage**

  Example value `w-full flex justify-end`


### Remark configuration:
```js
  const remark = require("remark");
  const a11y_image = require("remark-a11y-image");

  const processor = remark().use(a11y_image, {
    cssClassToCenterImage: "w-full flex justify-center",
    cssClassToLeftAlignImage: "w-full flex justify-start",
    cssClassToRightAlignImage: "w-full flex justify-end",
  });
```


### Gridsome configuration:
```js
module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        route: "/blog/:year/:month/:day/:slug",
        remark: {
          plugins: [
            [
              "gridsome-remark-wcag-image",
              {
                  cssClassToCenterImage: "w-full flex justify-center",
                  cssClassToLeftAlignImage: "w-full flex justify-start",
                  cssClassToRightAlignImage: "w-full flex justify-end",
              },
            ]
          ]
        }
      }
    }
  ]
}
```

## Usage in markdown

The markdown must consist of all the possible attributes (image, decorative, alt & placement), and you must enclose the markdown in backticks (\`). 

Format:
```markdown
`image [IMAGE_LINK] decorative [TRUE|FALSE] alt [ALT_TEXT] placement [Left|Center|Right]`
```

Examples:

```markdown
`image https://avatars.githubusercontent.com/u/9387114?s=60&v=4 decorative true alt placement Center`

or

`image https://avatars.githubusercontent.com/u/9387114?s=60&v=4 decorative true alt This alt text won't be shown placement Center`

or

`image https://avatars.githubusercontent.com/u/9387114?s=60&v=4 decorative false alt This is alt text will be shown placement Center`
```

## Output

### Image

This is how the image should appear on the screen:

<img src="https://avatars.githubusercontent.com/u/9387114?s=60&v=4" role="presentation" alt="">

### Generated HTML

```html
<div class="w-full flex justify-start"> <!-- whatever css you've provided -->
  <img src="https://avatars.githubusercontent.com/u/9387114?s=60&v=4" role="presentation" alt="">
</div>
```

### Errors
When the plugin detects errors, i.e. an incorreclty formatted a11y-image element, it will render a red fat error instead of an image.

<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> The markdown is not correctly formatted.</p>


## License

MIT
