import FormDialogModule from "../formDialog/formDialog";
import mockServer from "../../../mockServer/mockServer";
import FormFieldValidators from "../../common/form/formFieldValidators";
import FormFieldValidation from "../../common/form/fromFieldValidation";

import GoTrue from "gotrue-js";

class RegisterModule extends FormDialogModule {
  constructor($container, auth) {
    super($container);
    this.formTemplate = "registerForm";
    this.dialogOptions = {
      className: "register-dialog",
      cancelLabel: "Not Now",
      okLabel: "Register"
    };
    this.formOptions = {
      validators: {
        password: this.passwordValidation
      }
    };
    this.auth = auth;
  }

  action(data) {
    //  let userService = mockServer.getService("user");
    this.auth
      .signup(data.email, data.password)
      .then(response => console.log("Confirmation email sent", response))
      .catch(error => console.log("It's an error", error));
    //return userService.register(data);
  }

  passwordValidation(passwordValue) {
    let validation = new FormFieldValidation();
    let password = $(".form-field input[name='password']").val();
    let reEnterPassword = $(".form-field input[name='reEnterPassword']").val();

    validation = FormFieldValidators.password(passwordValue);
    if (validation.isValid) {
      if (password && reEnterPassword) {
        validation = FormFieldValidators.match(password, reEnterPassword);
        if (!validation.isValid) {
          validation.setError("Passwords " + validation.error);
        }
      }
    }

    return validation;
  }
}

export default RegisterModule;
