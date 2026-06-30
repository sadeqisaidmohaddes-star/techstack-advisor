/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/techstack-advisor" : "",
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
