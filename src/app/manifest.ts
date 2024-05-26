import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  short_name: 'Hovhannes - Developer',
  name: 'A website built to showcase my skills and abilities.',
  lang: 'en',
  start_url: '/',
  background_color: '#FFFFFF',
  theme_color: '#FFFFFF',
  dir: 'ltr',
  display: 'standalone',
  prefer_related_applications: false,
  icons: [
    {
      src: '/favicon.ico',
      purpose: 'any',
      sizes: '48x48 72x72 96x96 128x128 256x256',
    },
  ],
});

export default manifest;
