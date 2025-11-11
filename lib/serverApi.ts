import type { Note } from "../types/note";
import {
  api,
  FetchNotesParams,
  FetchNotesResponse,
  NoteListType,
  CheckSession,
} from "./api";
import { User } from "../types/user";

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

  console.log("fetchNotes params:", params);
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("users/me");
  return data;
};

export const checkSession = async () => {
  const { data } = await api.get<CheckSession>("/auth/session");
  return data.success;
};
