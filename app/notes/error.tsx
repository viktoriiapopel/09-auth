"use client";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);
  return <h1>Something went wrong while loading notes 😢</h1>;
}
