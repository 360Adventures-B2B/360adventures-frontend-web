import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  destinations: string[];
  bookingOptions: string[];
  categories: string[];
  priceRange: [number, number]; 
}

const initialState: FiltersState = {
  destinations: [],
  bookingOptions: [],
  categories: [],
  priceRange: [100, 2000],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<{ key: Exclude<keyof FiltersState, "priceRange">; value: string }>) => {
      const { key, value } = action.payload;
      const currentFilter = state[key] as string[];

      if (currentFilter.includes(value)) {
        state[key] = currentFilter.filter((item) => item !== value);
      } else {
        state[key] = [...currentFilter, value];
      }
    },

    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setFiltersFromQuery: (state, action) => {
      const { destinations, bookingOptions, categories, priceRange } = action.payload;
      state.destinations = destinations || [];
      state.bookingOptions = bookingOptions || [];
      state.categories = categories || [];
      state.priceRange = priceRange || [100, 2000];
    },
    resetFilters: () => initialState,
  },
});

// Export actions & reducer
export const { toggleFilter, setPriceRange, setFiltersFromQuery, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
