(function($) {
  var getFileSize, getFileTypeCssClass;

  defaults = {
    buttonText: "Add Files",
    buttonClass: "file-preview-button",
    shadowClass: "file-preview-shadow",
    tableCss: "file-preview-table",
    tableRowClass: "file-preview-row",
    placeholderClass: "file-preview-placeholder",
    loadingCss: "file-preview-loading",
    tableTemplate: function() {
      return "<table class='table table-striped file-preview-table' id='file-preview-table'>" +
               "<tbody></tbody>" +
             "</table>";
    },
    rowTemplate: function(options) {
      return "<tr class='" + defaults.tableRowClass + "'>" +
               "<td>" + "<img src='" + options.src + "' class='" + options.placeholderCssClass + "' />" + "</td>" +
               "<td class='filename'>" + options.name + "</td>" +
               "<td class='filesize'>" + options.size + "</td>" +
             "</tr>";
    },
    loadingTemplate: function() {
      return "<div id='file-preview-loading-container'>" +
               "<div id='file-preview-loading' class='loader-inner ball-clip-rotate-pulse no-show'>" +
                 "<div></div>" +
                 "<div></div>" +
               "</div>" +
             "</div>";
    }
  }

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
    return defaults.placeholderClass + " " + fileTypeCssClass;
  };

  // TODO: we should also be able to click on the files and show them as a gallery.
  $.fn.uploadPreviewer = function(options, callback) {
    if (!options) {
      options = {};
    }

    var buttonText,
        previewRowTemplate,
        previewTable,
        previewTableBody,
        previewTableIdentifier;

    if (window.File && window.FileReader && window.FileList && window.Blob) {

      this.wrap("<span class='btn btn-primary " + defaults.shadowClass + "'></span>");
      buttonText = this.parent("." + defaults.shadowClass);
      buttonText.prepend("<span>" + defaults.buttonText + "</span>");
      buttonText.wrap("<span class='" + defaults.buttonClass + "'></span>");

      previewTableIdentifier = options.preview_table;
      if (!previewTableIdentifier) {
        $("span." + defaults.buttonClass).after(defaults.tableTemplate());
        previewTableIdentifier = "table." + defaults.tableCss;
      }

      previewTable = $(previewTableIdentifier);
      previewTable.addClass(defaults.tableCss);
      previewTableBody = previewTable.find("tbody");

      previewRowTemplate = options.preview_row_template || defaults.rowTemplate;

      previewTable.after(defaults.loadingTemplate());

      this.on('change', function(e) {
        if (previewTableBody) {
          previewTableBody.empty();
        }

        var loadingSpinner = $("#" + defaults.loadingCss);
        loadingSpinner.show();

        var reader;
        var filesCount = e.currentTarget.files.length;
        $.each(e.currentTarget.files, function(index, file) {
          reader = new FileReader();
          reader.onload = function(fileReaderEvent) {
            var filesize, filetype, imagePreviewRow, placeholderCssClass, source;
            if (previewTableBody) {
              filetype = file.type;
              if (/image/.test(filetype)) {
                source = fileReaderEvent.target.result;
                placeholderCssClass = defaults.placeholderClass + " image";
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

              if (index == filesCount - 1) {
                loadingSpinner.hide();
              }
            }
            if (callback) {
              callback(fileReaderEvent);
            }
          };
          reader.readAsDataURL(file);
        });
      });
    } else {
      throw "The File APIs are not fully supported in this browser.";
    }
  };
})(jQuery);
