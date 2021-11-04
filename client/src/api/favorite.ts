import * as http from "../util/http";

const url = "http://localhost:3030/api";

export const saveFavorite = async (id: number, flag: boolean): Promise<void> => {
  await http.postJson(`${url}/saveFavorite/${id}`, { flag });
};

export const checkFavorite = async (id: number): Promise<boolean> => {
  const result = await http.getJson<{ flag: boolean }>(`${url}/checkFavorite/${id}`);
  return result.flag;
};
