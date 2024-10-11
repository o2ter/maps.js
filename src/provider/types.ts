import _ from 'lodash';
import { StructuredAddress } from '../apple/types';
import { Location, GeocodeInput, ReverseGeocodeInput, DirectionsInput, SearchInput } from '../types';

export interface MapProvider {

  geocode({ address, lang, region }: GeocodeInput): Promise<{
    country?: string;
    countryCode?: string;
    formattedAddress: string;
    coordinate: Location;
    structuredAddress: StructuredAddress;
  }[]>;

  reverseGeocode({ location, lang }: ReverseGeocodeInput): Promise<{
    country?: string;
    countryCode?: string;
    formattedAddress: string;
    coordinate: Location;
    structuredAddress: StructuredAddress;
  }[]>;

  directions({ origin, destination, lang }: DirectionsInput): Promise<{
    steps: {
      distanceMeters: number;
      durationSeconds: number;
      encoded_points: string;
    }[];
  }[]>;

  search({ search, lang, region }: SearchInput): Promise<{
    country?: string;
    countryCode?: string;
    formattedAddress: string;
    coordinate: Location;
    structuredAddress: StructuredAddress;
  }[]>;
}
