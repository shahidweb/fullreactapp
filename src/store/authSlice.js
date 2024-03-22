import { createSlice } from "@reduxjs/toolkit";
import { storageService } from "../components";

const initialState = () => {
    const user = storageService.getItem(storageService.sessionKey.login);
    if (user?.isLoggedIn) {
        return user;
    }
    return { isLoggedIn: false, accessToken: '', refreshToken: '', user: '' }
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signup: () => {},
        login: (state, action) => {
            state = { ...state, ...action.payload.data }
            state.isLoggedIn = state.accessToken ? true : false;
            storageService.setItem(storageService.sessionKey.login, state);
            return state;
        },
        logout: (state) => {
            storageService.removeItem(storageService.sessionKey.login);
            state = initialState();
            return state;
        }
    }

})


export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;