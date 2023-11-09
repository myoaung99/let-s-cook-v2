import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

interface Returned {
    message: string;
    expiresIn: string;
    token: string;
    userId: string;
}

interface OtpReturned {
    message: string;
}

export const signinAsync = createAsyncThunk(
    'auth/signin',
    async (payload: signIn, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/auth/signin`,
                {
                    body: JSON.stringify(payload),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('signin failed');
            }
            return (await response.json()) as Returned;
        } catch (error) {
            rejectWithValue('signin failed');
        }
    }
);

export const requestOtpAsync = createAsyncThunk(
    'auth/sendOtp',
    async (payload: otp, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/sendOtp`, {
                body: JSON.stringify(payload),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } catch (error) {
            rejectWithValue('otp request failed');
        }
    }
);

export const signupAsync = createAsyncThunk(
    'auth/signup',
    async (payload: signUp, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/auth/signup`,
                {
                    body: JSON.stringify(payload),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('signin failed');
            }
            return (await response.json()) as Returned;
        } catch (error) {
            rejectWithValue('signin failed');
        }
    }
);

interface UsersState {
    isLoggedIn: boolean;
    loading: boolean;
    hasOtp: boolean;
    token: string | undefined;
    message: string | undefined;
    userId: string | undefined;
    createSuccess: boolean;
}
const ISSERVER = typeof window === 'undefined';
const accessToken =
    (!ISSERVER && localStorage.getItem('lets-cook-token')) || undefined;

const initialState = {
    isLoggedIn: accessToken ? true : false,
    token: accessToken,
    hasOtp: false,
    userId: undefined,
    loading: false,
    message: undefined,
    createSuccess: false,
} as UsersState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinAsync.pending, (state, action) => {
                state.loading = true;
                state.isLoggedIn = false;
                state.token = undefined;
            })
            .addCase(signinAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.message = 'Login successful. Welcome';
                state.token = action.payload?.token;
                state.userId = action.payload?.userId;
                localStorage.setItem('lets-cook-token', action.payload!.token);
                localStorage.setItem(
                    'tokenExpiration',
                    action.payload!.expiresIn
                );
            })
            .addCase(signinAsync.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload as string;
            })
            .addCase(signupAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = 'Signup successful. Please signin';
                state.hasOtp = false;
                state.createSuccess = true;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload as string;
            })
            .addCase(requestOtpAsync.pending, (state, action) => {
                state.loading = true;
                state.hasOtp = false;
            })
            .addCase(requestOtpAsync.fulfilled, (state, action) => {
                const isSuccess = action.payload!.status === 201;
                const dupEmail = action.payload!.status === 409;
                let message = 'something bad happened';
                if (dupEmail) {
                    message = 'email already in use';
                }
                if (isSuccess) {
                    message = 'sent otp successfully';
                }

                state.loading = false;
                state.hasOtp = isSuccess ? true : false;
                state.message = message;
            })
            .addCase(requestOtpAsync.rejected, (state, action) => {
                state.loading = false;
                state.hasOtp = false;
                state.message = action.payload as string;
            });
    },
});

export default authSlice.reducer;
