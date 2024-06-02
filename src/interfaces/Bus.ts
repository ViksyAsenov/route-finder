import Package from "./Package";

interface Bus {
  startingCity: string;
  currentCity: string;
  loadCapacity: number;
  packages: Package[];
}

export default Bus;
