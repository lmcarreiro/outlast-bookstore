import * as http from "../util/http";

const url = "https://gutendex.com/books/";

export type Book = {
  id: number;
  title: string;
  image: string | null;
};

export const getBooks = async (page: number = 1) => {
  const response = await http.getJson<GetBooksResponse>(url, { page });

  return response.results.map(b => ({
    id: b.id,
    title: b.title,
    image: b.formats["image/jpeg"] ?? null,
  }));
};

type GetBooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BookItem[];
};

type BookItem = {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
};

type Person = {
  birth_year: number | null;
  death_year: number | null;
  name: string;
};

type Format = {
  [mimetype: string]: string;
};
