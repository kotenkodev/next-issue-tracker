import NavBar from '@/components/NavBar';
import AuthProvider from '@/components/Provider';
import Provider from '@/components/QueryProvider';
import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './theme-config.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A simple issue tracker built with Next.js and TypeScript.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Provider>
          <AuthProvider>
            <Theme accentColor="purple" grayColor="sage">
              <NavBar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </body>
    </html>
  );
}
