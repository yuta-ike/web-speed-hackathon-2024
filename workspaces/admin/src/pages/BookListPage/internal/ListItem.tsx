import { Button, Td, Text, Tr } from '@chakra-ui/react';
import { lazy, memo, useState, useTransition } from 'react';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

const BookDetailModal = lazy(() => import('./BookDetailModal').then((module) => ({ default: module.BookDetailModal })));

type ListItemProps = {
  book: GetBookResponse;
};

export const ListItem = memo(function ListItemInner({ book }: ListItemProps) {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  return (
    <>
      <Tr>
        <Td textAlign="center" verticalAlign="middle">
          <Button colorScheme="teal" onClick={() => startTransition(() => setOpen(true))} variant="solid">
            詳細
          </Button>
        </Td>
        <Td verticalAlign="middle">
          <Text fontWeight="bold">{book.name}</Text>
          <Text color="gray.400" fontSize="small">
            {book.id}
          </Text>
        </Td>
        <Td verticalAlign="middle">
          <Text fontWeight="bold">{book.author.name}</Text>
          <Text color="gray.400" fontSize="small">
            {book.author.id}
          </Text>
        </Td>
      </Tr>
      {open && <BookDetailModal isOpen book={book} onClose={() => setOpen(false)} />}
    </>
  );
});
