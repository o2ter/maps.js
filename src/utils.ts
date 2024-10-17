import _ from 'lodash';
import { AddressType, GeocodeResult, Place } from '@googlemaps/google-maps-services-js';
import { Location } from './types';

export const encodeInputLocation = (location: Location) => {
  if (!_.isArray(location)) return location;
  const [latitude, longitude] = location;
  return { latitude, longitude };
}

export const decodeGoogleGeocodeResult = (result: GeocodeResult | Place) => {
  if (!result.geometry) return;
  const administrativeArea = _.find(result.address_components, c => _.includes(c.types, AddressType.administrative_area_level_1))?.long_name;
  const locality = _.find(result.address_components, c => _.includes(c.types, AddressType.neighborhood))?.long_name;
  const country = _.find(result.address_components, c => _.includes(c.types, AddressType.country))?.long_name;
  return {
    country,
    formattedAddress: result.formatted_address!,
    name: 'name' in result ? result.name : undefined,
    coordinate: {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
    },
    structuredAddress: {
      administrativeArea,
      locality,
    },
  }
}
