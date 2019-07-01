import Welcome from "./welcomeScreen/welcome";
import Play from "./playScreen/play";

class Game {
  constructor(session) {
    this.session = session;
    this.$gameView = $("#game-view");
  }

  start(onPlay) {
    let play;
    let welcome = new Welcome(this.$gameView);
    welcome.create(() => {
      welcome.destroy();
      play = new Play(this.$gameView);
      play.create();
      onPlay();
    });
  }
}

export default Game;
