import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
}

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";
const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

export const fetchNotes = async ({
  search,
  page,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers,
    params: {
      page,
      search,
      perPage,
    },
  });
  return response.data;
};

export const createNote = () => {};

export const deleteNote = () => {};
