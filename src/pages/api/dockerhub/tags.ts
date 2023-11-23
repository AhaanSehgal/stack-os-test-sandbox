import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { officialImage, repository, page, ordering, name } = req.query;

  try {
    const { data } = await axios.get(
      `https://hub.docker.com/v2/repositories/${officialImage === 'true' ? 'library/' : ''}${
        repository && `${repository}/`
      }/tags?${page && `page=${page}`}${ordering && `&ordering=${ordering}`}${
        name && `&name=${name}`
      }`
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export default handler;
