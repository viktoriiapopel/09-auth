"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { ALL_NOTES_FILTER } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = () => {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  function clsx(link: any, arg1: any): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
    // <AuthNavigation />
  );
};

export default Header;
