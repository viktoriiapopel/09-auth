"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.client.module.css";

interface NoteDetailsClientProps {
  noteid: string;
  isModal?: boolean;
}

export default function NoteDetailsClient({ noteid }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteid],
    queryFn: () => fetchNoteById(noteid),
    enabled: !!noteid,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError)
    return (
      <div className={css.errorBox}>
        <p className={css.errorTitle}>Something went wrong 😢</p>
        <p className={css.errorMessage}>{(error as Error).message}</p>
      </div>
    );

  if (!note) return <p>No note found with this ID.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created at: {note.createdAt}</p>
      </div>
    </div>
  );
}
