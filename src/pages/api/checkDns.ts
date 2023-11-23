import type { NextApiRequest, NextApiResponse } from 'next';
import dns from 'dns';

type ResponseData = {
  isUrlVerified: boolean;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { domain, ethAddress } = req.query as { domain: string; ethAddress: string };

  try {
    dns.resolveTxt(domain, (err, addresses) => {
      if (err) {
        return res.status(500).json({
          isUrlVerified: false,
        });
      }

      if (!addresses.length) {
        return res.status(200).json({
          isUrlVerified: false,
        });
      }

      const dnsCheck = addresses.filter((item) => item[0].toLowerCase() === ethAddress);

      if (dnsCheck.length <= 0) {
        return res.status(200).json({
          isUrlVerified: false,
        });
      }

      return res.status(200).json({
        isUrlVerified: true,
      });
    });
  } catch (err) {
    return res.status(500).json({
      isUrlVerified: false,
    });
  }
}

export default handler;
