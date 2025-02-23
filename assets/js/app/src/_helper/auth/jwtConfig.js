// ** Auth Endpoints
export const jwtConfig = {
  loginEndpoint: '/login',
  registerEndpoint: 'jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',
  tokenParameterName: 'bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  tokenUserKeyName: 'tokenUser',
  storageRefreshTokenKeyName: 'refreshToken'
}
