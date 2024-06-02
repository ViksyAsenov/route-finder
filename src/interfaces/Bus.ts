import Package from "./Package";

interface Bus {
  startingCity: string;
  currentCity: string;
  weightCapacity: number;
  packages: Package[];
}

export default Bus;
