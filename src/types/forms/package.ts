interface Publisher {
  email: string;
  username: string;
  actor?: {
    name: string;
    type: string;
    email: string;
  };
}

interface Maintainer {
  email: string;
  username: string;
}

interface PackageLinks {
  homepage: string;
  repository: string;
  bugs: string;
  npm: string;
}

interface Package {
  name: string;
  keywords: string[];
  version: string;
  description: string;
  sanitized_name: string;
  publisher: Publisher;
  maintainers: Maintainer[];
  license: string;
  date: string;
  links: PackageLinks;
}

interface Downloads {
  monthly: number;
  weekly: number;
}

interface ScoreDetail {
  popularity: number;
  quality: number;
  maintenance: number;
}

interface Score {
  final: number;
  detail: ScoreDetail;
}

interface Flags {
  insecure: number;
}

interface PackageObject {
  downloads: Downloads;
  dependents: string;
  updated: string;
  searchScore: number;
  package: Package;
  score: Score;
  flags: Flags;
}

interface NPMSearchResponse {
  objects: PackageObject[];
  total: number;
  time: string;
}
