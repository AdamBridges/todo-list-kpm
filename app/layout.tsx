import type { Metadata } from "next";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "KPM Task List",
  description: "A simple task list application built by Adam Bridges with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
