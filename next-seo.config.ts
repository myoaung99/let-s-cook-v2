import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps ={
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        site_name: 'SiteName',
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
}
