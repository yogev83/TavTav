import mockServer from "../../mockServer/mockServer";
import Session from "../session/session";

class HeaderController {
  constructor($view) {
    this.$view = $view;
    this.session = new Session();
  }

  start(onLoginClick) {
    this.onLoginClick = onLoginClick;
    this.attachEvent();
  }

  initSession(session) {
    let $login = this.$view.find("#login");
    let $welcome = this.$view.find("#welcome");

    this.session = session;

    $login.hide();
    $welcome.show();
    $welcome.html("Welcome " + session.user.firstname);
  }

  attachEvent() {
    let $login = this.$view.find("#login");
    $login.click(this.onLoginClick);
  }
}

export default HeaderController;
