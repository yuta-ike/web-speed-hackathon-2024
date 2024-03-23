export type Book = {
  author: {
    description: string;
    id: string;
    image: {
      alt: string;
      id: string;
    };
    name: string;
  };
  description: string;
  episodes: {
    chapter: number;
    description: string;
    id: string;
    name: string;
  }[];
  id: string;
  image: {
    alt: string;
    id: string;
  };
  name: string;
};
