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
    const winner = players.reduce((acc, val) => {
      return acc.points < val.points ? acc : val;
    });

    if(!players.every(player => player.points === winner.points)) {
      winner.winner = true;
    }
    gameState = new CompletedState();
  }

  pass() {
    players.forEach(player => player.active = !player.active);
    gameState = new StartedState();
  }
}

class InitialState extends State {
  constructor() {
    super();

    this.stateString = 'initial';
    this.players = players = [
      { active: true, points: 0 },
      { active: false, points: 0 }
    ];
  }

  start() {
    gameState = new StartedState();
  }
}

class CompletedState extends State {
  constructor() {
    super();

    this.stateString = 'completed';
    this.started = true;
  }

  get canGuess() {
    return false;
  }
}

gameState = new InitialState();

export { gameState as default };
