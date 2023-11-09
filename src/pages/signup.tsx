import AuthenticationPage from '@/features/authentication';
import React from 'react';
import { NextSeo } from 'next-seo';

const SignUpPage = () => {
    return (
        <>
            <NextSeo title="Create an accunt" />
            <AuthenticationPage />
        </>
    );
};

export default SignUpPage;
