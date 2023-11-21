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
      expect(boardtest.getBoard()[5][4]).toBe("ship");
      expect(boardtest.getBoard()[6][4]).toBe("ship");
      expect(boardtest.getBoard()[7][4]).toBe("ship");
      expect(boardtest.getBoard()[8][4]).toBe("ship");
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
    expect(boardtest.getBoard()[5][4]).toBe("ship");
    expect(boardtest.getBoard()[5][5]).toBe("ship");
    expect(boardtest.getBoard()[5][6]).toBe("ship");
    expect(boardtest.getBoard()[5][7]).toBe("ship");
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

//npm test src/tests/gameboard.test.js
