'use client';

import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';
import { usePathname } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor() {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input
          name="bookId"
          value={pathname.split('/').pop()}
          hidden
          readOnly
        />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
