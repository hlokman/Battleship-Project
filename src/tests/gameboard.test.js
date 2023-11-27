import { Gameboard } from "../components/gameboard";

// Mock external modules and functions that are necessary
/*jest.mock("../components/player", () => ({
  Players: jest.fn().mockImplementation(() => ({
    // Mocked properties or methods necessary for Players
    changePlayer: jest.fn(),
    getPlayers: jest.fn().mockReturnValue([
      // Mock for the first player
      {
        placeShipHorizontally: jest.fn(),
        placeShipVertically: jest.fn(),
        // Add other necessary methods or properties for the first player
      },
      // Mock for the second player
      {
        placeShipHorizontally: jest.fn(),
        placeShipVertically: jest.fn(),
        // Add other necessary methods or properties for the second player
      },
      // Add additional player mocks if your application needs them
    ]),
    getPlayerUnderAttack: jest.fn().mockReturnValue({
      receiveAttack: jest.fn(),
      // Add other necessary methods or properties for the player under attack
    }),
    // Other mocked methods and properties
  })),
}));*/

describe("Board (grid) render", () => {
  test("Right number of lines", () => {
    let boardtest = Gameboard();
    expect(boardtest.getBoard().length).toBe(10);
  });

  test("Right number of columns", () => {
    let boardtest = Gameboard();
    expect(boardtest.getBoard()[0].length).toBe(10);
  });

  describe("Place the ship vertically", () => {
    test("Place the ship", () => {
      let boardtest = Gameboard();
      boardtest.placeShipVertically(5, 4, 4);
      expect(boardtest.getBoard()[5][4].isSunk()).toBeFalsy();
      expect(boardtest.getBoard()[6][4].isSunk()).toBeFalsy();
      expect(boardtest.getBoard()[7][4].isSunk()).toBeFalsy();
      expect(boardtest.getBoard()[8][4].isSunk()).toBeFalsy();
    });

    test("Ship's position overflowing", () => {
      let boardtest = Gameboard();
      expect(() => {
        boardtest.placeShipVertically(8, 2, 4);
      }).toThrow(Error);

      expect(() => {
        boardtest.placeShipVertically(0, 10, 1);
      }).toThrow(Error);

      expect(() => {
        boardtest.placeShipVertically(10, 0, 1);
      }).toThrow(Error);

      expect(() => {
        boardtest.placeShipVertically(5, 4, 0);
      }).toThrow(Error);
    });
  });
});

describe("Place the ship horizontally", () => {
  test("Place the ship", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    expect(boardtest.getBoard()[5][4].isSunk()).toBeFalsy();
    expect(boardtest.getBoard()[5][5].isSunk()).toBeFalsy();
    expect(boardtest.getBoard()[5][6].isSunk()).toBeFalsy();
    expect(boardtest.getBoard()[5][7].isSunk()).toBeFalsy();
  });

  test("Ship's position overflowing", () => {
    let boardtest = Gameboard();
    expect(() => {
      boardtest.placeShipHorizontally(2, 8, 4);
    }).toThrow(Error);

    expect(() => {
      boardtest.placeShipHorizontally(0, 10, 1);
    }).toThrow(Error);

    expect(() => {
      boardtest.placeShipHorizontally(10, 0, 1);
    }).toThrow(Error);

    expect(() => {
      boardtest.placeShipHorizontally(5, 4, 0);
    }).toThrow(Error);
  });
});

describe("Ships touching each other", () => {
  test("Trying to place a ship where there is another ship in the way", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    boardtest.placeShipVertically(6, 4, 4);
    expect(() => {
      boardtest.placeShipHorizontally(7, 1, 4);
    }).toThrow(Error);
    expect(boardtest.getBoard()[7][1]).toBeNull();
    expect(boardtest.getBoard()[7][2]).toBeNull();
    expect(boardtest.getBoard()[7][3]).toBeNull();
    expect(boardtest.getBoard()[7][4].isSunk()).toBeFalsy();

    expect(() => {
      boardtest.placeShipVertically(3, 7, 4);
    }).toThrow(Error);
    expect(boardtest.getBoard()[3][7]).toBeNull();
    expect(boardtest.getBoard()[4][7]).toBeNull();
    expect(boardtest.getBoard()[5][7].isSunk()).toBeFalsy();
    expect(boardtest.getBoard()[6][7]).toBeNull();
  });
});

describe("Receive attack(s)' logic", () => {
  test("A ship is hit", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    expect(boardtest.receiveAttack(5, 4)).toBeTruthy();
  });

  test("Attacks placed on the same spot", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    boardtest.placeShipVertically(6, 4, 4);
    expect(boardtest.receiveAttack(5, 4)).toBeTruthy();
    expect(boardtest.receiveAttack(6, 4)).toBeTruthy();
    boardtest.receiveAttack(5, 4);
    expect(boardtest.receiveAttack(5, 4)).toBeFalsy();
    boardtest.receiveAttack(6, 4);
    expect(boardtest.receiveAttack(6, 4)).toBeFalsy();
  });

  test("An empty spot is hit or the coordinates don't exist", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    expect(boardtest.receiveAttack(0, 0)).toBeTruthy();
    expect(() => {
      boardtest.receiveAttack(12, 8);
    }).toThrow(Error);
  });

  test("The Number of hits is taken into account when a ship is hit (then sunk)", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    boardtest.placeShipVertically(6, 4, 4);
    boardtest.receiveAttack(5, 4);
    boardtest.receiveAttack(5, 5);
    boardtest.receiveAttack(5, 6);
    expect(boardtest.getShips()[0].getHits()).toBe(3);
    expect(boardtest.getShips()[0].isSunk()).toBe(false);
    boardtest.receiveAttack(5, 7);
    expect(boardtest.getShips()[0].getHits()).toBe(4);
    expect(boardtest.getShips()[0].isSunk()).toBe(true);
  });

  test("Gameboards should be able to report whether or not all of their ships have been sunk", () => {
    let boardtest = Gameboard();
    boardtest.placeShipHorizontally(5, 4, 4);
    boardtest.placeShipVertically(6, 4, 4);
    boardtest.receiveAttack(5, 4);
    boardtest.receiveAttack(5, 5);
    boardtest.receiveAttack(5, 6);
    boardtest.receiveAttack(5, 7);
    expect(boardtest.getShips()[0].getHits()).toBe(4);
    expect(boardtest.getShips()[0].isSunk()).toBe(true);
    expect(boardtest.allShipsSunk()).toBe(false);
    boardtest.receiveAttack(6, 4);
    boardtest.receiveAttack(7, 4);
    boardtest.receiveAttack(8, 4);
    boardtest.receiveAttack(9, 4);
    expect(boardtest.getShips()[1].getHits()).toBe(4);
    expect(boardtest.getShips()[1].isSunk()).toBe(true);
    expect(boardtest.allShipsSunk()).toBe(true);
  });
});

//npm test src/tests/gameboard.test.js
