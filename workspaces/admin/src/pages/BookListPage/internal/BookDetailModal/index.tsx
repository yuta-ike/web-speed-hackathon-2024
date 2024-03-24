import { Button, Divider, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { useToggle } from '@uidotdev/usehooks';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import { BookDetailContent } from './BookDetailContent';
import { BookEditContent } from './BookEditContent';
import { EpisodeList } from './EpisodeList';

type Props = {
  book: GetBookResponse;
  isOpen: boolean;

  onClose: () => void;
};

export const BookDetailModal: React.FC<Props> = ({ book, isOpen, onClose }) => {
  const [isEdit, toggleIEdit] = useToggle(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent containerProps={{ p: 8 }} height="100%" m={0} overflowY="auto">
        <ModalCloseButton />
        <Stack height="100%" p={4}>
          {isEdit ? (
            <BookEditContent
              description={book.description}
              id={book.id}
              name={book.name}
              nameRuby={book.nameRuby}
              onEditComplete={() => toggleIEdit()}
            />
          ) : (
            <BookDetailContent book={book} onCloseDialog={onClose} onEdit={() => toggleIEdit()} />
          )}

          <Divider />

          <Flex flexGrow={1} flexShrink={1} overflow="hidden">
            <EpisodeList bookId={book.id} />
          </Flex>

          <Flex justifyContent="flex-end">
            <Button
              as={Link}
              colorScheme="teal"
              mt={4}
              role="button"
              to={`/admin/books/${book.id}/episodes/new`}
              variant="solid"
            >
              エピソードを追加
            </Button>
          </Flex>
        </Stack>
      </ModalContent>
    </Modal>
  );
};
