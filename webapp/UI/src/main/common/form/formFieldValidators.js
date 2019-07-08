import BasicStringValidators from "./basicStringValidators";

class FormFieldValidators extends BasicStringValidators {
  static get consts() {
    return {
      NAME_MAX_LENGTH: 16,
      PASSWORD_MIN_LENGTH: 6,
      PASSWORD_MAX_LENGTH: 12
    };
  }

  username(username) {
    let validation = this.startsWithLetter(username);
    if (validation.isValid) {
      validation = this.alphaNumeric(username);
    }
    return validation;
  }

  name(name) {
    let validation = this.onlyLetters(name);
    if (validation.isValid) {
      validation = this.maxLength(
        name,
        FormFieldValidators.consts.NAME_MAX_LENGTH
      );
    }
    return validation;
  }

  password(password) {
    let validation = this.alphaNumeric(password);
    if (validation.isValid) {
      validation = this.lengthBetween(
        password,
        FormFieldValidators.consts.PASSWORD_MIN_LENGTH,
        FormFieldValidators.consts.PASSWORD_MAX_LENGTH
      );
    }
    return validation;
  }
}

export default new FormFieldValidators();
