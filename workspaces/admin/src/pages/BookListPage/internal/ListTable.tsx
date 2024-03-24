import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { lazy, memo, useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { useBookList } from '../../../features/books/hooks/useBookList';
import { isContains } from '../../../lib/filter/isContains';

import { ListItem } from './ListItem';

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
export type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

const BookDetailModal = lazy(() => import('./BookDetailModal').then((module) => ({ default: module.BookDetailModal })));

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

  const [detailModalId, setDetailModalId] = useState<string | null>(null);

  const detailBook = useMemo(() => {
    return bookList.find((book) => book.id === detailModalId);
  }, [bookList, detailModalId]);

  return (
    <>
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
        itemContent={(_, book) => <ListItem key={book.id} book={book} onOpenDetail={() => setDetailModalId(book.id)} />}
      />
      {detailBook != null && <BookDetailModal isOpen book={detailBook} onClose={() => setDetailModalId(null)} />}
    </>
  );
});
