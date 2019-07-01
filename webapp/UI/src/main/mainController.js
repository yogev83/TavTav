import BodyController from "./mainView/bodyController";
import HeaderController from "./header/headerController";
import Utils from "./common/utils";

class MainController {
  constructor() {
    this.headerController;
    this.bodyController;
  }

  start() {
    let $headerView;
    let $mainView;

    Utils.getTemplate("main").then(html => {
      $("body div#main").html(html);

      $headerView = $("#header");
      $mainView = $("#main-view");

      this.headerController = new HeaderController($headerView);
      this.bodyController = new BodyController($mainView);

      this.headerController.start(
        this.bodyController.openLoginDialog.bind(this.bodyController)
      );
      this.bodyController.start(
        this.headerController.initSession.bind(this.headerController)
      );
    });
  }
}

export default MainController;
