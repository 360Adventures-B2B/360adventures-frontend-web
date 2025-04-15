import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  location: string[];
  booking_option: string[];
  category: string[];
  price_range: [number, number];
}

const initialState: FiltersState = {
  location: [],
  booking_option: [],
  category: [],
  price_range: [100, 2000],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<{ key: Exclude<keyof FiltersState, "price_range">; value: string }>) => {
      const { key, value } = action.payload;
      const currentFilter = state[key] as string[];

      if (currentFilter.includes(value)) {
        state[key] = currentFilter.filter((item) => item !== value);
      } else {
        state[key] = [...currentFilter, value];
      }
    },

    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.price_range = action.payload;
    },
    setFiltersFromQuery: (state, action) => {
      const { location, bookingOptions, category, priceRange } = action.payload;
      state.location = location || [];
      state.booking_option = bookingOptions || [];
      state.category = category || [];
      state.price_range = priceRange || [100, 2000];
    },
    resetFilters: () => initialState,
  },
});

// Export actions & reducer
export const { toggleFilter, setPriceRange, setFiltersFromQuery, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
