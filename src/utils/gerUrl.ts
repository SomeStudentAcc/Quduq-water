const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const getCdnUrl = () => CDN_URL;
export const getUrl = (url: string, key: string) => {

  return `${CDN_URL}/${key}/${url}`;
};
