import { HotelRoom } from '@/typings/hotel.types';

export interface AvailabilitiesPaginatedModel {
  items: AvailabilityShortenedModel[];
  top: number;
  skip: number;
  count: number;
}

export interface AvailabilityShortenedModel {
  offer: OfferModel;
  hotelId: string;
  room: HotelRoom;
  availability: RoomAvailabilityModel;
}

export interface OfferModel {
  id: string;
  line_items: LineItemsModel;
}

export interface RoomAvailabilityModel {
  available_from: string;
  available_to: string;
  length_of_stay: number;
  price_per_night: PriceEntryModel;
}

export interface LineItemsModel {
  vat: PriceEntryModel;
  city_tax: PriceEntryModel;
  gross_price: PriceEntryModel;
  final_price: PriceEntryModel;
}

export interface PriceEntryModel {
  amount: number;
  currency: string;
}
