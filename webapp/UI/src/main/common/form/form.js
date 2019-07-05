import Utils from "../utils";

class Form {
  static get validationState() {
    return {
      UNSET: "unset",
      VALID: "valid",
      INVALID: "invalid"
    };
  }

  constructor(formTemplate, options) {
    this.$container = null;
    this.$formElement = null;
    this.$errorContainer = null;
    this.formTemplate = formTemplate;
    this.validState = Form.validationState.UNSET;
    this.options = options;
    this.data = {};
  }

  create($container) {
    this.$container = $container;
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
      $inputBuffer.change(() => {
        if (this.validState == Form.validationState.INVALID) {
          this.validate.call(this);
        }
      });
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
    let currentValid = true;
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      $inputBuffer = $($(field).find("input"));
      currentValid = $inputBuffer.val() !== "";

      if (!currentValid) {
        $inputBuffer.addClass("invalid");
      } else {
        $inputBuffer.removeClass("invalid");
      }

      valid = valid && currentValid;
    });

    if (valid) {
      this.hideError();
      this.validState = Form.validationState.VALID;
    } else {
      this.showError();
      this.validState = Form.validationState.INVALID;
    }

    return valid;
  }
}

export default Form;
