import Utils from "../utils";

class Form {
  constructor(formTemplate, options) {
    this.$container = null;
    this.$formElement = null;
    this.$errorContainer = null;
    this.formTemplate = formTemplate;
    this.options = options;
    this.data = {};
  }

  create($container, onValidStateChanged) {
    this.$container = $container;
    this.onValidStateChanged = onValidStateChanged;
    return Utils.getTemplate(this.formTemplate).then(html => {
      $container.append(html);
      this.$formElement = $container.find("div.form");
      this.$errorContainer = this.$formElement.find(".form-error-message");
      this.$errorContainer.append("<p></p>");
      this.$fields = this.$formElement.find(".form-field");
      this.attachEvents();
    });
  }

  attachEvents() {
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      $inputBuffer = $($(field).find("input"));
      $inputBuffer.change(this.validate.bind(this));
    });
  }

  setValue(data) {
    for (let k in data) {
      this.$formElement.find("input[name='" + k + "'].form-field");
    }
  }

  getData() {
    let data = {};
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      $inputBuffer = $($(field).find("input"));
      data[$inputBuffer.attr("name")] = $inputBuffer.val();
    });
    return data;
  }

  showError(error) {
    error = error || this.options.formError;
    this.$errorContainer.find("p").html(error);
    this.$errorContainer.show();
  }

  hideError() {
    this.$errorContainer.find("p").html("");
    this.$errorContainer.hide();
  }

  validate() {
    let valid = true;
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      if (!valid) {
        return;
      }

      $inputBuffer = $($(field).find("input"));
      valid = valid && $inputBuffer.val() !== "";
    });

    valid ? this.hideError() : this.showError();
    this.onValidStateChanged(valid);
  }
}

export default Form;
