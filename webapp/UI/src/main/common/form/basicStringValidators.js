import FromFieldValidation from "./fromFieldValidation";
import FormFieldValidation from "./fromFieldValidation";

class BasicStringValidators {
  required(string) {
    return new FromFieldValidation(string !== "", "Value is required");
  }

  onlyLetters(string) {
    let validation = new FromFieldValidation();
    if (!/^[a-z]+$/i.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must contain only letters");
    }
    return validation;
  }

  alphaNumeric(string) {
    let validation = new FromFieldValidation();
    if (!/^[a-z0-9]+$/i.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must contain only letters and numbers");
    }
    return validation;
  }

  startsWithLetter(string) {
    let validation = new FromFieldValidation();
    if (!/^[a-z]+$/i.test(string[0])) {
      validation.setValidStatus(false);
      validation.setError("Must start with a letter");
    }
    return validation;
  }

  maxLength(string, maxLength) {
    let validation = new FromFieldValidation();
    if (string.length >= maxLength) {
      validation.setValidStatus(false);
      validation.setError("Max length is " + maxLength);
    }
    return validation;
  }

  minLength(string, minLength) {
    let validation = new FromFieldValidation();
    if (string.length <= minLength) {
      validation.setValidStatus(false);
      validation.setError("Min length is " + minLength);
    }
    return validation;
  }

  lengthBetween(string, minLength, maxLength) {
    let validation = this.minLength(string, minLength);
    if (validation.isValid) {
      validation = this.maxLength(string, maxLength);
    }
    return validation;
  }

  email(string) {
    let validation = new FromFieldValidation();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must be a valid email");
    }
    return validation;
  }

  match(string1, string2) {
    return new FormFieldValidation(string1 == string2, "Do not match");
  }
}

export default BasicStringValidators;
