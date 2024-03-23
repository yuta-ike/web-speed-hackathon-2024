import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
} & React.ComponentProps<typeof Link>;

const MyLink = ({ children, to, ...rest }: Props) => {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export { MyLink as Link };
