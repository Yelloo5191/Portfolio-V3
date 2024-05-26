/* eslint-disable sonarjs/no-duplicate-string */
import type { Metadata, Viewport } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'nextarter-chakra';

export const metadata: Metadata = {
  title: 'Hovhannes - Developer',
  description: 'A website built to showcase my skills and abilities.',
  icons: [
    {
      url: '/favicon.ico',
      sizes: '48x48 72x72 96x96 128x128 256x256',
    },
  ],
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'hovhannes.org',
    title: 'Hovhannes - Developer',
    description: 'A website built to showcase my skills and abilities.',
    images: [
      {
        url: 'https://i.imgur.com/sl8YKNr.png',
        alt: 'Hovhannes - Developer',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
