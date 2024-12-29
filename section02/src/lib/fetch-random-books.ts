import { IBook } from '@/types';

export default async function fetchRandomBooks(): Promise<IBook[]> {
  const url = `https://onebite-books-server-main-ivory.vercel.app/book/random`;

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
