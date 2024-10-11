import _ from 'lodash';
import { GoogleMapsApi } from '../google';
import { GeocodeInput, ReverseGeocodeInput, DirectionsInput, SearchInput } from '../types';
import { decodeGoogleGeocodeResult, encodeInputLocation } from '../utils';
import { MapProvider } from './types';

export class GoogleMapProvider implements MapProvider {

  client: GoogleMapsApi;

  constructor(token: string) {
    this.client = new GoogleMapsApi({ token });
  }

  async geocode({ address, lang, region }: GeocodeInput) {

    const { results } = await this.client.geocode({
      address,
      language: lang,
      region,
    });

    return _.compact(_.map(results, x => decodeGoogleGeocodeResult(x)));
  }

  async reverseGeocode({ location, lang }: ReverseGeocodeInput) {

    const loc = encodeInputLocation(location);

    const { results } = await this.client.reverseGeocode({
      latlng: { lat: loc.latitude, lng: loc.longitude },
      language: lang as any,
    });

    return _.compact(_.map(results, x => decodeGoogleGeocodeResult(x)));
  }

  async directions({ origin, destination, lang }: DirectionsInput) {

    const _origin = encodeInputLocation(origin);
    const _destination = encodeInputLocation(destination);

    const { routes } = await this.client.directions({
      origin: { lat: _origin.latitude, lng: _origin.longitude },
      destination: { lat: _destination.latitude, lng: _destination.longitude },
      language: lang as any,
    });

    return _.map(routes, x => ({
      steps: _.flatMap(x.legs, ({ steps }, i) => _.map(steps, s => ({
        pathIdx: i,
        distanceMeters: s.distance.value,
        durationSeconds: s.duration.value,
        encoded_points: s.polyline.points,
      }))),
    }));
  }

  async search({ search, lang, region }: SearchInput) {

    const { results } = await this.client.textSearch({
      query: search,
      language: lang as any,
      region,
    });

    return _.compact(_.map(results, x => decodeGoogleGeocodeResult(x)));
  }
}
