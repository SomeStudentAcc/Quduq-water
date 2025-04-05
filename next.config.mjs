import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  images: {
    domains: ["cdn.quduqwater.uz"],
  },
};

export default withNextIntl(nextConfig);
