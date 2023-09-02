import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/app/store';
import { Provider } from 'react-redux';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    );
}
