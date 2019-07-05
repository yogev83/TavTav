import MainController from "./mainController";

(scope => {
  scope.templatesPath = "./templates/";

  $(document).ready(() => {
    let controller = new MainController();
    controller.start();
  });
})((window.tavtav = {}));
