export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortColumn {
  path: string;
  order: SortOrder;
}

export enum TablePaths {
  Title = 'Title',
  Body = 'Body',
  Author = 'Author',
  Views = 'Views',
  CreatedAt = 'CreatedAt',
  Joke = 'Joke',
}
