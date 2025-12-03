import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import css from "./SidebarNotes.module.css";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesSidebar({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await fetchNotes(category);
  return (
    // <ul className={css.menuList}>
    //   <li className={css.menuItem}>
    //     <Link href="/notes/filter/all" className={css.menuLink}>
    //       All notes
    //     </Link>
    //   </li>
    //   {tags.notes.map((tag) => (
    //     <li className={css.menuItem} key={tag.id}>
    //       <Link href={`/notes/filter/${tag.tag}`} className={css.menuLink}>
    //         {tag.tag}
    //       </Link>
    //     </li>
    //   ))}
    // </ul>
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
}
