import Utils from "../utils";
import FormFieldValidators from "./formFieldValidators";
import FormFieldValidation from "./fromFieldValidation";

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
      Utils.getTemplate("fieldError").then(errorElement => {
        this.errorElement = errorElement;
        $container.append(html);
        this.$formElement = $container.find("div.form");
        this.$errorContainer = this.$formElement.find(".form-error-message");
        this.$errorContainer.append("<p></p>");
        this.$fields = this.$formElement.find(".form-field");
        this.initFields();
      });
    });
  }

  initFields() {
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

    $.each(this.$fields, (i, field) => {
      currentValid = this.validateField($(field));
      valid = valid && currentValid;
    });

    if (valid) {
      this.validState = Form.validationState.VALID;
    } else {
      this.validState = Form.validationState.INVALID;
    }

    return valid;
  }

  validateField($field) {
    let $input = $($field.find("input"));
    let value = $input.val();
    let fieldValidationName = $field.attr("validation");
    let validation = new FormFieldValidation();
    let customValidators = this.options.validators;

    if ($field.attr("required")) {
      validation = FormFieldValidators.required(value);
      if (validation.isValid && fieldValidationName) {
        if (typeof customValidators[fieldValidationName] == "function") {
          validation = customValidators[fieldValidationName](value);
        } else if (
          typeof FormFieldValidators[fieldValidationName] == "function"
        ) {
          validation = FormFieldValidators[fieldValidationName](value);
        }
      }
    } else if (fieldValidationName) {
      if (typeof customValidators[fieldValidationName] == "function") {
        validation = customValidators[fieldValidationName](value);
      } else if (
        typeof FormFieldValidators[fieldValidationName] == "function"
      ) {
        validation = FormFieldValidators[fieldValidationName](value);
      }
    }

    if (!validation.isValid) {
      $input.addClass("invalid");
      this.appendErrorToField($field, validation.error);
    } else {
      $input.removeClass("invalid");
      this.removeErrorFromField($field);
    }

    return validation.isValid;
  }

  appendErrorToField($field, error) {
    let $errorElement;
    let fieldError = $field.find("div.field-error")[0];
    if (!fieldError) {
      $field.append(this.errorElement);
      fieldError = $field.find("div.field-error")[0];
    }
    $errorElement = $(fieldError);
    $errorElement.show();
    $($errorElement.find("p")[0]).html(error);
  }

  removeErrorFromField($field) {
    let $errorElement;
    let fieldError = $field.find("div.field-error")[0];
    if (fieldError) {
      $errorElement = $(fieldError);
      $errorElement.hide();
      $($errorElement.find("p")[0]).html("");
    }
  }
}

export default Form;
