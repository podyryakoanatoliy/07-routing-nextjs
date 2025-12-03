import { getCategories } from "@/lib/api";
import Link from "next/link";
const NotesSidebar = async () => {
  const categories = await getCategories();
  return (
    <ul>
      <li>
        <Link href={`/notes/filter/all`}>All notes</Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/notes/filter/${category.id}`}>{category.tag}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
