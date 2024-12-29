import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Link href={'/'}>index</Link>
          &nbsp;
          <Link href={'/search'}>search</Link>
          &nbsp;
          <Link href={'/book/1'}>book/1</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
