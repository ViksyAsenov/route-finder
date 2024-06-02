import { CalculationType, main } from "../index";
import { DataProvider } from "../data/dataProvider";

describe("Основи на маршрутизатора", () => {
  let dataProvider: DataProvider;

  beforeEach(() => {
    dataProvider = new DataProvider();
  });

  it("follows the main scenario", () => {
    const path = main({ type: CalculationType.BasicPath }, dataProvider);

    const expectedPaths = ["София,Велико Търново,Пловдив,Велико Търново,София"];

    expect(expectedPaths).toContainEqual(path);
  });
});

describe("Най-кратък маршрут", () => {
  let dataProvider: DataProvider;

  beforeEach(() => {
    dataProvider = new DataProvider();
  });

  it("follows the main scenario", () => {
    const pathAndDistance = main(
      { type: CalculationType.ShortestPath },
      dataProvider
    );

    const expectedPaths = [
      "София,Велико Търново,Пловдив,Велико Търново,София,864",
      "Пловдив,Велико Търново,София,Велико Търново,Пловдив,864",
      "Велико Търново,София,Велико Търново,Пловдив,Велико Търново,864",
    ];

    expect(expectedPaths).toContainEqual(pathAndDistance);
  });
});

describe("Най-ефикасен маршрут", () => {
  let dataProvider: DataProvider;

  beforeEach(() => {
    dataProvider = new DataProvider();
  });

  it("follows the main scenario", () => {
    const pathAndFuel = main(
      { type: CalculationType.MostEfficientPath },
      dataProvider
    );

    const expectedPaths = [
      "Пловдив,Велико Търново,София,Велико Търново,Пловдив,97.2138",
      "Велико Търново,София,Велико Търново,Пловдив,Велико Търново,97.2138",
    ];

    expect(expectedPaths).toContainEqual(pathAndFuel);
  });
});
