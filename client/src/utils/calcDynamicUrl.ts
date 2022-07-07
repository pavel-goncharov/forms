export default function calcDynamicUrl(url: string, id: number): string {
	const subStr: string = ':id';
  const dynamicUrl = url.replace(subStr, id.toString());
  return dynamicUrl;
}