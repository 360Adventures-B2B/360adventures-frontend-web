import { Package } from "@/interfaces/Package";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalPackageSlice {
  modalType: "PACKAGE" | "DETAIL_PACKAGE" | null;
  packageData: Package | null;
}

const initialState: ModalPackageSlice = {
  modalType: null,
  packageData: null,
};

const modalPackageSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalForPackageModal(state, action: PayloadAction<Package>) {
      state.modalType = "PACKAGE";
      state.packageData = action.payload;
    },
    openDetailPackageModal(state, action: PayloadAction<Package>) {
      state.modalType = "DETAIL_PACKAGE";
      state.packageData = action.payload;
    },
    closeModal(state) {
      state.modalType = null;
      state.packageData = null;
    },
  },
});

export const { openModalForPackageModal, openDetailPackageModal, closeModal } = modalPackageSlice.actions;
export default modalPackageSlice.reducer;
