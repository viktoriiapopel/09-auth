import type { Note } from "../../types/note";
import { FetchNotesResponse, CheckSession } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export const fetchNotes = async ({
  tag,
  search,
  page = 1,
  perPage = 12,
}: {
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
} = {}) => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (tag && tag !== "all") params.tag = tag;
  if (search) params.search = search;
  const Cookie = await getAuthCookies();

  console.log("fetchNotes params:", params);
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: { Cookie },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const Cookie = await getAuthCookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie },
  });
  return res.data;
};

export const getMe = async () => {
  const Cookie = await getAuthCookies();
  const { data } = await api.get<User>(`/users/me`, {
    headers: { Cookie },
  });
  return data;
};

export const checkSession = async () => {
  const Cookie = await getAuthCookies();
  const res = await api.get<CheckSession>("/auth/session", {
    headers: { Cookie },
  });
  return res;
};
