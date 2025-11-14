import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { SITE_URL, NOTE_IMAGE_URL } from "@/lib/constants";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User profile information",
  openGraph: {
    title: "User Profile",
    description: "View your personal profile",
    url: `${SITE_URL}/profile`,
    siteName: "NoteHub",
    images: [
      {
        url: NOTE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "NoteHub Preview Image",
      },
    ],
  },
};

export default async function UserProfile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
