import {
  AttributeDetails,
  ProductDetails,
  ProductUpdateResponse,
} from "./lib/types";

const getProductByIdentifier = async (id: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer ZDlmY2Y3Yzk4YTA3NWYyOWY2NmE2ODQxOTUzMzgyNDUxZTJjMWNjYjI5NjI4YjM2MzgyMmM3NzA4NzIyMGEzNw"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(
    `https://valoriz.demo.cloud.akeneo.com/api/rest/v1/products/${id}`,
    requestOptions
  );
  const data = await response.json();
  return data;
};

interface ValuesCollection {
  values: Record<string, AttributeDetails[]>;
}

const updateProductDetails = async (
  requestBody: ValuesCollection,
  uuid: string
): Promise<ProductUpdateResponse> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer ZDlmY2Y3Yzk4YTA3NWYyOWY2NmE2ODQxOTUzMzgyNDUxZTJjMWNjYjI5NjI4YjM2MzgyMmM3NzA4NzIyMGEzNw"
  );
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(
    `https://valoriz.demo.cloud.akeneo.com/api/rest/v1/products-uuid/${uuid}`,
    requestOptions
  );

  if (response?.status === 204) {
    return {
      code: 204,
      message: "ACCEPTED",
    };
  } else {
    const data = await response.json();
    return data;
  }
};

export default async function copyProductContent(source: string, dest: string) {
  const sourceProduct: ProductDetails = await getProductByIdentifier(source);
  const destProduct: ProductDetails = await getProductByIdentifier(dest);

  const ignoredAttributes = [
    "sku",
    "ALG_ATT_image_as_image",
    "ALG_ATT_model_no",
    "ALG_ATT_article_no",
  ];

  if (sourceProduct?.family !== destProduct?.family) {
    throw new Error("SKU - Family Should be same");
  }

  const valuesTobeCopied = sourceProduct?.values;

  const filteredValues: Record<string, AttributeDetails[]> = Object.fromEntries(
    Object.entries(valuesTobeCopied).filter(
      ([key]) => !ignoredAttributes.includes(key)
    )
  );

  const requestBody = {
    values: filteredValues,
  };

  const updateResponse = await updateProductDetails(
    requestBody,
    destProduct?.uuid
  );

  if (updateResponse?.code === 204) {
    return "ACCEPTED";
  }

  return "REJECTED";
}
