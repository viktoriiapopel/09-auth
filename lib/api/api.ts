import { Note } from "@/types/note";
import axios from "axios";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteListType {
  notes: Note[];
  totalPages: number;
}

const categories = [
  { id: "Work", title: "Work" },
  { id: "Shopping", title: "Shopping" },
  { id: "Todo", title: "Todo" },
  { id: "Personal", title: "Personal" },
];

export const getCategories = async () => {
  return categories;
};

export interface UserRegister {
  email: string;
  password: string;
}

export interface CheckSession {
  success: boolean;
}
