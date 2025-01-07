import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입 북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입 북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'no-store' }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
