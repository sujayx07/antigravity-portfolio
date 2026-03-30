import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sujayx07.xyz/sitemap.xml",
    host: "https://sujayx07.xyz",
  };
}
