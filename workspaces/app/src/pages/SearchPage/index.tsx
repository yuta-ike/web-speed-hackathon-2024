import { useCallback, useDeferredValue, useState } from 'react';

import { useBookList } from '../../features/book/hooks/useBookList';
import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

export const SearchPage: React.FC = () => {
  const { data: books, isLoading } = useBookList({ query: {} });

  const [keyword, setKeyword] = useState('');

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  const deferredKeyword = useDeferredValue(keyword);

  return (
    <Box px={Space * 2}>
      <Input disabled={isLoading} onChange={onChangedInput} />
      <Box aria-labelledby="searchResults" as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id="searchResults" typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {books != null && deferredKeyword !== '' && <SearchResult books={books} keyword={deferredKeyword} />}
      </Box>
    </Box>
  );
};
