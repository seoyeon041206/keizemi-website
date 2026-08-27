const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const siteBasePath = configuredBasePath.endsWith('/')
  ? configuredBasePath.slice(0, -1)
  : configuredBasePath;

export function siteHref(href: string) {
  if (!siteBasePath || !href.startsWith('/') || href.startsWith('//')) return href;
  return `${siteBasePath}${href}`;
}
