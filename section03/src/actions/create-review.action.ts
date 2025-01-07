'use server';
import { revalidateTag } from 'next/cache';

// --> server action으로써 사용하기 위한 키워드

// 서버액션 함수
// api를 사용하면? 별도의 경로 설정 + 파일추가 + 예외처리 = 귀찮음
// 서버액션 함수 ?단순한 기능으로 간결하게 작성 가능
export async function createReviewAction(state: any, formData: FormData) {
  // FormDataEntryValue : string or file type
  // 받아온 데이터가 string type으로 추론될 수 있게 함.
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`);
    // 성공시
    return {
      status: true,
      error: '',
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
