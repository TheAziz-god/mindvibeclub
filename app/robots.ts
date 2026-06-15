import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.mindvibeclub.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/profile", "/login"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}