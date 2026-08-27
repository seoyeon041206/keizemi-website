import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const githubBasePath = '/keizemi-website';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: githubBasePath,
      assetPrefix: githubBasePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
