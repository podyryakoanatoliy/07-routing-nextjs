import Link from "next/link";
import css from "./SidebarNotes.module.css";

interface Tag {
  id: number;
  tag: string;
}
const NotesSidebar = async () => {
  const tags: Tag[] = [
    { id: 1, tag: "Todo" },
    { id: 2, tag: "Work" },
    { id: 3, tag: "Personal" },
    { id: 4, tag: "Meeting" },
    { id: 5, tag: "Shopping" },
  ];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((category) => (
        <li key={category.id} className={css.menuItem}>
          <Link className={css.menuLink} href={`/notes/filter/${category.tag}`}>
            {category.tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
