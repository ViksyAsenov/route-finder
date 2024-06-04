import Bus from "../interfaces/Bus";
import Package from "../interfaces/Package";
import Path from "../interfaces/Path";

class BasicPathFinder {
  cityToPathMap: Map<string, Path[]>;

  constructor() {
    this.cityToPathMap = new Map();
  }

  addEntry(city: string, path: Path): void {
    if (!this.cityToPathMap.has(city)) {
      this.cityToPathMap.set(city, []);
    }

    this.cityToPathMap.get(city)?.push(path);

    if (!this.cityToPathMap.has(path.to)) {
      this.cityToPathMap.set(path.to, []);
    }
    this.cityToPathMap
      .get(path.to)
      ?.push({ from: path.to, to: path.from, distance: path.distance });
  }

  getPossiblePaths(city: string): string[] {
    if (!this.cityToPathMap.has(city)) {
      return [];
    }

    return this.cityToPathMap.get(city)?.map((path) => path.to) as string[];
  }

  printAllPaths(): void {
    for (const city of this.cityToPathMap.keys()) {
      console.log(`${city} -> ${this.getPossiblePaths(city)}`);
    }
  }

  getBestBasicPath(
    bus: Bus,
    packages: Package[],
    currentVisited: string[],
    allVisitedPaths: string[],
    lastInvalidPath: string
  ): void {
    if (packages.length === 0) {
      allVisitedPaths.push(currentVisited.join(","));
      return;
    }

    currentVisited.push(bus.currentCity);

    for (const currentPackage of packages) {
      if (
        bus.currentCity === currentPackage.path.from &&
        !bus.packages.includes(currentPackage)
      ) {
        bus.packages.push(currentPackage);
      }

      if (
        bus.currentCity === currentPackage.path.to &&
        bus.packages.includes(currentPackage)
      ) {
        packages.splice(packages.indexOf(currentPackage), 1);
        bus.packages.splice(bus.packages.indexOf(currentPackage), 1);
      }
    }

    let isValidPath = true;
    if (bus.currentWeight() > bus.loadCapacity) {
      lastInvalidPath = `${currentVisited[currentVisited.length - 2]}->${
        currentVisited[currentVisited.length - 1]
      }`;

      isValidPath = false;
    }

    const possiblePaths = this.getPossiblePaths(bus.currentCity);

    for (const possiblePath of possiblePaths) {
      if (isValidPath) {
        console.log(`${bus.currentCity} -> ${possiblePath}`);
        bus.currentCity = possiblePath;

        this.getBestBasicPath(
          bus,
          packages,
          currentVisited,
          allVisitedPaths,
          lastInvalidPath
        );

        currentVisited.pop();
      }
    }
  }
}

export default BasicPathFinder;
