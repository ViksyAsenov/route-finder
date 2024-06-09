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

  basicPathFinder.getBestBasicPath(
    parsedBus,
    parsedPackages,
    [],
    allVisitedPaths,
    new Set()
  );

  const result = allVisitedPaths.sort(
    (path1, path2) => path1.length - path2.length
  )[0];

  console.log(result);
  return result ?? "";
}

main({ type: CalculationType.BasicPath }, new DataProvider());
