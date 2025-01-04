'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import style from './serachbar.module.css';

export default function Searchbar() {
  const router = useRouter();
  // useSearchParams
  // : 비동기로 작업. 브라우저로부터 요청을 받은 query String을 불러오는 훅
  // : build 타임에는 실행될 수 없기 때문에 searchbar 컴포넌트를 불러오는 페이지가 정적페이지인 경우 풀라우트캐시 진행시 에러발생
  // : Searchbar 컴포넌트 자체를 Suspense로 감싸줄 필요가 있다.
  // : Suspense로 감싸면 서버측 사전렌더링에서 제외됨.
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
