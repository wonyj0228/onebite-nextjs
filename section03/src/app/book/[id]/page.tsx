import { BookData, ReviewData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => ({ id: book.id.toString() }));
}

async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }
  const book: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${id}`,
    { next: { tags: [`review-${id}`] } }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => {
        return <ReviewItem key={`review-item-${review.id}`} {...review} />;
      })}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();
  return {
    title: `${book.title} - 한입 북스`,
    description: book.description,
    openGraph: {
      title: `${book.title} - 한입 북스`,
      description: book.description,
      images: [book.coverImgUrl],
    },
  };
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className={style.container}>
      <BookDetail params={params} />
      <ReviewEditor />
      <ReviewList params={params} />
    </div>
  );
}
