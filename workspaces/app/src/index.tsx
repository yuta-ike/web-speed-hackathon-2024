import './setup';
import { Router } from './routes';

import './lib/css/global.css';

export const ClientApp: React.FC = () => {
  return (
    <>
      <Router />
    </>
  );
};
