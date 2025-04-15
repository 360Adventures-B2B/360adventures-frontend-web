import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  location: string[];
  booking_option: string[];
  category: string[];
  priceRange: [number, number];
}

const initialState: FiltersState = {
  location: [],
  booking_option: [],
  category: [],
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
      const { location, bookingOptions, category, priceRange } = action.payload;
      state.location = location || [];
      state.bookingOptions = bookingOptions || [];
      state.category = category || [];
      state.priceRange = priceRange || [100, 2000];
    },
    resetFilters: () => initialState,
  },
});

// Export actions & reducer
export const { toggleFilter, setPriceRange, setFiltersFromQuery, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
