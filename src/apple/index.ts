import _ from 'lodash';
import axios from 'axios';
import {
  GeocodeInput,
  Place,
  ReverseGeocodeInput,
  SearchInput,
  SearchAutocompleteInput,
  AutocompleteResult,
  DirectionsInput,
  DirectionsResponse,
} from './types';
import { encodeGeocodeInput, encodeLocation, encodeSearchInput, encodeRegion } from './utils';

const client = axios.create({ baseURL: 'https://maps-api.apple.com' });

export class AppleMapsApi {

  token: string;

  constructor({ token }: { token: string; }) {
    this.token = token;
  }

  async accessToken() {
    const res = await client.get('/v1/token', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return res.data.accessToken;
  }

  async geocode(input: GeocodeInput) {
    const response = await client.get('/v1/geocode', {
      headers: {
        Authorization: `Bearer ${await this.accessToken()}`,
      },
      params: encodeGeocodeInput(input),
    });
    if (response.status !== 200) throw new Error(response.data.message);
    return response.data as { results: Place[]; };
  }

  async reverseGeocode(input: ReverseGeocodeInput) {
    const params: Record<string, any> = { loc: encodeLocation(input.loc) };
    if (input.lang) params.lang = input.lang;
    const response = await client.get('/v1/reverseGeocode', {
      headers: {
        Authorization: `Bearer ${await this.accessToken()}`,
      },
      params,
    });
    if (response.status !== 200) throw new Error(response.data.message);
    return response.data as { results: Place[]; };
  }

  async search(input: SearchInput) {
    const params = encodeSearchInput(input);
    if (input.enablePagination) params.enablePagination = true;
    if (input.pageToken) params.pageToken = input.pageToken;
    const response = await client.get('/v1/search', {
      headers: {
        Authorization: `Bearer ${await this.accessToken()}`,
      },
      params,
    });
    if (response.status !== 200) throw new Error(response.data.message);
    return response.data as { results: Place[]; };
  }

  async searchAutocomplete({ details, ...input }: SearchAutocompleteInput) {
    const token = await this.accessToken();
    const response = await client.get('/v1/searchAutocomplete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: encodeSearchInput(input),
    });
    if (response.status !== 200) throw new Error(response.data.message);
    if (!details) return response.data as { results: AutocompleteResult[]; };
    return {
      results: await Promise.all(_.compact(_.map(response.data.results, async x => {
        const response = await client.get(x.completionUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) throw new Error(response.data.message);
        return _.first(response.data.results) as Place;
      }))),
    };
  }

  async directions(input: DirectionsInput) {
    const params: Record<string, any> = {
      origin: _.isString(input.origin) ? input.origin : encodeLocation(input.origin),
      destination: _.isString(input.destination) ? input.destination : encodeLocation(input.destination),
    };
    if (input.lang) params.lang = input.lang;
    if (input.avoid) params.avoid = input.avoid;
    if (input.arrivalDate) params.arrivalDate = input.arrivalDate.toISOString();
    if (input.departureDate) params.departureDate = input.departureDate.toISOString();
    if (input.requestsAlternateRoutes) params.requestsAlternateRoutes = true;
    if (input.searchLocation) params.searchLocation = encodeLocation(input.searchLocation);
    if (input.searchRegion) params.searchRegion = encodeRegion(input.searchRegion);
    if (input.userLocation) params.userLocation = encodeLocation(input.userLocation);
    if (input.transportType) params.transportType = input.transportType;
    const response = await client.get('/v1/directions', {
      headers: {
        Authorization: `Bearer ${await this.accessToken()}`,
      },
      params,
    });
    if (response.status !== 200) throw new Error(response.data.message);
    return response.data as DirectionsResponse;
  }
}
