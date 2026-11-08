import axios from "axios";
import type { CreateNote, Note } from "../types/note";

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

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, newNote, { headers });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
    headers,
  });
  return response.data;
};
