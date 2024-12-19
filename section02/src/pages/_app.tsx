import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>글로벌헤더</header>
      <Component {...pageProps} />;
    </>
  );
}
