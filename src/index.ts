import { AppleMapProvider } from './provider/apple';
import { GoogleMapProvider } from './provider/google';
import { MapProvider } from './provider/types';
import { DirectionsInput, GeocodeInput, ReverseGeocodeInput, SearchInput } from './types';

export { GoogleMapsApi } from './google';
export { AppleMapsApi } from './apple';

export class MapsApi {

  providers: MapProvider[] = [];

  constructor(options: {
    apple?: string;
    google?: string;
  }) {
    if (options.apple) this.providers.push(new AppleMapProvider(options.apple));
    if (options.google) this.providers.push(new GoogleMapProvider(options.google));
  }

  async geocode(input: GeocodeInput) {
    let error;
    for (const provider of this.providers) {
      try {
        return await provider.geocode(input);
      } catch (e) {
        error = e;
      }
    }
    if (error) throw error;
    throw Error('No providers');
  }

  async reverseGeocode(input: ReverseGeocodeInput) {
    let error;
    for (const provider of this.providers) {
      try {
        return await provider.reverseGeocode(input);
      } catch (e) {
        error = e;
      }
    }
    if (error) throw error;
    throw Error('No providers');
  }

  async directions(input: DirectionsInput) {
    let error;
    for (const provider of this.providers) {
      try {
        return await provider.directions(input);
      } catch (e) {
        error = e;
      }
    }
    if (error) throw error;
    throw Error('No providers');
  }

  async search(input: SearchInput) {
    let error;
    for (const provider of this.providers) {
      try {
        return await provider.search(input);
      } catch (e) {
        error = e;
      }
    }
    if (error) throw error;
    throw Error('No providers');
  }
};
