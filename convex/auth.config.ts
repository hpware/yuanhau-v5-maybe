export default {
  providers: [
    {
      domain: process.env.CONVEX_BETTER_AUTH_URL || "http://localhost:3000",
      applicationID: "convex",
    },
  ],
};