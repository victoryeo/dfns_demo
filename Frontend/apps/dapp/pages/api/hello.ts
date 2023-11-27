import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  res.status(200).json({ message: 'Hello from Next.js!' })
}