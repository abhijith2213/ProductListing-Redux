import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items:[],
    currentPage : 0,
    count : 3,
    loading: false
}

//fetch products using Thunk

export const fetchProducts = createAsyncThunk('fetchProducts', async()=>{
    const res = await axios.get('https://fakestoreapi.com/products')
    return res.data
})

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state,action)=>{
            state.items = action.payload
            state.loading = false
        })
        .addCase(fetchProducts.rejected, (state)=>{
            state.loading= false
        })
    }
})

export const {setItems, setCurrentPage, setSearch} = productSlice.actions
export default productSlice.reducer