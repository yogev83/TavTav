class FormFieldValidation {
  constructor(isValid = true, error = "") {
    this.isValid = isValid;
    this.error = error;
  }

  setValidStatus(isValid) {
    this.isValid = isValid;
  }

  setError(error) {
    this.error = error;
  }
}

export default FormFieldValidation;
