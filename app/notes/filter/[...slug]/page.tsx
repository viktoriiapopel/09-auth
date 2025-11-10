import { fetchNotes } from "@/lib/api";
import { ALL_NOTES_FILTER, NOTE_IMAGE_URL, SITE_URL } from "@/lib/constants";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noteCategories =
    slug[0] === ALL_NOTES_FILTER ? "All notes" : `${slug[0]} category`;
  return {
    title: noteCategories,
    description: `Notes filter: ${noteCategories}`,
    openGraph: {
      title: noteCategories,
      description: `Notes filter: ${noteCategories}`,
      url: `${SITE_URL}/notes/filter/${slug[0]}`,
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
}

const PER_PAGE = 12;

const FilterPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug[0] === ALL_NOTES_FILTER ? undefined : slug[0];
  const title = slug[1] || "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag, title, page: 1, perPage: PER_PAGE }],
    queryFn: () =>
      fetchNotes({ tag, search: title, page: 1, perPage: PER_PAGE }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default FilterPage;
