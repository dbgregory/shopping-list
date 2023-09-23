import { Item, ItemResponse } from "@/types";

const URL = "http://localhost:3333/item";

//r.Route("/item", func(r chi.Router) {
// 		r.Get("/all", h.All)
// 		r.Post("/add", h.Add)
// 		r.Post("/edit", h.Edit)
// 		r.Post("/remove/{id}/{index}", h.RemoveIndex)
// 		r.Post("/purchased/{id}/{index}/{value}", h.UpdatePurchased)
// 	})

export const getAllItems = async (): Promise<ItemResponse[]> => {
  const res = await fetch(URL + "/all");
  return res.json();
};

export const addNewItem = async (
  name: string,
  description: string,
  quantity: number,
): Promise<ItemResponse> => {
  const res = await fetch(URL + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      quantity,
    }),
  });
  return res.json();
};

export const editItem = async (item: Item): Promise<ItemResponse> => {
  const res = await fetch(URL + "/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    }),
  });

  return res.json();
};

export const removeItem = async (
  id: string,
  index: number,
): Promise<ItemResponse | string> => {
  const res = await fetch(URL + `/remove/${id}/${index}`, { method: "POST" });
  return res.json();
};

export const updatePurchased = async (
  id: string,
  index: number,
  value: boolean,
): Promise<ItemResponse> => {
  const res = await fetch(URL + `/purchased/${id}/${index}/${value}`, {
    method: "POST",
  });
  return res.json();
};
