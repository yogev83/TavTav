import FormDialogModule from "../formDialog/formDialog";
import mockServer from "../../../mockServer/mockServer";

class RegisterModule extends FormDialogModule {
  constructor($container) {
    super($container);
    this.formTemplate = "registerForm";
    this.formError = "All values must be valid!";
    this.dialogOptions = {
      className: "register-dialog",
      cancelLabel: "Not Now",
      okLabel: "Register"
    };
  }

  action(data) {
    let userService = mockServer.getService("user");
    return userService.register(data);
  }
}

export default RegisterModule;
