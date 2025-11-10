import Link from "next/link";
import css from "./Home.module.css";
import { NOTE_IMAGE_URL, SITE_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "404 - Page not found",
    description: "The page you are looking for does not exist",
    url: SITE_URL,
    siteName: `${SITE_URL}/404`,
    images: [
      {
        url: NOTE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
