import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { NOTE_IMAGE_URL, SITE_URL } from "@/lib/constants";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id);
  return {
    title: title,
    description: content,
    openGraph: {
      title: title,
      description: content,
      url: `${SITE_URL}/notes/filter/${id}`,
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

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteid={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
