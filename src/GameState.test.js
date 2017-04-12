import gameState from './GameState';

describe("GameState", () => {
  beforeEach(() => gameState.reset());

  describe("Initial State", () => {
    it("starts in the Initial state", ()=> {
      expect(gameState.stateString).toBe('initial');
    });

    it("has correct initial variables", ()=> {
      expect(gameState.started).toBe(false);
      expect(gameState.canGuess).toBe(false);
      expect(gameState.canPass).toBe(false);
    });

    it("transitions to playing state", ()=> {
      gameState.start();
      expect(gameState.stateString).toBe("started");
    });

    it("does not transition when other actions are taken", ()=> {
      gameState.reset();
      expect(gameState.stateString).toBe('initial');

      gameState.guessRight();
      expect(gameState.stateString).toBe('initial');

      gameState.guessWrong();
      expect(gameState.stateString).toBe('initial');

      gameState.pass();
      expect(gameState.stateString).toBe('initial');
    });
  });

  describe("Started State", () => {
    beforeEach(() => gameState.start());

    it("has the correct started variables", ()=> {
      expect(gameState.started).toBe(true);
      expect(gameState.canGuess).toBe(true);
      expect(gameState.canPass).toBe(false);
    });

    it("can pass if there have been three correct guesses", () => {
      gameState.guessRight();
      gameState.guessRight();
      gameState.guessRight();

      expect(gameState.canPass).toBe(true);
    });

    it("restarts the count if you guess wrong", () => {
      gameState.guessRight();

      expect(gameState.correctGuesses).toBe(1);

      gameState.guessWrong();

      expect(gameState.correctGuesses).toBe(0);
    });
  });

  describe("Completed State", () => {
    beforeEach(() => {
      gameState.start();
      gameState.complete();
    });

    it("has the correct variables", () => {
      expect(gameState.stateString).toBe("completed");
      expect(gameState.started).toBe(false);
      expect(gameState.canGuess).toBe(false);
      expect(gameState.canPass).toBe(false);
    });
  });

  describe("keeping track of players", () => {
    it("initializes with players with one active", () => {
      expect(gameState.players.length).toBe(2);
      expect(gameState.players[0].active).toBe(true);
      expect(gameState.players[1].active).toBe(false);
    });

    it("switches the active player when one passes", () => {
      gameState.start();
      gameState.correctGuesses = 3;
      gameState.pass();

      expect(gameState.players[0].active).toBe(false);
      expect(gameState.players[1].active).toBe(true);
      expect(gameState.correctGuesses).toBe(0);
    });

    it("does not switch when the player guesses wrong", () => {
      gameState.start();
      gameState.correctGuesses = 3;
      gameState.pass();

      gameState.guessWrong();
      expect(gameState.players[0].active).toBe(false);
      expect(gameState.players[1].active).toBe(true);
    });

    it("does switch back when the game is reset", () => {
      gameState.start();
      gameState.correctGuesses = 3;
      gameState.pass();

      gameState.reset();
      expect(gameState.players[0].active).toBe(true);
      expect(gameState.players[1].active).toBe(false);
    });
  })
});
