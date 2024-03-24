import { Box, Button, Flex, Image, Stack, StackItem, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import { useBookList } from '../../../../features/books/hooks/useBookList';
import { useDeleteBook } from '../../../../features/books/hooks/useDeleteBook';

type BookDetailContentProps = {
  book: GetBookResponse;
  onCloseDialog: () => void;
  onEdit: () => void;
};

export const BookDetailContent: React.FC<BookDetailContentProps> = ({ book, onCloseDialog, onEdit }) => {
  const { refetch: refetchBookList } = useBookList();
  const { mutate: deleteBook } = useDeleteBook();

  console.log('BookDetailContent', book);
  const handleEditClick = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDeleteClick = useCallback(() => {
    deleteBook(
      {
        bookId: book.id,
      },
      {
        onSuccess: () => {
          refetchBookList();
          onCloseDialog();
        },
      },
    );
  }, [book, deleteBook, onCloseDialog, refetchBookList]);

  return (
    <Box aria-label="作品詳細" as="section">
      <Flex align="center" pb={2}>
        <Image
          alt={book.name}
          aspectRatio="3 / 4"
          height={256}
          objectFit="cover"
          src={`/assets/converted/${book.image.id}_rect_lg.webp`}
          width={192}
        />
        <Stack p={4} spacing={2}>
          <StackItem>
            <Text color="gray.600" fontSize="sm">
              {book.nameRuby}
            </Text>
          </StackItem>
          <StackItem>
            <Text fontWeight="bold">{book.name}</Text>
          </StackItem>
          <StackItem>
            <Text>{book.description}</Text>
          </StackItem>
        </Stack>
      </Flex>
      <Flex gap={4} justify="flex-end" pb={4}>
        <Button colorScheme="teal" onClick={handleEditClick} variant="solid">
          編集
        </Button>
        <Button onClick={handleDeleteClick}>削除</Button>
      </Flex>
    </Box>
  );
};
