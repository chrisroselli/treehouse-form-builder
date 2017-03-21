jQuery(document).ready(function($) {
  var buildWrap = document.querySelector('.build-wrap'),
    copyDataBtn = document.getElementById('copy-html'),
    renderedForm = document.getElementById("rendered-form"),
    editBtn = document.getElementById('edit-form'),
    formData = window.sessionStorage.getItem('formData'),
    editing = true,
    fbOptions = {
      dataType: 'json'
    };

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  var toggleEdit = function() {
    document.body.classList.toggle('form-rendered', editing);
    editing = !editing;
  };

  var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');

  $('.form-builder-save').click(function() {
    toggleEdit();
    $(renderedForm).formRender({
      dataType: 'json',
      formData: formBuilder.formData
    });

    window.sessionStorage.setItem('formData', JSON.stringify(formBuilder.formData));
  });

  editBtn.onclick = function() {
    toggleEdit();
  };
  toast = function t(e) {
      e = Object.assign({
          type: "success",
          msg: ""
      }, e);
      var t = document.createElement("div"),
          n = document.createTextNode(e.msg);
      t.classList.add("toast"), t.classList.add(e.type), t.appendChild(n), document.body.appendChild(t), setTimeout(function() {
          document.body.removeChild(t)
      }, 2500)
  },
  new window.Clipboard(copyDataBtn, {
    text: function() {
      toast({msg: 'Form HTML successfully copied to clipboard.'});
      return renderedForm.outerHTML;
    }
  });
});
