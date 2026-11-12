import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'User story format poll',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <header className="site-header">
          <div className="inner">
            <img src="/fca-logo-white.svg" alt="Field Control Analytics" />
            <span className="divider" />
            <span className="app-name">User story format poll</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
