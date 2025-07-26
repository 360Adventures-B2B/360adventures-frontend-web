import { SettingItem } from "@/interfaces/SettingItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  settings: SettingItem[];
}

const initialState: SettingState = {
  settings: [],
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<SettingItem[]>) {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingSlice.actions;
export default settingSlice.reducer;
