export type ItemResponse = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  purchased: boolean[];
  createdAt: number;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  purchased: boolean;
  quantity: number;
  index: number;
};
