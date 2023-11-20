import { Ship } from "../components/ship";

describe("A simple ship (length 4) created with the factory", () => {
  let shiptest = Ship(4);

  test("Ship object's structure", () => {
    expect(shiptest).toEqual({
      length: 4,
      hit: 0,
      isSunk: false,
    });
  });
});

//npm test src/tests/
