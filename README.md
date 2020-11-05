# The Game of Dice
### The Game of Dice is a multiplayer game where N players roll a 6 faced dice in a round-robin fashion. Each time a player rolls the dice their points increase by the number (1 to 6) achieved by the roll.

### As soon as a player accumulates M points they complete the game and are assigned a rank. Remaining players continue to play the game till they accumulate at least M points. The game ends when all players have accumulated at least M points.
---
## Rules of the game
- The order in which the users roll the dice is decided randomly at the start of the game.
- If a player rolls the value "6" then they immediately get another chance to roll again and move
ahead in the game.
- If a player rolls the value "1" two consecutive times then they are forced to skip their next turn
as a penalty.
---
## Prerequisites
- [Node.js]
- [Yarn]
---
## Playing the game
```
yarn start-game <N> <M>
```
where N = number of players and M = points to accumulate.

Example:
```
yarn start-game 3 10
```
---
## Test Cases
Run this command once to install dependencies:
```
yarn --dev
```
To run test cases:
```
yarn test
```
---
### Happy rolling!

[Node.js]: <https://nodejs.org/en/>
[Yarn]: <https://yarnpkg.com/lang/en/>
