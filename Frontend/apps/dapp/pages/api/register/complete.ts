import type { NextApiRequest, NextApiResponse } from 'next'
import { BaseAuthApi, CreateUserRegistrationRequest } from '@dfns/sdk/baseAuthApi'
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
    const reqBody = JSON.parse(req.body)
    console.log(reqBody)
    console.log(process.env.DFNS_APPLICATION_ORIGIN)

    // Complete end-user registration
    const result = await BaseAuthApi.createUserRegistration(reqBody.signedChallenge, {
      appId: process.env.DFNS_APPLICATION_ID!,
      baseUrl: process.env.DFNS_API_BASE_URL!,
      authToken: reqBody.tempAuthToken,
    })
    // Create a generic permission to get/create wallets (can skip if permission was already created once)
    const permission = await dfns.permissions.createPermission({
      body: {
        name: `Allow Wallet Create/Read - ${Date.now()}`,
        operations: ['Wallets:Create', 'Wallets:Read'],
      },
    })
    // Grant (assign) the permission to the end-user
    const permissionAssignment = await dfns.permissions.createPermissionAssignment({
      body: {
        permissionId: permission.id,
        identityId: result.user.id,
      },
    })
    // Perform delegated login to get the Dfns auth token of the end-user ("on his behalf")
    const { token: userAuthToken } = await dfns.auth.createDelegatedUserLogin({
      body: { username: result.user.username },
    })

    res.status(200).json({result, permission, permissionAssignment})
  } else {
    // Handle any other HTTP method
    res.status(200).json({ message: 'NOK!' })
  }
}