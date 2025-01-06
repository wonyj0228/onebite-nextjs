'use server'; // --> server action으로써 사용하기 위한 키워드

// 서버액션 함수
// api를 사용하면? 별도의 경로 설정 + 파일추가 + 예외처리 = 귀찮음
// 서버액션 함수 ?단순한 기능으로 간결하게 작성 가능
export async function createReviewAction(formData: FormData) {
  // FormDataEntryValue : string or file type
  // 받아온 데이터가 string type으로 추론될 수 있게 함.
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
  } catch (err) {
    console.log(err);
    return;
  }
}
