/** @type {import('next').NextConfig} */
const repo = "Early-Retirement";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig = {
    basePath,
    assetPrefix,
    output: 'export'
};

export default nextConfig;
