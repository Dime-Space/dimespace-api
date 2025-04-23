import { SetMetadata } from '@nestjs/common'

export const AUTH_METADATA = 'auth_metadata'

export const Auth = (isAuthenticated: boolean = true) => SetMetadata(AUTH_METADATA, isAuthenticated)
