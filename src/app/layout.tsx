import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Orbitron, Rajdhani, Audiowide } from "next/font/google";
import "./globals.css";

// Font configuration
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Cinematic fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
});

const audiowide = Audiowide({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-audiowide",
  weight: "400",
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://rahulraj.dev"),
  title: "Rahul Raj | AI-Focused Software Engineer",
  description:
    "Portfolio of Rahul Raj - AI-focused software engineer building end-to-end LLM applications, RAG systems, backend services, and reliable test automation workflows.",
  keywords: [
    "Rahul Raj",
    "Software Engineer",
    "AI-Focused Software Engineer",
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "React",
    "Python",
    "Frontend Developer",
    "Full Stack Developer",
    "Portfolio",
    "Germany",
    "BTU Cottbus",
  ],
  authors: [{ name: "Rahul Raj", url: "https://rahulraj.dev" }],
  creator: "Rahul Raj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulraj.dev",
    siteName: "Rahul Raj Portfolio",
    title: "Rahul Raj | AI-Focused Software Engineer",
    description:
      "Building production-grade LLM and RAG systems with strong backend engineering, test automation, and data pipelines.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rahul Raj - Software Engineer & AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Raj | AI-Focused Software Engineer",
    description:
      "Building production-grade LLM and RAG systems with strong backend engineering and automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f5f9fc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${rajdhani.variable} ${audiowide.variable} font-sans antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>

        {/* Main content */}
        {children}

        {/* Noise overlay for premium texture */}
        <div className="noise pointer-events-none" aria-hidden="true" />
      </body>
    </html>
  );
}
