import Package from "./Package";

interface Bus {
  startingCity: string;
  currentCity: string;
  loadCapacity: number;
  currentWeight: number;
  packages: Package[];
}

export default Bus;
