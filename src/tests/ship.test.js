import { Ship } from "../components/ship";

describe("Ship creation", () => {
  test("Length", () => {
    let shiptest = Ship(4);
    expect(shiptest.getLength()).toBe(4);
  });

  test("Initial hit value", () => {
    let shiptest = Ship(4);
    expect(shiptest.getHits()).toBe(0);
  });
});

describe("Hit the ship", () => {
  test("Hit the ship once", () => {
    let shiptest = Ship(4);
    shiptest.hit();
    expect(shiptest.getHits()).toBe(1);
  });

  test("Hit the ship twice", () => {
    let shiptest = Ship(4);
    shiptest.hit();
    shiptest.hit();
    expect(shiptest.getHits()).toBe(2);
  });

  test("Hit the ship 4 times", () => {
    let shiptest = Ship(4);
    shiptest.hit();
    shiptest.hit();
    shiptest.hit();
    shiptest.hit();
    expect(shiptest.getHits()).toBe(4);
  });
});
//npm test src/tests/ship.test.js
