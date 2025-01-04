import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

// 정적인 파라미터를 제외한 모든 경로를 404로 보내고 싶다면?
// export const dynamicParams = false;

// 동적 경로를 갖는 페이지를 Static하게 만드는 방법 = generateStaticParams
// 정적인 파라미터를 생성하는 약속된 함수
// 넥스트 서버는 빌드타임에 자동으로 이 파라미터들을 읽어서 파라미터에 해당하는 페이지를 빌드타임에 정적으로 만든다.
// 1. URL 파라미터값은 반드시 String 이어야 함
// 2. 데이터 캐싱이 설정되지 않은 패치가 존재하더라도 해당 페이지는 스태틱 페이지로 강제로 설정된다.

// 추가로 book/[id] 페이지가 Dynamic page에서 SSG페이지로 바뀌었기 때문에, 아래 url 파라미터값에 없던 페이지경로들은 새롭게 요청이 될때마다 새로 생성하고 페이지캐싱이 진행된다.
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
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
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
