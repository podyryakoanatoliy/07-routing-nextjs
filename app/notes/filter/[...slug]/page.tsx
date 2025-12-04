import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
  // searchParams: { query?: string; id?: string };
};

const Notes = async ({ params }: Props) => {
  // const query = searchParams?.query ?? "";
  // const id = searchParams?.id ?? "1";

  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];
  // console.log(slug);

  const queryKey = tag
    ? ["notes", { query: "", page: 1, tag }]
    : ["notes", { query: "", page: 1 }];
  await queryClient.prefetchQuery({
    queryKey: ["notes", queryKey],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
