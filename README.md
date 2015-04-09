# jquery.uploadPreviewer.js

jQuery.uploadPreviewer.js is a jQuery plugin that turns a file input into a file upload previewer.

Check the [demo page](http://opsmanager.github.io/jquery.uploadPreviewer.js) here.

## Basic Usage

### Initialization

```html
  <input type='file' />
```

```javascript
  var myFileUploader = $('input[type=file]').uploadPreviewer(options, callback);
```

### Submitting Files

Submitting the files with optional callbacks

```javascript
  var successCallback = function(data, status, jqXHR) { ... };
  var errorCallback = function(jqXHR, status, error) { ... };
  myFileUploader.submit(successCallback, errorCallback);
```

Listening to file submit complete event

```javascript
  $(document).on('file-preview:submit:complete', function(e) {
    if (e.status == 'success') {
     // The event object has data, status and jqXHR
    } else if (e.status == 'error') {
      // The event object has error, status and jqXHR
    } else if (e.status == 'no-files') {
    }
  });
```

#### Options

| Key                   | Description                                                           | Optional |
| --------------------- | --------------------------------------------------------------------- | -------- |
| preview_table         | The table that will contain the file previews. e.g. "#pictures-table" | Yes      |
| preview_row_template  | A function that will return a template                                | Yes      |
| url                   | URL where the post request is made to                                 | No       |

**NOTE:** It is not necessary to pass the url on initialize. It can be set before submit by calling the `url`
function with the url as the argument.

#### Preview Table Row Template

A default row template is provided if you don't provide one. Otherwise, the variables
provided to the template include are
- `src` (image source)
- `name` (filename)
- `size` (filesize)
- `placeholderCssClass` (it should be attached to the image, which will provide a placeholder based on the file type if the file is not an image).

## Credits
[Jiangping Hsu](https://dribbble.com/ping) for supplying the file icons

