import { DataProvider } from "./data/dataProvider";
import BasicPathFinder from "./utils/BasicPathFinder";
import { parsePath, parseBus, parsePackage } from "./utils/parseInput";

export enum CalculationType {
  BasicPath = "BasicPath",
  ShortestPath = "ShortestPath",
  MostEfficientPath = "MostEfficientPath",
}

export type CalculatorOptions = {
  type: CalculationType;
};

export function main(
  { type }: CalculatorOptions,
  dataProvider: DataProvider
): string {
  const paths = dataProvider.fetchPaths();
  const bus = dataProvider.settings();
  const packages = dataProvider.fetchPackages();

  const parsedPaths = paths.map((path) => parsePath(path));

  const parsedBus = parseBus(bus);

  const parsedPackages = packages.map((currentPackage) =>
    parsePackage(currentPackage)
  );

  const basicPathFinder = new BasicPathFinder();
  for (const path of parsedPaths) {
    basicPathFinder.addEntry(path.from, path);
  }

  const allVisitedPaths: string[] = [];
  const visited: string[] = [];

  basicPathFinder.getBestBasicPath(
    parsedBus,
    parsedPackages,
    visited,
    allVisitedPaths,
    ""
  );

  //console.log(allVisitedPaths);

  //basicPathFinder.printAllPaths();

  return "";
}

const dataProvider = new DataProvider();
main({ type: CalculationType.BasicPath }, dataProvider);
//console.log("result", main({ type: CalculationType.BasicPath }, dataProvider));
