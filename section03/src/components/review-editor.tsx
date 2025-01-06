import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

export default async function ReviewEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={id} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
