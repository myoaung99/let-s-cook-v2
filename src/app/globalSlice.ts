import {createSlice} from "@reduxjs/toolkit";

const GlobalSlice = createSlice({
    name: 'globalSlice',
    initialState: {
        showMobileNav: false,
    },
    reducers: {
        toggleMobileNav: (state) => {
            state.showMobileNav = !state.showMobileNav
        }
    }
})

export const {toggleMobileNav} = GlobalSlice.actions;

export default GlobalSlice.reducer;
