import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/app/store';
import 'nprogress/nprogress.css';
import Layout from '@/components/layout';
import { DefaultSeo } from 'next-seo'
import * as SEO from '../../next-seo.config'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { store, props } = wrapper.useWrappedStore(pageProps);

    useEffect(() => {
        const handleStart = (_: string) => {
            NProgress.start();
        };

        const handleStop = () => {
            NProgress.done();
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

    return (
        <Provider store={store}>
            <Layout>
                <DefaultSeo {...SEO} />
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    );
}
