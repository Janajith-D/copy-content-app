export interface ProductDetails {
  uuid: string;
  identifier: string;
  enabled: boolean;
  family: string;
  categories: Array<string>;
  group: Array<string>;
  values: Record<string, AttributeDetails[]>;
}
export interface AttributeDetails {
  locale: string;
  scope?: string;
  data: string | boolean;
  attribute_type?: string;
}

export interface ProductUpdateResponse {
  code: number;
  message: string;
}
