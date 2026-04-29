import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Singular Design System',
  description:
    'A multi-brand, scalable Design System for WalaPlus, WalaOne, and Doam products on Mobile and Web.',
  keywords: [
    'design system',
    'flutter',
    'ui kit',
    'components',
    'tokens',
    'walaplus',
    'walaone',
    'doam',
  ],
  authors: [{ name: 'Singular Team' }],
  openGraph: {
    title: 'Singular Design System',
    description:
      'A multi-brand, scalable Design System for WalaPlus, WalaOne, and Doam products.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singular Design System',
    description:
      'A multi-brand, scalable Design System for WalaPlus, WalaOne, and Doam products.',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers defaultLocale={locale as 'en' | 'ar'}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

