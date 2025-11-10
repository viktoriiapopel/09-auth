"use client";

import css from "./SearchBox.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBoxProps {
  categoryid: string;
  onChange?: (value: string) => void;
  value?: string;
}

const SearchBox = ({ categoryid, onChange, value }: SearchBoxProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    router.push(
      categoryid === "ALL_NOTES_FILTER"
        ? `/notes/filter/all/${title}`
        : `/notes/filter/${categoryid}/${title}`
    );
  };

  return (
    <form action={onSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={(e) => {
          setTitle(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBox;
