import Link from "next/link";
import css from "./ProfilePage.module.css";
import { Metadata } from "next/types";
import { NOTE_IMAGE_URL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Profile a personal new profile",
  openGraph: {
    title: "Edit Profile",
    description: "Edit Profile a personal new profile",
    url: `${SITE_URL}/notes`,
    siteName: "NoteHub",
    images: [
      {
        url: NOTE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Image NoteHub",
      },
    ],
  },
};

const UserProfile = () => {
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
          <img
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
