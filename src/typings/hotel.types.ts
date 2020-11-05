import { Location } from '@/typings/location.types';

export interface Image {
  hires: string;
  lowres: string;
}

export interface RoomAmenities {
  terrace: boolean;
  balcony: boolean;
  seaside_view: boolean;
  garden_view: boolean;
}

export interface HotelAmenities {
  breakfast_included: boolean;
  free_cancellation: boolean;
  free_parking: boolean;
  fitness: boolean;
  pool: boolean;
  free_wifi: boolean;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  images: Image[];
  amenities: RoomAmenities;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: Location;
  rating: string;
  address: string;
  amenities: HotelAmenities;
  images: Image[];
  rooms: HotelRoom[];
}
