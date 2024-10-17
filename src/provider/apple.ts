import _ from 'lodash';
import { AppleMapsApi } from '../apple';
import polyline from 'google-polyline';
import { GeocodeInput, ReverseGeocodeInput, DirectionsInput, SearchInput } from '../types';
import { encodeInputLocation } from '../utils';
import { MapProvider } from './types';

export class AppleMapProvider implements MapProvider {

  client: AppleMapsApi;

  constructor(token: string) {
    this.client = new AppleMapsApi({ token });
  }

  async geocode({ address, lang, region }: GeocodeInput) {

    const { results } = await this.client.geocode({
      q: address,
      lang,
      limitToCountries: region ? [region] : undefined,
    });

    return _.map(results, x => ({
      country: x.country,
      countryCode: x.countryCode,
      formattedAddress: x.name,
      name: x.name,
      coordinate: x.coordinate,
      structuredAddress: x.structuredAddress,
    }));

  }

  async reverseGeocode({ location, lang }: ReverseGeocodeInput) {

    const loc = encodeInputLocation(location);

    const { results } = await this.client.reverseGeocode({ loc, lang });

    return _.map(results, x => ({
      country: x.country,
      countryCode: x.countryCode,
      formattedAddress: x.name,
      name: x.name,
      coordinate: x.coordinate,
      structuredAddress: x.structuredAddress,
    }));

  }

  async directions({ origin, destination, lang }: DirectionsInput) {

    const _origin = encodeInputLocation(origin);
    const _destination = encodeInputLocation(destination);

    const { routes, stepPaths, steps } = await this.client.directions({
      origin: _origin,
      destination: _destination,
      lang,
    });

    return _.map(routes, x => ({
      steps: _.map(x.stepIndexes, i => ({
        distanceMeters: steps[i].distanceMeters,
        durationSeconds: steps[i].durationSeconds,
        encoded_points: polyline.encode(_.map(stepPaths[steps[i].stepPathIndex], x => [x.latitude, x.longitude])),
      }))
    }));

  }

  async search({ search, lang, region }: SearchInput) {

    const { results } = await this.client.search({
      q: search,
      lang,
      limitToCountries: region ? [region] : undefined,
    });

    return _.map(results, x => ({
      country: x.country,
      countryCode: x.countryCode,
      formattedAddress: x.name,
      name: x.name,
      coordinate: x.coordinate,
      structuredAddress: x.structuredAddress,
    }));

  }
}
