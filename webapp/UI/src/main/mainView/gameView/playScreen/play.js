import Utils from "../../../common/utils";

class Play {
  constructor($view) {
    this.ctx = new AudioContext();
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
    let o = this.ctx.createOscillator();
    let  g = this.ctx.createGain(); 
    o.connect(g);
    o.type = "triangle";
    g.connect(this.ctx.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(
      0.00001, this.ctx.currentTime + 1
    )
  }
}

export default Play;
