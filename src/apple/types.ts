
export type Location = {
  latitude: number;
  longitude: number;
};

export type MapRegion = {
  eastLongitude: number;
  northLatitude: number;
  southLatitude: number;
  westLongitude: number;
};

export type GeocodeInput = {
  q: string;
  lang?: string;
  limitToCountries?: string[];
  searchLocation?: Location;
  searchRegion?: MapRegion;
  userLocation?: Location;
};

export type ReverseGeocodeInput = {
  loc: Location;
  lang?: string;
};

export type _SearchInput = GeocodeInput & {
  excludePoiCategories?: string[];
  includePoiCategories?: string[];
  resultTypeFilter?: string[];
  searchRegionPriority?: string;
  includeAddressCategories?: string[];
  excludeAddressCategories?: string[];
};

export type SearchInput = _SearchInput & {
  enablePagination?: boolean;
  pageToken?: string;
};

export type SearchAutocompleteInput = _SearchInput & {
  details?: boolean;
};

export type StructuredAddress = {
  administrativeArea?: string;
  administrativeAreaCode?: string;
  areasOfInterest?: string[];
  dependentLocalities?: string[];
  fullThoroughfare?: string;
  locality?: string;
  postCode?: string;
  subLocality?: string;
  subThoroughfare?: string;
  thoroughfare?: string;
};

export type Place = {
  country: string;
  countryCode: string;
  displayMapRegion: MapRegion;
  formattedAddressLines: string[];
  name: string;
  coordinate: Location;
  structuredAddress: StructuredAddress;
  alternateIds?: string[];
  id?: string;
};

export type AutocompleteResult = {
  completionUrl: string;
  displayLines: string[];
  location?: Location;
  structuredAddress?: StructuredAddress;
};

export type DirectionsInput = {
  origin: string | Location;
  destination: string | Location;
  lang?: string;
  avoid?: string;
  arrivalDate?: Date;
  departureDate?: Date;
  requestsAlternateRoutes?: boolean;
  searchLocation?: Location;
  searchRegion?: MapRegion;
  userLocation?: Location;
  transportType?: string;
};

type Route = {
  distanceMeters: number;
  durationSeconds: number;
  hasTolls: boolean;
  name: string;
  stepIndexes: number[];
  transportType: string;
};

type Step = {
  distanceMeters: number;
  durationSeconds: number;
  instructions: string;
  stepPathIndex: number;
  transportType: string;
};

export type DirectionsResponse = {
  destination: Place;
  origin: Place;
  routes: Route[];
  steps: Step[];
  stepPaths: Location[][];
};
