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

export const createRowNum = (
  pageSize: number,
  pageNo: number,
  totalCount: number,
  index: number,
) => totalCount - (pageNo - 1) * pageSize - index;
