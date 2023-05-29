export type Joke = {
  id: string;
  Title: string;
  Body: string;
  Author: string;
  Views: number;
  CreatedAt: string;
  Joke: string;
};

export type TableColumns = {
  path: string;
  label: string;
  content?: (joke: Joke) => JSX.Element;
};
