import { Gameboard } from "../components/gameboard";
import { Ship } from "../components/ship";

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

//npm test src/tests/gameboard.test.js
