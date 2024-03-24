import {
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  StackItem,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { lazy, useDeferredValue, useId, useMemo, useState, useTransition } from 'react';

import { useBookList } from '../../features/books/hooks/useBookList';
import { isContains } from '../../lib/filter/isContains';

import { ListItem } from './internal/ListItem';

const CreateBookModal = lazy(() =>
  import('./internal/CreateBookModal').then((module) => ({ default: module.CreateBookModal })),
);

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

export const BookListPage: React.FC = () => {
  const bookListA11yId = useId();

  const [kind, setKind] = useState<BookSearchKind>(BookSearchKind.BookId);
  const [_query, setQuery] = useState('');
  const query = useDeferredValue(_query);

  const { data: bookList = [] } = useBookList();
  // query.length === 0
  //   ? {}
  //   : kind === BookSearchKind.BookId
  //     ? { id: query }
  //     : kind === BookSearchKind.BookName
  //       ? { name: query }
  //       : kind === BookSearchKind.AuthorId
  //         ? { authorId: query }
  //         : kind === BookSearchKind.AuthorName
  //           ? { authorName: query }
  //           : {},

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <Stack height="100%" p={4} spacing={6}>
        <StackItem aria-label="検索セクション" as="section">
          <RadioGroup name="kind" value={kind}>
            <Stack direction="row" spacing={4}>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onChange={(e) => {
                  if (e.target.checked) {
                    setKind(BookSearchKind.BookId);
                  }
                }}
                value={BookSearchKind.BookId}
              >
                作品 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onChange={(e) => {
                  if (e.target.checked) {
                    setKind(BookSearchKind.BookName);
                  }
                }}
                value={BookSearchKind.BookName}
              >
                作品名
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onChange={(e) => {
                  if (e.target.checked) {
                    setKind(BookSearchKind.AuthorId);
                  }
                }}
                value={BookSearchKind.AuthorId}
              >
                作者 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onChange={(e) => {
                  if (e.target.checked) {
                    setKind(BookSearchKind.AuthorName);
                  }
                }}
                value={BookSearchKind.AuthorName}
              >
                作者名
              </Radio>
            </Stack>
          </RadioGroup>

          <Spacer height={2} />

          <Flex gap={2}>
            <Input
              borderColor="gray.400"
              name="query"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="条件を入力"
              value={query}
            />
          </Flex>
        </StackItem>

        <Divider />

        <StackItem
          aria-labelledby={bookListA11yId}
          as="section"
          display="flex"
          flexBasis={0}
          flexDirection="column"
          flexGrow={1}
          flexShrink={1}
          overflow="hidden"
        >
          <Flex align="center" justify="space-between">
            <Text as="h2" fontSize="xl" fontWeight="bold" id={bookListA11yId}>
              作品一覧
            </Text>
            <Button colorScheme="teal" onClick={() => startTransition(() => setShowCreateModal(true))} variant="solid">
              作品を追加
            </Button>
          </Flex>
          <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
            <Table variant="striped">
              <Thead backgroundColor="white" position="sticky" top={0} zIndex={1}>
                <Tr>
                  <Th w={120}></Th>
                  <Th>作品名</Th>
                  <Th>作者名</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredBookList.map((book) => (
                  <ListItem key={book.id} book={book} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </StackItem>
      </Stack>

      {showCreateModal ? <CreateBookModal isOpen onClose={() => setShowCreateModal(false)} /> : null}
    </>
  );
};
