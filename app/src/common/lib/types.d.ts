export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface CopyRequestBody {
  source: string;
  dest: string;
}

export interface ProductDetails {
  uuid: string;
  identifier: string;
  enabled: boolean;
  family: string;
  categories: Array<string>;
  group: Array<string>;
  values: Record<string, AttributeDetails>;
}
interface AttributeDetails {
  locale: string;
  scope?: string;
  data: string | boolean;
  attribute_type?: string;
}
