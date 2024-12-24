import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate('/');
    return res.json({ revalidate: true });
  } catch (err) {
    console.log(err);
    res.status(500).send('Revalidation Failed');
  }
}
