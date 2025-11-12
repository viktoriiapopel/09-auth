"use client";

export default function NoteError({ error }: { error: Error }) {
  console.error(error);
  return <h1>Failed to load note 😢</h1>;
}
