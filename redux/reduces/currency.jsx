import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    currency: "BTC"
};

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        // Action to add comment
        setCurrency: (state, action) => {
            state.currency = action.payload
        },


        // Special reducer for hydrating the state
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.currency,
                };
            },
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export const selectCurrency = (state) => state.currency.currency;
export default currencySlice.reducer;