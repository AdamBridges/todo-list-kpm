import '@mantine/core/styles.css';
import cx from 'clsx';
import type { AppProps } from 'next/app';
import { AppShell, Container, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  autoContrast: true,
  headings: {
    sizes: {
      h1: { fontSize: '2rem' },
      h2: { fontSize: '1.5rem' },
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}