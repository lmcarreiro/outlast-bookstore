import { Request, Response } from "express";
import fetch from "node-fetch";

const user = "leonardo.mcarreiro@gmail.com";

const baseUrl = `https://jsonbase.com/outlast-bookstore`;
const fullUrl = (id: number) => `${baseUrl}/favorites-for-user-${encodeURIComponent(user)}-book-id-${id}`;

type FavoriteData = {
  flag: boolean;
};

export const saveFavorite = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { flag } = req.body as FavoriteData;

  const bookFavoriteUrl = fullUrl(id);

  const data = { flag };
  const response = await fetch(bookFavoriteUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status >= 200 && response.status < 300) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

export const checkFavorite = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const bookFavoriteUrl = fullUrl(id);

  try {
    const response = await fetch(bookFavoriteUrl, { method: "GET" });
    const content = (await response.json()) as FavoriteData;

    res.send({ flag: content.flag });
  } catch {
    res.send({ flag: false });
  }
};
