import { AuthConfig } from './auth-config';
import { ContentfulConfig } from './contentful-config';

export interface CoreConfig {
  authentication: AuthConfig;
  contentful: ContentfulConfig;
}
