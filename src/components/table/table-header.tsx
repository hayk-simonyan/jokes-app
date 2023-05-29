import React, { useState } from 'react';

import { TableColumns } from '../../utils/types';
import { SortColumn, SortOrder, TablePaths } from './types';

type TableHeaderProps = {
  columns: TableColumns[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
};

const SORTABLE_COLUMNS: TableColumns['label'][] = [
  TablePaths.Views,
  TablePaths.CreatedAt,
];

const TableHeader = ({ columns, sortColumn, onSort }: TableHeaderProps) => {
  const [sortBy, setSortBy] = useState('');

  const raiseSort = (path: string) => {
    const column = { ...sortColumn };
    if (column.path === path) {
      column.order =
        column.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
      setSortBy(column.path);
    } else {
      column.path = path;
      column.order = SortOrder.ASC;
      setSortBy(column.path);
    }
    onSort(column);
  };

  return (
    <thead>
      <tr>
        {columns.map((column: TableColumns) =>
          SORTABLE_COLUMNS.includes(column.label) ? (
            <th
              key={column.label + column.path}
              onClick={() => column.path && raiseSort(column.path)}
              style={{
                color: sortBy === column.path ? '#D27685' : '',
                width: '15%',
              }}
            >
              {column.label}
            </th>
          ) : (
            <th key={column.label + column.path} style={{ width: '30%' }}>
              {column.label}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
