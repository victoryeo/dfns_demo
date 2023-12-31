import type { NextApiRequest, NextApiResponse } from 'next'
import { UserAuthKind } from '@dfns/sdk/codegen/datamodel/Auth'
import { dfns } from '../utils'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body)
    const emailBody = JSON.parse(req.body)
    console.log(emailBody.email)
    console.log(process.env.DFNS_APPLICATION_ORIGIN)
    // Initiate end-user delegated registration
    const registrationChallenge = await dfns.auth.createDelegatedUserRegistration({
      body: { email: emailBody.email, kind: UserAuthKind.EndUser },
    })
    console.log(registrationChallenge)
    res.status(200).json(registrationChallenge)
  } else {
    // Handle any other HTTP method
    res.status(200).json({ message: 'NOK!' })
  }
}