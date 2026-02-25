import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.product === newItem.product)

            if (!existingItem) {
                state.items.push(newItem)
            } else {
                existingItem.quantity += newItem.quantity
            }

            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        removeFromCart: (state, action) => {
            const productId = action.payload
            state.items = state.items.filter(item => item.product !== productId)
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload
            const item = state.items.find(item => item.product === productId)
            if (item) {
                item.quantity = quantity
            }
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        clearCart: (state) => {
            state.items = []
            state.totalItems = 0
            state.totalAmount = 0
        }
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
