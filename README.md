# jquery.uploadPreviewer.js

jQuery.uploadPreviewer.js is a jQuery plugin that turns a file input into a file upload previewer.

Check the [demo page](http://opsmanager.github.io/jquery.uploadPreviewer.js) here.

### Basic Usage

```html
  <input type='file' />
```

```javascript
  $('input[type=file]').uploadPreviewer(options, callback);
```

### Options

| Key                   | Description                                                           | Optional |
| --------------------- | --------------------------------------------------------------------- | -------- |
| preview_table         | The table that will contain the file previews. e.g. "#pictures-table" | Yes      |
| preview_row_template  | A function that will return a template                                | Yes      |

### Preview Table Row Template

A default row template is provided if you don't provide one. Otherwise, the variables
provided to the template include are
- `src` (image source)
- `name` (filename)
- `size` (filesize)
- `placeholderCssClass` (it should be attached to the image, which will provide a placeholder based on the file type if the file is not an image).
