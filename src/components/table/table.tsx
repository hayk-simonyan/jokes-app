import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import Pagination from '../pagination';
import TableHeader from './table-header';
import TableBody from './table-body';
import { useFetchData } from '../../hooks/useFetchData';
import { Joke } from '../../utils/types';
import { formatDate, getViewsColor, formatEmail } from '../../utils/functions';
import { SortColumn, SortOrder, TablePaths } from './types';
import FilterGroup, { Filter } from '../filterGroup';

const tableColumns = [
  {
    path: TablePaths.Title,
    label: TablePaths.Title,
    content: (joke: Joke) => (
      <td key={joke.id + joke.Title + Math.random()}>
        <Link to={{ pathname: `/jokes/${joke.id}` }} state={joke}>
          {joke.Title}
        </Link>
      </td>
    ),
  },
  {
    path: TablePaths.Author,
    label: TablePaths.Author,
    content: (joke: Joke) => (
      <td key={joke.id + joke.Author + Math.random()}>
        {formatEmail(joke.Author)}
      </td>
    ),
  },
  {
    path: TablePaths.Views,
    label: TablePaths.Views,
    content: (joke: Joke) => (
      <td key={joke.id + joke.CreatedAt + Math.random()}>
        <span style={{ color: getViewsColor(joke.Views) }}>{joke.Views}</span>
      </td>
    ),
  },
  {
    path: TablePaths.CreatedAt,
    label: TablePaths.CreatedAt,
    content: (joke: Joke) => (
      <td key={joke.id + joke.CreatedAt + Math.random()}>
        {formatDate(joke.CreatedAt)}
      </td>
    ),
  },
];

const viewsFilter: Filter[] = [
  { id: 'all', name: 'All', range: [0, 1000], query: '', default: true },
  {
    id: '1',
    name: 'Views 0-50',
    range: [0, 50],
    query: 'views_gte=10&views_lte=50',
    default: false,
  },
  {
    id: '2',
    name: 'Views 50-100',
    range: [50, 100],
    query: 'views_gte=50&views_lte=100',
    default: false,
  },
  {
    id: '3',
    name: 'Views 100-150',
    range: [100, 150],
    query: 'views_gte=100&views_lte=150',
    default: false,
  },
];

const DEFAULT_SORT_COLUMN = { path: '', order: SortOrder.ASC };
const DEFAULT_FILTER = viewsFilter[0];

function Table() {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>(DEFAULT_SORT_COLUMN);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(DEFAULT_FILTER);
  const [query, setQuery] = useState(
    `${process.env.REACT_APP_JOKES_API}/?_page=${currentPage}&_limit=${pageSize}`
  );

  useEffect(() => {
    setQuery(
      `${process.env.REACT_APP_JOKES_API}/?_page=${currentPage}&_limit=${pageSize}&_sort=${sortColumn.path}&_order=${sortColumn.order}`
    );
  }, [currentPage, pageSize, sortColumn.path, sortColumn.order]);

  const { data, error, loading } = useFetchData<Joke[]>(query);

  const jokes = useMemo(() => data, [data]);
  const columns = useMemo(() => tableColumns, []);

  const handleChange = (increment: number) => {
    setCurrentPage((prevPage) => prevPage + Number(increment));
  };
  const handleSort = (sortColumn: SortColumn) => {
    setSortColumn(sortColumn);
  };
  const handleFilterSelect = (item: Filter) => {
    setSelectedFilter(item);
  };

  if (error) return <div>Something went wrong ...</div>;

  if (!loading && !jokes?.length) return <div>No data found</div>;

  const filteredJokes = jokes?.filter(
    (joke) =>
      joke.Views <= selectedFilter.range[1] &&
      joke.Views >= selectedFilter.range[0]
  );

  return (
    <>
      {filteredJokes?.length && (
        <div className={classes.container}>
          <table className={classes.table}>
            <TableHeader
              columns={columns}
              onSort={handleSort}
              sortColumn={sortColumn}
            />
            {loading ? (
              <div className={classes.loading}>Loading ...</div>
            ) : (
              <TableBody jokes={filteredJokes} columns={columns} />
            )}
          </table>
          {!loading && (
            <>
              <Pagination
                itemsCount={filteredJokes.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handleChange}
                onPageSizeChange={setPageSize}
              />
              <FilterGroup
                items={viewsFilter}
                selectedItem={selectedFilter}
                onItemSelect={handleFilterSelect}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

const useStyles = createUseStyles({
  container: {
    overflowX: 'auto',
    '@media (max-width: 600px)': {
      overflowX: 'scroll',
    },
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    border: '1px solid black',
    '& th, & td': {
      borderRight: '1px solid black',
      padding: '8px',
      textAlign: 'left',
    },
    '& td:last-child, th:last-child': {
      borderRight: '0px',
    },
    '& th': {
      backgroundColor: '#37306B',
      color: '#fff',
      fontWeight: 'bold !important',
    },
    '& tbody tr:nth-child(2n -1)': {
      backgroundColor: '#9E4784',
    },
    '& tbody tr:nth-child(2n)': {
      backgroundColor: '#66347F',
    },
    '& tbody tr:hover': {
      backgroundColor: '#D27685',
    },
    '& a': {
      color: '#fff',
    },
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
  },
});

export default Table;
