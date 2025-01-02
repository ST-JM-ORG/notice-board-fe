type ParamKeyType = string;
type ParamValueType = string | number | boolean | null;

export type CreateUrlQueryStr = {
  paramKey: ParamKeyType;
  paramValue: ParamValueType;
};

const createQueryParam = (paramKey: ParamKeyType, paramValue: ParamValueType) =>
  `${paramKey}=${paramValue}`;

export const createUrlQueryStr = (params: CreateUrlQueryStr[]): string =>
  params.length
    ? `?${params.map(({ paramKey, paramValue }) => createQueryParam(paramKey, paramValue)).join("&")}`
    : "";
