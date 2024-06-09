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

  hasExcessiveRepetition(cities: string[], maxRepetition: number) {
    const cityCount: { [name: string]: number } = {};

    for (const city of cities) {
      if (!cityCount[city]) {
        cityCount[city] = 0;
      }
      cityCount[city]++;

      if (cityCount[city] > maxRepetition) {
        return true;
      }
    }

    return false;
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
    memo: Set<string>
  ): void {
    const currentState = `${JSON.stringify(currentVisited)}-${JSON.stringify(
      bus
    )}`;

    if (memo.has(currentState)) {
      return;
    }

    memo.add(currentState);

    if (currentVisited.length > 0 && currentVisited[0] !== bus.startingCity) {
      return;
    }

    if (packages.every((pck) => pck.delivered) && currentVisited.length > 0) {
      const lastCity = currentVisited[currentVisited.length - 1];

      if (lastCity !== bus.startingCity) {
        const shortestPath = this.findShortestPath(lastCity, bus.startingCity);

        if (shortestPath) {
          allVisitedPaths.push(
            `${currentVisited.join(",")},${shortestPath.join(",")}`
          );
        }

        return;
      }

      allVisitedPaths.push(currentVisited.join(","));

      return;
    }

    currentVisited.push(bus.currentCity);

    for (const currentPackage of packages.filter((pck) => !pck.delivered)) {
      if (
        bus.currentCity === currentPackage.path.from &&
        !bus.packages.some((pck) => pck.name === currentPackage.name)
      ) {
        bus.packages.push(currentPackage);
        bus.currentWeight += currentPackage.weight;
      }

      if (
        bus.currentCity === currentPackage.path.to &&
        bus.packages.some((pck) => pck.name === currentPackage.name)
      ) {
        const pkg = packages.find((pck) => pck.name === currentPackage.name);
        if (pkg) {
          pkg.delivered = true;
        }
        bus.packages = bus.packages.filter(
          (pck) => pck.name !== currentPackage.name
        );
        bus.currentWeight -= currentPackage.weight;
      }
    }

    if (
      bus.currentWeight > bus.loadCapacity ||
      this.hasExcessiveRepetition(currentVisited, 3)
    ) {
      currentVisited.pop();
      return;
    }

    const possiblePaths = this.getPossiblePaths(bus.currentCity);

    possiblePaths.sort((path1, path2) => {
      const packageCount1 = bus.packages.filter(
        (currentPackage) => currentPackage.path.to === path1
      ).length;
      const packageCount2 = bus.packages.filter(
        (currentPackage) => currentPackage.path.to === path2
      ).length;

      return packageCount2 - packageCount1;
    });

    for (const possiblePath of possiblePaths) {
      const newBus = structuredClone(bus);
      newBus.currentCity = possiblePath;

      this.getBestBasicPath(
        newBus,
        structuredClone(packages),
        currentVisited,
        allVisitedPaths,
        memo
      );
    }

    currentVisited.pop();
  }

  findShortestPath(fromCity: string, toCity: string): string[] {
    const queue: [string, string[]][] = [[fromCity, [fromCity]]];
    const visited: Set<string> = new Set([fromCity]);

    while (queue.length > 0) {
      const [currentCity, path] = queue.shift()!;
      if (currentCity === toCity) {
        return path.slice(1);
      }

      for (const neighbor of this.getPossiblePaths(currentCity)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, path.concat(neighbor)]);
        }
      }
    }

    return [];
  }
}

export default BasicPathFinder;
