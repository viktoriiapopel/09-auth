import type { Note } from "../types/note";
import axios from "axios";
import {
  api,
  FetchNotesParams,
  FetchNotesResponse,
  NoteListType,
  UserRegister,
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

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post<Note>("/notes", noteData);
  {
    return res.data;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (creds: UserRegister) => {
  const { data } = await api.post<User>("/auth/register", creds);
  return data;
};

export const login = async (creds: UserRegister) => {
  const { data } = await api.post<User>("/auth/login", creds);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<{ message: string }>("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("users/me");
  return data;
};

// export const checkSession = async () => {
//   const { data } = await api.get<CheckSession>("/auth/session");
//   return data.success;
// };

// import axios from "axios";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

// export const checkSession = async () => {
//   try {
//     // Робимо запит до бекенду
//     const response = await axios.get(`${API_URL}/auth/session`, {
//       withCredentials: true,
//     });

//     // Повертаємо весь об’єкт відповіді (щоб middleware мав доступ до headers)
//     return response;
//   } catch (error: any) {
//     // Якщо бекенд повернув 401 або 404 — це очікувана поведінка
//     if (error.response) {
//       return error.response;
//     }
//     // У разі інших помилок кидаємо далі
//     throw error;
//   }
// };
export const checkSession = async () => {
  try {
    const response = await api.get("/auth/session");
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response; // повертає навіть 401 або 404
    }

    // Якщо помилка без відповіді (наприклад, network)
    return { status: 500, headers: {}, data: null };
  }
};

export const updateMe = async () => {
  const { data } = await api.patch<User>("users/me");
  return data;
};
