// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
    return c.json();
};

const getUrl = (contextUrl: string): string => {

  const url = new URL(contextUrl);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL;

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
    'Content-Type': 'application/json',
  };
};

export const customFetch = async <T>(       
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};