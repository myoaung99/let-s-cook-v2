import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
interface signIn {
    email: string;
    password: string;
}

interface signUp {
    name: string;
    email: string;
    password: string;
    otp: string;
}

interface otp {
    email: string;
}

export const signinAsync = createAsyncThunk(
    'auth/signin',
    async (payload: signIn, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/auth/signin`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response.data.message || 'signin failed'
            );
        }
    }
);

export const requestOtpAsync = createAsyncThunk(
    'auth/sendOtp',
    async (payload: otp, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/sendOtp`,
                payload
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response.data.message || 'otp request failed'
            );
        }
    }
);

export const signupAsync = createAsyncThunk(
    'auth/signup',
    async (payload: signUp, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/auth/signup`,
                payload
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response.data.message || 'signin failed'
            );
        }
    }
);

interface UsersState {
    loading: boolean;
    hasOtp: boolean;
    createSuccess: boolean;
    message: string | undefined;
    messageType: string | undefined;

    isLoggedIn: boolean;
    token: string | undefined;
    user: { email: string; name: string } | undefined;
}
const ISSERVER = typeof window === 'undefined';
const accessToken =
    (!ISSERVER && localStorage.getItem('lets-cook-token')) || undefined;
const user = (!ISSERVER && localStorage.getItem('lets-cook-user')) || undefined;

const initialState = {
    loading: false,
    hasOtp: false,
    createSuccess: false,

    message: undefined,
    messageType: undefined,

    user: user ? JSON.parse(user) : undefined,
    token: accessToken,
    isLoggedIn: accessToken ? true : false,
} as UsersState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // fill in primary logic here
        clearMessage: (state) => {
            state.message = undefined;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = undefined;
            state.user = undefined;
            localStorage.removeItem('lets-cook-token');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('lets-cook-user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinAsync.pending, (state, action) => {
                state.loading = true;
                state.isLoggedIn = false;
                state.token = undefined;
                state.message = undefined;
                state.messageType = undefined;
                state.createSuccess = false;
            })
            .addCase(signinAsync.fulfilled, (state, action: any) => {
                state.token = action.payload!.token;
                state.user = action.payload!.user;

                localStorage.setItem('lets-cook-token', action.payload!.token);
                localStorage.setItem(
                    'tokenExpiration',
                    action.payload!.expiresIn
                );
                localStorage.setItem(
                    'lets-cook-user',
                    JSON.stringify(action.payload!.user)
                );

                state.loading = false;
                state.isLoggedIn = true;
                state.message = action.payload.message as string;
                state.messageType = 'default';
            })
            .addCase(signinAsync.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload as string;
                state.messageType = 'destructive';
            })
            .addCase(signupAsync.pending, (state, action) => {
                state.loading = true;
                state.createSuccess = false;
                state.message = undefined;
                state.messageType = undefined;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.hasOtp = false;
                state.createSuccess = true;

                state.message = action.payload.message;
                state.messageType = 'default';
            })
            .addCase(signupAsync.rejected, (state, action: any) => {
                state.loading = false;
                state.hasOtp = true;
                state.createSuccess = false;
                state.message = action.payload;
                state.messageType = 'destructive';
            })
            .addCase(requestOtpAsync.pending, (state, action) => {
                state.loading = true;
                state.hasOtp = false;
                state.createSuccess = false;
                state.message = undefined;
                state.messageType = undefined;
            })
            .addCase(requestOtpAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.hasOtp = true;
                state.message = action.payload.message as string;
                state.messageType = 'default';
            })
            .addCase(requestOtpAsync.rejected, (state, action: any) => {
                console.log('payload', action.payload);
                state.loading = false;
                state.hasOtp = false;
                state.message = action.payload as string;
                state.messageType = 'destructive';
            });
    },
});

export const { clearMessage, logout } = authSlice.actions;

export default authSlice.reducer;
