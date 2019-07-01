import FormDialogModule from "../formDialog/formDialog";
import mockServer from "../../../mockServer/mockServer";

class RegisterModule extends FormDialogModule {
  constructor($container) {
    super($container);
    this.className = "register-dialog";
    this.formTemplate = "registerForm";
    this.formError = "All values must be valid!";
  }

  action(data) {
    let userService = mockServer.getService("user");
    return userService.register(data);
  }
}

export default RegisterModule;
