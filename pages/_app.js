import * as React from 'react';
import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState(false);
  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>JKT48 Member Sorter</title>
        <meta
          name="description"
          content="fanmade JKT48 member sorter website, a simple website to sort your favorite JKT48 members"
        />
        <meta property="og:title" content="JKT48 Member Sorter" />
        <meta
          property="og:description"
          content="fanmade JKT48 member sorter website, a simple website to sort your favorite JKT48 members"
        />
        <meta property="og:url" content="https://jkt48membersorter.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          {pageLoading ? <Loader /> : <Component {...pageProps} />}
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
