import Utils from "../../../common/utils";

class Welcome {
  constructor($view) {
    this.$view = $view;
  }

  create(onPlayClick) {
    Utils.getTemplate("welcome").then(html => {
      let $playButton;
      this.$view.append(html);
      $playButton = $("#play-button");
      $playButton.click(() => {
        onPlayClick();
      });
    });
  }

  destroy() {
    this.$view.empty();
  }
}

export default Welcome;
