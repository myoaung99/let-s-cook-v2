import {Provider} from 'react-redux';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {wrapper} from '@/app/store';
import 'nprogress/nprogress.css';
import Layout from '@/components/layout';
import {DefaultSeo} from 'next-seo'
import * as SEO from '../../next-seo.config'
import {Analytics} from '@vercel/analytics/react';
import {useProgressLine} from "@/hooks";

export default function App({Component, pageProps}: AppProps) {
    useProgressLine()

    const {store, props} = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Layout>
                <DefaultSeo {...SEO} />
                    <Component {...props.pageProps} />
                <Analytics/>
            </Layout>
        </Provider>
    );
}
