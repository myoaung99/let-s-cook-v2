import { Button } from '@/components/ui/button';
import React from 'react';
import OtpInput from 'react-otp-input';
import { signupAsync } from '../authSlice';
import { useAppDispatch } from '@/hooks/useDispatch';
import { useAppSelector } from '@/hooks/useSelector';
import { useRouter } from 'next/router';

const OTPForm = ({ userData }: any) => {
    const [otp, setOtp] = React.useState('');
    const dispatch = useAppDispatch();
    const { createSuccess, loading } = useAppSelector((state) => state.auth);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '0 auto',
    };

    const inputStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        border: '2px solid #ccc',
        fontSize: '24px',
        textAlign: 'center',
        margin: '0 10px',
    };

    const handleOtpSubmit = () => {
        dispatch(
            signupAsync({
                name: userData!.name,
                email: userData!.email,
                password: userData!.password,
                otp: otp,
            })
        );
    };

    return (
        <>
            <OtpInput
                value={otp}
                numInputs={4}
                shouldAutoFocus
                onChange={setOtp}
                inputStyle={inputStyle}
                containerStyle={containerStyle}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
            />
            <Button disabled={loading} onClick={handleOtpSubmit}>
                {loading ? 'Submitting' : 'Submit OTP'}
            </Button>

            {createSuccess ? (
                <p>
                    Account created successfully. Redirecting to Login screen...
                </p>
            ) : null}
        </>
    );
};

export default OTPForm;
