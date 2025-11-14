import type { Note } from "../../types/note";
import {
  FetchNotesParams,
  FetchNotesResponse,
  NoteListType,
  CheckSession,
} from "./api";
import { api } from "../../app/api/api";
import { User } from "../../types/user";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

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
  const { data } = await api.get<User>("users/me", {
    headers: { Cookie },
  });
  return data;
};

// export const checkSession = async () => {
//   const { data } = await api.get<CheckSession>("/auth/session");
//   return data.success;
// };
export const checkSession = async (): Promise<AxiosResponse | undefined> => {
  const Cookie = await getAuthCookies();
  try {
    const response = await api.get("/auth/session", {
      headers: { Cookie },
    });
    console.log("✅ checkSession response:", response.status, response.data);
    return response;
  } catch (error: any) {
    console.log(
      "❌ checkSession error:",
      error.response?.status,
      error.response?.data
    );
    if (error.response) {
      return error.response as AxiosResponse;
    }
    console.error("checkSession error:", error);
    return undefined; // ✅ замість кидання необробленої помилки
  }
};
