import type { Note } from "../../types/note";

import {
  FetchNotesResponse,
  UserRegister,
  CheckSession,
  UpdateUserData,
  nextServer,
} from "./api";

import { User } from "@/types/user";

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
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  {
    return res.data;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (creds: UserRegister) => {
  const { data } = await nextServer.post<User>("/auth/register", creds);
  return data;
};

export const login = async (creds: UserRegister) => {
  const { data } = await nextServer.post<User>("/auth/login", creds);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post(`/auth/logout`);
  return data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>(`/users/me`);
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSession>(`/auth/session`);
  return res.data.success;
};
export const updateMe = async (updateData: UpdateUserData) => {
  const { data } = await nextServer.patch<User>("/users/me", updateData);
  return data;
};
