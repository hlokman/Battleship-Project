import { Players } from "../components/player";

test("The Player function return the right array", () => {
  const players = Players();
  expect(players.getPlayers()[0].name).toBe("Player");
  expect(players.getPlayers()[1].name).toBe("Computer");
});

test("expect the changePlayer() to work as expected", () => {
  const players = Players();
  expect(players.getPlayerUnderAttack().name).toBe("Computer");
  players.changePlayer();
  expect(players.getPlayerUnderAttack().name).toBe("Player");
  players.changePlayer();
  expect(players.getPlayerUnderAttack().name).toBe("Computer");
  players.changePlayer();
  expect(players.getPlayerUnderAttack().name).toBe("Player");
  players.changePlayer();
  expect(players.getPlayerUnderAttack().name).toBe("Computer");
});
//npm test src/tests/player.test.js
