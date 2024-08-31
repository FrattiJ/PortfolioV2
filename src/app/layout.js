import '../styles/globals.css';
import ClientProvider from '../components/ClientProvider';
import Link from 'next/link';

export const metadata = {
  title: 'Jacob Fratti',
  description: 'Welcome to my website!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul className='flex flex-wrap justify-evenly align-center'>
            <li>
              <Link href="/" passHref>
                Home
              </Link>
            </li>
            <li>
              <Link href="/resume" passHref>
                Resume
              </Link>
            </li>
            <li>
              <Link href="/tech-blog" passHref>
                Tech Blog
              </Link>
            </li>
            <li>
              <Link href="/wood-blog" passHref>
                Woodworking Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <ClientProvider>{children}</ClientProvider>
        {/* Maybe add a volleyball blog as well with the ability to post highlight clips */}
      </body>
    </html>
  );
}
