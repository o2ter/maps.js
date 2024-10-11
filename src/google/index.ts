import _ from 'lodash';
import {
  Client,
  ReverseGeocodeRequest,
  GeocodeRequest,
  DirectionsRequest,
  Status,
  TextSearchRequest,
  PlaceQueryAutocompleteRequest,
  FindPlaceFromTextRequest,
  PlaceAutocompleteRequest,
} from '@googlemaps/google-maps-services-js';

const client = new Client({ });

export class GoogleMapsApi {

  token: string;

  constructor({ token }: { token: string; }) {
    this.token = token;
  }

  async geocode(request: Omit<GeocodeRequest['params'], 'key'>) {
    const res = await client.geocode({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async reverseGeocode(request: Omit<ReverseGeocodeRequest['params'], 'key'>) {
    const res = await client.reverseGeocode({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async directions(request: Omit<DirectionsRequest['params'], 'key'>) {
    const res = await client.directions({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async placeAutocomplete(request: Omit<PlaceAutocompleteRequest['params'], 'key'>) {
    const res = await client.placeAutocomplete({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async findPlaceFromText(request: Omit<FindPlaceFromTextRequest['params'], 'key'>) {
    const res = await client.findPlaceFromText({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async placeQueryAutocomplete(request: Omit<PlaceQueryAutocompleteRequest['params'], 'key'>) {
    const res = await client.placeQueryAutocomplete({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }

  async textSearch(request: Omit<TextSearchRequest['params'], 'key'>) {
    const res = await client.textSearch({
      params: {
        ...request,
        key: this.token,
      },
    });
    if (res.data.status !== Status.OK) throw new Error(res.data.error_message);
    return res.data;
  }
}
