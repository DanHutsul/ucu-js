var figures = [];

function Tetris(state = GAME_STATES.PLAYING) {
  // Private properties
  const playground = PlaygroundFactory.getInstance();
  let gameInverval = null;

  // Private methods
  const addFigure = () => {
    const newFigure = new Figure(figures);
    figures.push(newFigure);
    return newFigure;
  };

  const GameTurn = () => {
    console.log(figures);
    getCurrentFigure().moveDown();
    checkForGameOver();
  }

  const getCurrentFigure = () =>
    figures.find(figure => figure.state === STATES.FALLING) || addFigure();

  const events = (keyCode) => { // TODO: this seems to have refactoring potential
    const eventsMap = {
      [DOWN]() {
        if (state == GAME_STATES.PLAYING) {
          getCurrentFigure().moveDown();
          checkForGameOver();
        }
      },
      [RIGHT]() {
        if (state == GAME_STATES.PLAYING) {
          getCurrentFigure().moveSideways(RIGHT);
          checkForGameOver();
        }
      },
      [LEFT]() {
        if (state == GAME_STATES.PLAYING) {
          getCurrentFigure().moveSideways(LEFT);
          checkForGameOver();
        }
      },
      [PAUSE]() {
        if(state == GAME_STATES.PLAYING) {
          console.log('event PAUSE');
          state = GAME_STATES.PAUSED;
          clearInterval(gameInverval);
        } else if(state != GAME_STATES.GAMEOVER) {
          console.log('event UNPAUSE');
          state = GAME_STATES.PLAYING;
          gameInverval = setInterval(GameTurn, INTERVAL);
        }
      },
    }

    eventsMap[keyCode] && eventsMap[keyCode]();
  };

  const checkCellPosition = (figure) => {
    for (var i = 0; i < figure.cells.length; i++) {
      if (figure.cells[i].y < PLAYGROUND_HEIGHT) {

        return false;
      }
    }
    if (figure.cells.length == 0) {
      return false;
    }
    return true;
  }

  const checkForGameOver = () => {
    if (figures[figures.length-1].state == STATES.STATIC) {
      if (checkCellPosition(figures[figures.length-1])) {
        state = GAME_STATES.GAMEOVER;
        clearInterval(gameInverval);
        console.log('GAME OVER')
      }
    }
  };

  this.play = () => {    
      playground.render();
      document.addEventListener('keydown', ({keyCode}) =>  events(keyCode));
      state = GAME_STATES.PLAYING;
      gameInverval = setInterval(GameTurn, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
