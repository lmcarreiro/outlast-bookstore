import { Request, Response } from "express";
import fetch from "node-fetch";

const user = "leonardo.mcarreiro@gmail.com";

const baseUrl = `https://jsonbase.com/outlast-bookstore`;

type FavoriteData = {
  flag: boolean;
};

export const saveFavorite = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { flag } = req.body as FavoriteData;

  const bookFavoriteUrl = `${baseUrl}/favorites-for-user-${encodeURIComponent(user)}/${id}`;

  const data = { flag };
  const response = await fetch(bookFavoriteUrl, { method: "PUT", body: JSON.stringify(data) });

  res.send({ success: true });
};

export const checkFavorite = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const bookFavoriteUrl = `${baseUrl}/favorites-for-user-${encodeURIComponent(user)}/${id}`;

  try {
    const response = await fetch(bookFavoriteUrl, { method: "GET" });
    const content = (await response.json()) as FavoriteData;

    res.send({ flag: content.flag });
  } catch {
    res.send({ flag: false });
  }
};
