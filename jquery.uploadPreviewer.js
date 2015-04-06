(function($) {
  var getFileSize, getFileTypeCssClass;

  //NOTE: Depends on Humanize-plus (humanize.js)
  getFileSize = function(filesize) {
    return Humanize.fileSize(filesize);
  };

  // NOTE: Ensure a required filetype is matching a MIME type
  // (partial match is fine) and not matching against file extensions.
  //
  // Quick ref:  http://www.sitepoint.com/web-foundations/mime-types-complete-list/
  //
  // NOTE: For extended support of mime types, we should use https://github.com/broofa/node-mime
  getFileTypeCssClass = function(filetype) {
    var fileTypeCssClass;
    fileTypeCssClass = (function() {
      switch (true) {
        case /video/.test(filetype):
          return 'video';
        case /audio/.test(filetype):
          return 'audio';
        case /pdf/.test(filetype):
          return 'pdf';
        case /csv|excel/.test(filetype):
          return 'spreadsheet';
        case /powerpoint/.test(filetype):
          return 'powerpoint';
        case /msword|text/.test(filetype):
          return 'document';
        case /zip/.test(filetype):
          return 'zip';
        case /rar/.test(filetype):
          return 'rar';
        default:
          return 'default-filetype';
      }
    })();
    return "file-preview-placeholder " + fileTypeCssClass;
  };

  defaultPreviewRowTemplate = function(options) {
    return "<tr class='file-preview-row'>" +
             "<td>" + "<img src='" + options.src + "' class='" + options.placeholderCssClass + "' />" + "</td>" +
             "<td class='filename'>" + options.name + "</td>" +
             "<td class='filesize'>" + options.size + "</td>" +
           "</tr>"
  }

  return $.fn.uploadPreviewer = function(options, callback) {
    var buttonText, previewRowTemplate, previewTable, previewTableBody, previewTableIdentifier;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      this.wrap("<span class='ui primary button file-preview-shadow'></span>"); // TODO: ui primary button should be an option
      buttonText = this.parent(".file-preview-shadow");
      buttonText.prepend("<span>Add Files</span>");
      buttonText.wrap("<span class='file-preview-button'></span>");
      previewTableIdentifier = options.preview_table;
      previewTable = $(previewTableIdentifier);
      previewTable.addClass("file-preview-table");
      previewTableBody = previewTable.find("tbody");
      previewRowTemplate = options.preview_row_template || defaultPreviewRowTemplate;
      return this.on('change', (function(_this) {
        return function(e) {
          if (previewTableBody) {
            previewTableBody.empty();
          }
          return $.each(e.currentTarget.files, function(index, file) {
            var reader;
            reader = new FileReader();
            reader.onload = function(fileReaderEvent) {
              var filesize, filetype, imagePreviewRow, placeholderCssClass, source;
              if (previewTableBody) {
                filetype = file.type;
                if (/image/.test(filetype)) {
                  source = fileReaderEvent.target.result;
                  placeholderCssClass = "file-preview-placeholder image";
                } else {
                  source = "";
                  placeholderCssClass = getFileTypeCssClass(filetype);
                }
                filesize = getFileSize(file.size);
                imagePreviewRow = previewRowTemplate({
                  src: source,
                  name: file.name,
                  placeholderCssClass: placeholderCssClass,
                  size: filesize
                });
                previewTableBody.append(imagePreviewRow);
              }
              if (callback) {
                return callback(fileReaderEvent);
              }
            };
            return reader.readAsDataURL(file);
          });
        };
      })(this));
    } else {
      throw "The File APIs are not fully supported in this browser.";
    }
  };
})(jQuery);
