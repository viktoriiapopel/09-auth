"use client";

import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Note } from "@/types/note";

interface Props {
  notes: Note[];
  totalPages: number;
  categoryid: string;
}

export default function FilterClient({ notes, totalPages, categoryid }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <SearchBox categoryid={categoryid} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <NoteList notes={notes} />
    </>
  );
}
