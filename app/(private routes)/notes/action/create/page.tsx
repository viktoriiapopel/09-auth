import css from "./CreateNote.module.css";
import { Metadata } from "next";
import { NOTE_IMAGE_URL, SITE_URL } from "@/lib/constants";
import CreateNoteClient from "./CreateNoteClient";

export const metadata: Metadata = {
  title: "Create new note",
  description: "Creating a personal new note",
  openGraph: {
    title: "Create new note",
    description: "Creating a personal new note",
    url: `${SITE_URL}/notes/action/create`,
    siteName: "NoteHub",
    images: [
      {
        url: NOTE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Image NoteHub",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
};

export default CreateNote;
