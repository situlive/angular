export interface AuthConfig {
  basicAuthorization: string;
  identityServerUrl: string;
  grantType: string;
  scopes: string;
  debug?: boolean;
}
