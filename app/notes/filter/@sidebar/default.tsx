import { getCategories } from "@/lib/api";
import { ALL_NOTES_FILTER } from "@/lib/constants";
import Link from "next/link";
import css from "./SidebarNotes.module.css";

const SidebarNotes = async () => {
  const categories = await getCategories();

  return (
    <nav>
      <h2>Categories</h2>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href={`/notes/filter/${ALL_NOTES_FILTER}`}
            className={css.menuLink}
          >
            All
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item.id} className={css.menuItem}>
            <Link href={`/notes/filter/${item.id}`} className={css.menuLink}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNotes;
