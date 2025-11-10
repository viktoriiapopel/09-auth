"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./NotesPage.module.css";

import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import type { Note } from "../../../../types/note";
import Link from "next/link";

export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо сторінку
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () =>
      fetchNotes({ page, perPage: 12, search: debouncedSearch, tag }),
    placeholderData: keepPreviousData,
  });

  console.log(" data from query:", data);

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  if (isLoading) {
    return <p className={css.loading}>Loading notes...</p>;
  }

  if (isError) {
    return (
      <div className={css.errorBox}>
        <p className={css.errorTitle}>Failed to load notes 😢</p>
        <p className={css.errorMessage}>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          categoryid={""}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
        {/* <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button> */}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )} */}
    </div>
  );
}
