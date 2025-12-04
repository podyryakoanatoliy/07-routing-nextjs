import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: { query?: string; id?: string };
};

const Notes = async ({ params, searchParams }: Props) => {
  const query = searchParams?.query ?? "";

  const id = searchParams?.id ?? "1";
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  // console.log(slug);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, id, tag],
    queryFn: () => fetchNotes(query, Number(id), tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
