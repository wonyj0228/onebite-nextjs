import { IBook } from '@/types';

export default async function fetchOneBook(id: number): Promise<IBook | null> {
  const url = `https://onebite-books-page-lemon-beta.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
