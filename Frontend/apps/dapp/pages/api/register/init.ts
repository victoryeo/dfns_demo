import type { NextApiRequest, NextApiResponse } from 'next'
import { UserAuthKind } from '@dfns/sdk/codegen/datamodel/Auth'
import { dfns } from '../utils'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    console.log(req.body)
    console.log(process.env.DFNS_APPLICATION_ORIGIN)
    // Initiate end-user delegated registration
    const registrationChallenge = await dfns.auth.createDelegatedUserRegistration({
      body: { email: req.body.email, kind: UserAuthKind.EndUser },
    })
    res.status(200).json({ message: 'OK!' })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ message: 'NOK!' })
  }
}