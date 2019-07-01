import Utils from "../../../common/utils";

class Play {
  constructor($view) {
    this.$view = $view;
  }

  create() {
    Utils.getTemplate("play").then(html => {
      let $playSoundButton;
      this.$view.append(html);
      $playSoundButton = $("#play-sound");
      $playSoundButton.mousedown(() => {
        $playSoundButton.addClass("pressed");
      });
      $playSoundButton.mouseup(() => {
        $playSoundButton.removeClass("pressed");
        this.playSound();
      });
    });
  }

  playSound() {
    console.warn("play sound");
  }
}

export default Play;
