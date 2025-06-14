import { SetMetadata } from '@nestjs/common'

export const AUTH_METADATA = 'auth_metadata'

export const Auth = (isAuthenticatedRoute: boolean = true) =>
  SetMetadata(AUTH_METADATA, isAuthenticatedRoute)
