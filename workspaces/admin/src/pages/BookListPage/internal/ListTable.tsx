import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { useBookList } from '../../../features/books/hooks/useBookList';
import { isContains } from '../../../lib/filter/isContains';

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
export type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

import { ListItem } from './ListItem';
type ListTableProps = {
  kind: BookSearchKind;
  query: string;
};

export const ListTable = memo(function ListTableInner({ kind, query }: ListTableProps) {
  const { data: bookList = [] } = useBookList();

  const filteredBookList = useMemo(() => {
    if (query === '') {
      return bookList;
    }

    switch (kind) {
      case BookSearchKind.BookId: {
        return bookList.filter((book) => book.id === query);
      }
      case BookSearchKind.BookName: {
        return bookList.filter((book) => {
          return isContains({ query: query, target: book.name }) || isContains({ query: query, target: book.nameRuby });
        });
      }
      case BookSearchKind.AuthorId: {
        return bookList.filter((book) => book.author.id === query);
      }
      case BookSearchKind.AuthorName: {
        return bookList.filter((book) => {
          return isContains({ query: query, target: book.author.name });
        });
      }
      default: {
        kind satisfies never;
        return bookList;
      }
    }
  }, [kind, query, bookList]);

  return (
    <TableVirtuoso
      components={{
        Table: (props) => <Table {...props} variant="striped" />,
        TableBody: Tbody,
        TableHead: Thead,
      }}
      data={filteredBookList}
      fixedHeaderContent={() => (
        <Tr background="white">
          <Th w={120}></Th>
          <Th>作品名</Th>
          <Th>作者名</Th>
        </Tr>
      )}
      itemContent={(_, book) => <ListItem key={book.id} book={book} />}
    />
  );
});
