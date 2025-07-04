import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "吳元皓",
  description: "吳元皓的個人網站",
  keywords:
    "吳元皓, 吳元皓的個人網站, 吳元皓的個人網站首頁, Howard Wu, yuanhau, wuyuanhau, yuanhau.com, yuanh.xyz, Yuan-Hau Wu, 吳元皓, 元皓, 吳元皓, 吳元浩, 元浩, 吳元浩, 吳元浩, 五專生, ictechz, 台灣的五專生, 吴元皓, 吴元皓的网站,吴元浩,元浩,吴元浩的网站,吴元浩,五专生,ictechz,摄影,前端方面, 個人資料連結",
  authors: [
    {
      name: "吳元皓",
    },
  ],
  category: "Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="og:author:email" content="yhcom+v5@yuanhau.com" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
          <script
            defer
            src="https://data.yuanhau.com/script.js"
            data-website-id="6f5e2db3-bb3b-4bda-938d-2b6a8b49476b"
          ></script>
        </head>
        <body
          className={`${robotoCondensed.variable} font-['Huninn'] antialiased m-0 p-0`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SpeedInsights />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
