let gameState;
let players;

class State {
  constructor() {
    this.started = false;
    this.canPass = false;
    this.players = players;
  }

  start() {}
  guessRight() {}
  guessWrong() {}
  pass() {}
  complete() {}

  reset() {
    gameState = new InitialState();
  };

  get canGuess() {
    return this.started;
  }
}

class StartedState extends State {
  constructor() {
    super();

    this.started = true;
    this.stateString = 'started';
    this.correctGuesses = 0;
  }

  get canPass() {
    return this.correctGuesses >= 3;
  }
  set canPass(_value) { }

  guessRight() {
    this.correctGuesses++
  }

  guessWrong() {
    gameState = new StartedState();
  }

  complete() {
    gameState = new CompletedState();
  }

  pass() {
    players = players.map(value => !value);
    gameState = new StartedState();
  }
}

class InitialState extends State {
  constructor() {
    super();

    this.stateString = 'initial';
    this.players = players = [true, false];
  }

  start() {
    gameState = new StartedState();
  }
}

class CompletedState extends State {
  constructor() {
    super();

    this.stateString = 'completed';
  }
}

gameState = new InitialState();

export { gameState as default };
