export const state = {
  searchValues: {
    location: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    skip: 0,
    top: 99,
    rating: 0,
  },
  availabilities: [],
  filterValues: {
    minPrice: 0,
    maxPrice: 9999,
    freeWifi: false,
    freeCancellation: false,
    breakfastIncluded: false,
  },
};
