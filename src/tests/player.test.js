import { Players } from "../components/player";

// Mock the module before using it in your tests
/*jest.mock("../components/player", () => {
  // Set the initial state of the current player
  let currentPlayer = "Player";

  // Mocked players array to return from getPlayers
  const mockedPlayers = [{ name: "Player" }, { name: "Computer" }];

  return {
    Players: jest.fn().mockImplementation(() => ({
      changePlayer: () => {
        // Change the current player state
        currentPlayer = currentPlayer === "Player" ? "Computer" : "Player";
      },
      getPlayers: jest.fn(() => mockedPlayers),
      getPlayerUnderAttack: jest.fn(() => {
        // Return the player who is not the current player
        const playerUnderAttack =
          currentPlayer === "Player" ? mockedPlayers[1] : mockedPlayers[0];
        return playerUnderAttack;
      }),
      // Add any other methods or properties that need to be mocked here
    })),
    // Add other exports from the Players module if necessary
  };
});*/

test("The Player function return the right array", () => {
  const players = Players();
  expect(players.getPlayers()[0].name).toBe("Player");
  expect(players.getPlayers()[1].name).toBe("Computer");
});

test("expect the changePlayer() to work as expected", () => {
  const players = Players();
  // The initial state is assumed to be 'Player', so the player under attack should be 'Computer'
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
