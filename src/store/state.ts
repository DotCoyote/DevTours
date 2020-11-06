const today = new Date();
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

export const state = {
  searchValues: {
    location: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: nextWeek.toISOString().substring(0, 10),
    skip: 0,
    top: 99,
    rating: 0,
  },
  hotels: [],
  availabilities: [],
  filterValues: {
    minPrice: 0,
    maxPrice: 9999,
    freeWifi: false,
    freeCancellation: false,
    breakfastIncluded: false,
  },
  selectedOffer: null,
};
