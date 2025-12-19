import type { NextConfig } from "next";
import withPlugins from "next-compose-plugins";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
//const withOtherPlugin = createPlugin();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farmui.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**/*.jpg",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**/*.jpg",
      },
    ],
  },
};

export default withPlugins([withNextIntl], nextConfig);
