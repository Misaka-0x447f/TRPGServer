export interface Property {
  checksum?: {
    algorithm: checksumAlgorithm,
    checksum: string,             // checksum of JSON.stringify(data)
    source: checksumDataSource
  };
  data: PropertyData[];
}

export interface PropertyData {
  id: string;                     // must be a valid javascript identifier
  value: string;                  // numeric string, enum string, or just string
  text: string;                   // human readable property text
}

export enum checksumAlgorithm {
  sha1 = "sha1"
}

export enum checksumDataSource {
  gen = "built-in generator"
}
