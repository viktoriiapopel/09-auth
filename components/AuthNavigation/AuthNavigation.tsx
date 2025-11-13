"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { ALL_NOTES_FILTER } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  // логаут
  // очистка стану аутентифікації
  // перенаправлення

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };
  if (!isAuthenticated)
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
            <li className={css.navigationItem}>
              <Link
                href="/sign-in"
                prefetch={false}
                className={css.navigationLink}
              >
                Login
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/sign-up"
                prefetch={false}
                className={css.navigationLink}
              >
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
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
          <li>
            <Link href={`/notes/filter/${ALL_NOTES_FILTER}`}>Notes</Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            {user && <p>{user.email}</p>}
            {/* <p className={css.userEmail}>User email</p> */}
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
            {/* <Link href="/login" prefetch={false} className={css.logoutButton}>
              Logout
            </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
