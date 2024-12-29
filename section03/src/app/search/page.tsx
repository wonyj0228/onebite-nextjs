// app router의 페이지 props => 페이지로 전달되는 url 파라미터나 query string값은 모두 props로 전달됨
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search 페이지 : {q}</div>;
}
