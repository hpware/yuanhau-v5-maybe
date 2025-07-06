/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://yuanhau.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "AI2Bot",
        disallow: ["/"],
      },
      {
        userAgent: "Ai2Bot-Dolma",
        disallow: ["/"],
      },
      {
        userAgent: "Amazonbot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Applebot",
        disallow: ["/"],
      },
      {
        userAgent: "Applebot-Extended",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "Claude-Web",
        disallow: ["/"],
      },
      {
        userAgent: "ClaudeBot",
        disallow: ["/"],
      },
      {
        userAgent: "cohere-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Diffbot",
        disallow: ["/"],
      },
      {
        userAgent: "facebookexternalhit",
        disallow: ["/"],
      },
      {
        userAgent: "FriendlyCrawler",
        disallow: ["/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "iaskspider/2.0",
        disallow: ["/"],
      },
      {
        userAgent: "ICC-Crawler",
        disallow: ["/"],
      },
      {
        userAgent: "ImagesiftBot",
        disallow: ["/"],
      },
      {
        userAgent: "img2dataset",
        disallow: ["/"],
      },
      {
        userAgent: "ISSCyberRiskCrawler",
        disallow: ["/"],
      },
      {
        userAgent: "Meta-ExternalAgent",
        disallow: ["/"],
      },
      {
        userAgent: "Meta-ExternalFetcher",
        disallow: ["/"],
      },
      {
        userAgent: "OAI-SearchBot",
        disallow: ["/"],
      },
      {
        userAgent: "omgili",
        disallow: ["/"],
      },
      {
        userAgent: "omgilibot",
        disallow: ["/"],
      },
      {
        userAgent: "PetalBot",
        disallow: ["/"],
      },
      {
        userAgent: "Scrapy",
        disallow: ["/"],
      },
      {
        userAgent: "Sidetrade indexer bot",
        disallow: ["/"],
      },
      {
        userAgent: "Timpibot",
        disallow: ["/"],
      },
      {
        userAgent: "VelenPublicWebCrawler",
        disallow: ["/"],
      },
      {
        userAgent: "Webzio-Extended",
        disallow: ["/"],
      },
      {
        userAgent: "YouBot",
        disallow: ["/"],
      },
      {
        userAgent: "*",
        disallow: ["/admin/"],
      },
    ],
  },
};
