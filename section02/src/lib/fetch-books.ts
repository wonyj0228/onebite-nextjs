import { IBook } from '@/types';

export default async function fetchBooks(q?: string): Promise<IBook[]> {
  let url = `https://onebite-books-server-main-ivory.vercel.app/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}