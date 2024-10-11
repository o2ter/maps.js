
export type Location = [number, number] | {
  latitude: number;
  longitude: number;
};

export type GeocodeInput = {
  address: string;
  lang?: string;
  region?: string;
};

export type ReverseGeocodeInput = {
  location: Location;
  lang?: string;
};

export type DirectionsInput = {
  origin: Location;
  destination: Location;
  lang?: string;
};

export type SearchInput = {
  search: string;
  lang?: string;
  region?: string;
};
