import '../styles/globals.css';
import ClientProvider from '../components/ClientProvider';

export const metadata = {
  title: 'Jacob Fratti',
  description: 'Welcome to my website!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
