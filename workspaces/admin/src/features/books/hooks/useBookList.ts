import { useQuery } from '@tanstack/react-query';

import { bookApiClient } from '../apiClient/bookApiClient';

export const useBookList = (
  query: {
    authorId?: string | undefined;
    authorName?: string | undefined;
    limit?: number | undefined;
    name?: string | undefined;
    offset?: number | undefined;
  } = {},
) => {
  return useQuery({
    queryFn: async ({ queryKey: [, options] }) => {
      return bookApiClient.fetchList(options);
    },
    queryKey: bookApiClient.fetchList$$key({ query }),
  });
};
