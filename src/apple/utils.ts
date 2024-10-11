import { Location, GeocodeInput, MapRegion, _SearchInput } from './types';

export const encodeLocation = (location: Location) => [
  location.latitude,
  location.longitude
].join(',');

export const encodeRegion = (region: MapRegion) => [
  region.northLatitude,
  region.eastLongitude,
  region.southLatitude,
  region.westLongitude
].join(',');

export const encodeGeocodeInput = (input: GeocodeInput) => {
  const params: Record<string, any> = { q: input.q };
  if (input.lang) params.lang = input.lang;
  if (input.limitToCountries) params.limitToCountries = input.limitToCountries.join(',');
  if (input.searchLocation) params.searchLocation = encodeLocation(input.searchLocation);
  if (input.searchRegion) params.searchRegion = encodeRegion(input.searchRegion);
  if (input.userLocation) params.userLocation = encodeLocation(input.userLocation);
  return params;
};

export const encodeSearchInput = (input: _SearchInput) => {
  const params = encodeGeocodeInput(input);
  if (input.excludePoiCategories) params.excludePoiCategories = input.excludePoiCategories.join(',');
  if (input.includePoiCategories) params.includePoiCategories = input.includePoiCategories.join(',');
  if (input.resultTypeFilter) params.resultTypeFilter = input.resultTypeFilter.join(',');
  if (input.searchRegionPriority) params.searchRegionPriority = input.searchRegionPriority;
  if (input.includeAddressCategories) params.includeAddressCategories = input.includeAddressCategories.join(',');
  if (input.excludeAddressCategories) params.excludeAddressCategories = input.excludeAddressCategories.join(',');
  return params;
};
