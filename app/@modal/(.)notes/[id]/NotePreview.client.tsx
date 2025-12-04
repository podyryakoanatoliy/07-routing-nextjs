"use client";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const close = () => router.back();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;

  if (error || !data) return <p>Some error..</p>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
      </div>
    </Modal>
  );
}
