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

  getBestBasicPath(bus: Bus, packages: Package[]): string {
    console.log(bus);
    if (bus.weightCapacity < 0) {
      return "done";
    }

    for (const currentPackage of packages) {
      if (bus.currentCity === currentPackage.path.to) {
        bus.packages.splice(bus.packages.indexOf(currentPackage), 1);
        bus.weightCapacity += currentPackage.weight;
      }

      if (bus.currentCity === currentPackage.path.from) {
        bus.packages.push(currentPackage);
        bus.weightCapacity -= currentPackage.weight;
      }
    }

    bus.currentCity = bus.packages.at(0)?.path.to as string;

    return this.getBestBasicPath(bus, packages);
  }
}

export default BasicPathFinder;
