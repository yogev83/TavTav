import mockServer from "../../../mockServer/mockServer";
import FormDialogModule from "../formDialog/formDialog";

import GoTrue from "gotrue-js";

class LoginModule extends FormDialogModule {
  constructor($container, auth) {
    super($container);
    this.formTemplate = "loginForm";
    this.dialogOptions = {
      className: "login-dialog",
      okLabel: "Login"
    };
    this.auth = auth;
  }

  create(onLogin, onNotRegisterdClick) {
    super.create(onLogin).then(() => {
      //MUST BE FIXED!!
      setTimeout(() => {
        $(this.dialog.getContent())
          .find("#register")
          .click(() => {
            this.close();
            onNotRegisterdClick();
          });
      }, 100);
    });
  }

  action(data) {
    // let userService = mockServer.getService("user");
    return this.auth.login(email, password).then(response => {
      this.handler(response.access_token);
    });
    // return userService.login(data).then(session => {
    //   this.handler(session);
    // });
  }
}

export default LoginModule;
