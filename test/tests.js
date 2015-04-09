test("allows setting the post url", function(assert){
  var options = {
    "url": "www.google.com"
  }
  var myUploadInput = $("#file-preview-input").uploadPreviewer(options);
  assert.equal(myUploadInput.url(), "www.google.com");
});

test("wraps the input button with span.shadowClass", function(assert){
  var cssShadow = "file-preview-shadow"

  var myUploadInput = $("#file-preview-input").uploadPreviewer();
  assert.ok(myUploadInput.parent().hasClass(cssShadow));
});

test("adds span button with custom text for adding files", function(assert){
  var myUploadInput = $("#file-preview-input").uploadPreviewer();
  assert.equal(myUploadInput.siblings().text(), "Add Files");
});

test("sets the opacity of the input type file to 0 by wrapping it in custom span.buttonClass", function(assert){
  var cssButton = "file-preview-button"
  var myUploadInput = $("#file-preview-input").uploadPreviewer();
  assert.ok(myUploadInput.parent().parent().hasClass(cssButton));
  assert.equal(myUploadInput.css('opacity'), 0);
});
