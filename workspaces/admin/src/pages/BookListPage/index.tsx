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
  TableContainer,
  Text,
} from '@chakra-ui/react';
import { lazy, Suspense, useDeferredValue, useState, useTransition } from 'react';

import { ListTable } from './internal/ListTable';

const CreateBookModal = lazy(() =>
  import('./internal/CreateBookModal').then((module) => ({ default: module.CreateBookModal })),
);

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
export type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

export const BookListPage: React.FC = () => {
  const [kind, setKind] = useState<BookSearchKind>(BookSearchKind.BookId);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

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
          aria-labelledby="bookList"
          as="section"
          display="flex"
          flexBasis={0}
          flexDirection="column"
          flexGrow={1}
          flexShrink={1}
          overflow="hidden"
        >
          <Flex align="center" justify="space-between">
            <Text as="h2" fontSize="xl" fontWeight="bold" id="bookList">
              作品一覧
            </Text>
            <Button colorScheme="teal" onClick={() => startTransition(() => setShowCreateModal(true))} variant="solid">
              作品を追加
            </Button>
          </Flex>
          <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
            <Suspense fallback={null}>
              <ListTable kind={kind} query={deferredQuery} />
            </Suspense>
          </TableContainer>
        </StackItem>
      </Stack>

      {showCreateModal ? <CreateBookModal isOpen onClose={() => setShowCreateModal(false)} /> : null}
    </>
  );
};
