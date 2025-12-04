"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
// import { BallTriangle } from "react-loader-spinner";
// import Alert from "@mui/material/Alert";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";

export default function NotesClient() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // console.log(tag);
  const handleChange = useDebouncedCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(evt.target.value);
      setPage(1);
    },
    1000
  );

  const { slug } = useParams<{ slug: string }>();
  const tag = slug && slug[0] === "All" ? "" : slug[0];
  const queryKey = tag
    ? ["notes", { query, page, tag }]
    : ["notes", { query, page }];

  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  // console.log(data);
  const handleCloseModal = () => setOpenModal(!openModal);
  if (isLoading) return <p>Loading...</p>;

  if (error || !data) return <p>Some error..</p>;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {data !== undefined && data?.totalPages > 1 && (
          <Pagination
            totalPage={data.totalPages}
            currentPage={page}
            changePage={(pg) => setPage(pg)}
          />
        )}
        <button className={css.button} onClick={() => setOpenModal(!openModal)}>
          Create note +
        </button>
        {openModal && (
          <Modal onClose={handleCloseModal}>
            {" "}
            <NoteForm closeModal={handleCloseModal} />{" "}
          </Modal>
        )}
      </header>
      {data !== undefined && <NoteList notes={data.notes} />}
    </div>
  );
}
