import { EpisodeListItem, EpisodeListItemSkelton } from '../../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../../features/episode/hooks/useEpisodeList';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

type EpisodeListSectionProps = {
  bookId: string;
};

export const EpisodeListSection = ({ bookId }: EpisodeListSectionProps) => {
  const { data: episodeList } = useEpisodeList({ query: { bookId } });

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {episodeList.map((episode) => (
        <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
      ))}
      {episodeList.length === 0 && (
        <>
          <Spacer height={Space * 2} />
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            この作品はまだエピソードがありません
          </Text>
        </>
      )}
    </Flex>
  );
};

export const EpisodeListSectionSkelton = () => (
  <Flex align="center" as="ul" direction="column" justify="center">
    <EpisodeListItemSkelton index={1} />
    <EpisodeListItemSkelton index={2} />
    <EpisodeListItemSkelton index={3} />
    <EpisodeListItemSkelton index={4} />
    <EpisodeListItemSkelton index={5} />
    <EpisodeListItemSkelton index={6} />
    <EpisodeListItemSkelton index={7} />
    <EpisodeListItemSkelton index={8} />
    <EpisodeListItemSkelton index={9} />
    <EpisodeListItemSkelton index={10} />
    <EpisodeListItemSkelton index={11} />
    <EpisodeListItemSkelton index={12} />
  </Flex>
);
