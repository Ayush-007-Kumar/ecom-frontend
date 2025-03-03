import {configureStore} from "@reduxjs/toolkit"
import { productReducer } from "./productReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

    const selectedCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : null;

const initialState = {
    carts: {cart: cartItems},
    auth: { user: user, selectedCheckoutAddress },
    // totalPrice: 0,  
    //     cartId: null
}

const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer
    },
    preloadedState: initialState
});

export default store;