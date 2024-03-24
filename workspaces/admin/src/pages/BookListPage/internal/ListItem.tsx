import { Button, Td, Text } from '@chakra-ui/react';
import { memo, useTransition } from 'react';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

type ListItemProps = {
  book: GetBookResponse;
  onOpenDetail: () => void;
};

export const ListItem = memo(function ListItemInner({ book, onOpenDetail }: ListItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  return (
    <>
      <Td textAlign="center" verticalAlign="middle">
        <Button colorScheme="teal" onClick={() => startTransition(() => onOpenDetail())} variant="solid">
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
    </>
  );
});
