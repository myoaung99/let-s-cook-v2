import AuthenticationPage from '@/features/authentication';
import React from 'react';
import { NextSeo } from 'next-seo';

const SignUpPage = () => {
    return (
        <>
            <NextSeo title="Sign In Account" />
            <AuthenticationPage />
        </>
    );
};

export default SignUpPage;
