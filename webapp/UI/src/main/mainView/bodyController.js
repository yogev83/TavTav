import LoginModule from "../modules/login/login";
import RegisterModule from "../modules/register/register";
import Game from "./gameView/game";

class BodyController {
  constructor($view) {
    this.$view = $view;
    this.session = null;
  }

  start(onLogin) {
    this.onLogin = onLogin;
    let game = new Game(this.session);
    game.start(() => {
      if (this.session == null) {
        this.openLoginDialog();
      }
    });
  }

  openLoginDialog() {
    let login = new LoginModule(this.$view).create(session => {
      this.session = session;
      this.onLogin(session);
    }, this.openRegisterDialog.bind(this));
  }

  openRegisterDialog() {
    let register = new RegisterModule(this.$view).create();
  }
}

export default BodyController;
