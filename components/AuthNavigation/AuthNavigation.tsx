"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

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
            <Link href="/notes/filter/all">Notes</Link>
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
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
