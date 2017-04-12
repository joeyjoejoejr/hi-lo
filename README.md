# HI-LO

A simple card guessing game for two players. You guess the next card, and if you
guess it wrong it adds points for each card in the pile. If you guess it right,
you can pass to the other player, who must then guess. The player with the
fewest points when the cards run out wins.

## Playing

Either play on-line [here](http://joeyjoejoejr.github.com/hi-lo) or download
and run it locally.

```bash
# must have yarn installed brew install yarn

git clone git@github.com:joeyjoejoejr/hi-lo
cd hi-lo
yarn install
yarn start
```

## Running Tests

There are a few tests here, especially around the gameState functionality,
however there are nearly no react or ui tests. This is because enzyme was
broken with react 15.5 when I was writing this, and testing without those tools
is painful and time consuming.

[See the issue here](https://github.com/airbnb/enzyme/pull/876)

```bash
yarn test
```
