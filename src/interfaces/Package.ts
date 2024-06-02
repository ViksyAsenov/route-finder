import Path from "./Path";

interface Package {
  name: string;
  path: Path;
  weight: number;
  delivered: boolean;
}

export default Package;
