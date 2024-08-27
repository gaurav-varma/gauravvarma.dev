import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="Gaurav Varma"
        description="I'm a Full Stack Ruby on Rails engineer."
        canonical={'https://gauravvarma.dev'}
        openGraph={{
          site_name: 'Gaurav Varma',
          title: 'Gaurav Varma',
          description: "I'm a Full Stack Ruby on Rails engineer.",
          images: [
            {
              url: 'https://www.gauravvarma.dev/gauravvarma.jpg',
              width: 100,
              height: 100,
              alt: 'Gaurav Varma Ruby on Rails Developer',
            },
          ],
        }}
        twitter={{
          handle: '@gauravvarmaa',
          site: '@gauravvarmaa',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'application-name',
            content: 'Gaurav Varma',
          },
          {
            name: 'msapplication-TileColor',
            content: '#ffffff',
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Gaurav Varma',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'icon',
            href: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            rel: 'icon',
            href: '/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            rel: 'manifest',
            href: '/manifest.webmanifest',
          },
          {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#000000',
          },
          {
            rel: 'apple-touch-icon',
            href: '/touch-icons/apple-touch-icon-ipad-retina-152x152.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/touch-icons/apple-touch-icon-ipad-76x76.png',
            sizes: '60x60',
          },
          {
            rel: 'apple-touch-icon',
            href: '/touch-icons/apple-touch-icon-ipad-retina-152x152.png',
            sizes: '144x144',
          },
          {
            rel: 'apple-touch-icon',
            href: '/touch-icons/apple-touch-icon-iphone-60x60.png',
            sizes: '60x60',
          },
          {
            rel: 'apple-touch-icon',
            href: '/touch-icons/apple-touch-icon-iphone-retina-120x120.png',
            sizes: '114x114',
          },
        ]}
      />
      <PlausibleProvider
        domain={process.env.NEXT_PUBLIC_REACT_APP_UI_DOMAIN_HOST}
        selfHosted
        customDomain={process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN_HOST}
        trackOutboundLinks
      >
        <Component {...pageProps} />
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
