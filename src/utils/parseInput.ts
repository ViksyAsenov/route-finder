import Package from "../interfaces/Package";
import Path from "../interfaces/Path";
import Bus from "../interfaces/Bus";

export const parsePackage = (packageData: string): Package => {
  const parts = packageData.split(",");

  const path: Path = { from: parts[0], to: parts[2] };

  return {
    name: parts[1],
    path,
    weight: parseFloat(parts[3]),
    delivered: false,
  };
};

export const parseBus = (busData: string): Bus => {
  const parts = busData.split(",");

  return {
    startingCity: parts[0],
    currentCity: parts[0],
    loadCapacity: parseFloat(parts[1]),
    currentWeight: 0,
    packages: [],
  };
};

export const parsePath = (pathData: string): Path => {
  const parts = pathData.split(",");

  return { from: parts[0], to: parts[1], distance: parseFloat(parts[2]) };
};
