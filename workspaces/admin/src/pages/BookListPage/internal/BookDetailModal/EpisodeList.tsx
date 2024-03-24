import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { useEpisodeList } from '../../../../features/episodes/hooks/useEpisodeList';

type Props = {
  bookId: string;
};

export const EpisodeList = ({ bookId }: Props) => {
  const { data: episodeList, isLoading } = useEpisodeList({ bookId: bookId });

  if (isLoading || episodeList == null) {
    return (
      <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
        <Table aria-label="エピソード一覧" variant="striped">
          <Thead backgroundColor="white" position="sticky" top={0} zIndex={1}>
            <Tr>
              <Th w={120}></Th>
              <Th>エピソード名</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array(14)
              .fill(null)
              ?.map((_, i) => (
                <Tr key={i}>
                  <Td textAlign="center" verticalAlign="middle">
                    <Button as={Link} colorScheme="teal" role="button" to={''} variant="solid">
                      編集
                    </Button>
                  </Td>
                  <Td verticalAlign="middle">
                    <Text fontWeight="bold">
                      <div
                        style={{
                          background: '#cfd8e3',
                          height: '1lh',
                          width: '200px',
                        }}
                      />
                    </Text>
                    <Text color="gray.400" fontSize="small">
                      <div
                        style={{
                          background: '#cfd8e3',
                          height: '1lh',
                          width: '300px',
                        }}
                      />
                    </Text>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  if (episodeList.length === 0) {
    return (
      <Text align="center" flexGrow={1} flexShrink={1} pt={2}>
        エピソードがありません
      </Text>
    );
  }

  return (
    <>
      <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
        <Table aria-label="エピソード一覧" variant="striped">
          <Thead backgroundColor="white" position="sticky" top={0} zIndex={1}>
            <Tr>
              <Th w={120}></Th>
              <Th>エピソード名</Th>
            </Tr>
          </Thead>
          <Tbody>
            {episodeList?.map((episode) => (
              <Tr key={episode.id}>
                <Td textAlign="center" verticalAlign="middle">
                  <Button
                    as={Link}
                    colorScheme="teal"
                    role="button"
                    to={`/admin/books/${bookId}/episodes/${episode.id}`}
                    variant="solid"
                  >
                    編集
                  </Button>
                </Td>
                <Td verticalAlign="middle">
                  <Text fontWeight="bold">{episode.name}</Text>
                  <Text color="gray.400" fontSize="small">
                    {episode.id}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
