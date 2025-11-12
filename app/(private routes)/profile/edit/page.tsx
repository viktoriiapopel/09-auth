// import Link from "next/link";
// import css from "./EditProfilePage.module.css";

// const EditProfile = () => {
//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         <img
//           src="avatar"
//           alt="User Avatar"
//           width={120}
//           height={120}
//           className={css.avatar}
//         />

//         <form className={css.profileInfo}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input id="username" type="text" className={css.input} />
//           </div>

//           {user && <p>{user.email}</p>}

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton}>
//               Save
//             </button>
//             {/* <button type="button" className={css.cancelButton}>
//               Cancel
//             </button> */}
//             <Link href="/profile" className={css.cancelButton}>
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default EditProfile;

"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { useState } from "react";

const EditProfile = () => {
  const user = useAuthStore((state) => state.user);
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // тут буде запит на оновлення профілю, наприклад:
      // await api.patch("/users", { username });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          {user && <p className={css.email}>{user.email}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <Link href="/profile" className={css.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
