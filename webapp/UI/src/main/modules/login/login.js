import mockServer from "../../../mockServer/mockServer";
import FormDialogModule from "../formDialog/formDialog";

class LoginModule extends FormDialogModule {
  constructor($container) {
    super($container);
    this.className = "login-dialog";
    this.formTemplate = "loginForm";
    this.formError = "Invalid username or password!";
  }

  create(onLogin, onNotRegisterdClick) {
    super.create(onLogin).then(() => {
      //MUST BE FIXED!!
      setTimeout(() => {
        $(this.dialog.getContent())
          .find("#register")
          .click(() => {
            this.dialog.close();
            onNotRegisterdClick();
          });
      }, 100);
    });
  }

  action(data) {
    let userService = mockServer.getService("user");
    return userService.login(data).then(session => {
      this.handler(session);
    });
  }
}

export default LoginModule;
