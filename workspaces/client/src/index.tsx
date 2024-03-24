// import './side-effects';

import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  $(document).ready(async () => {
    if (window.location.pathname.startsWith('/admin')) {
      const AdminApp = await import('@wsh-2024/admin/src/index').then((module) => module.AdminApp);
      ReactDOM.createRoot(document.getElementById('root')!).render(<AdminApp />);
    } else {
      const ClientApp = await import('@wsh-2024/app/src/index').then((module) => module.ClientApp);
      // // NOTE: Viteで起動するためにSSRを止める
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>,
      );
      // ReactDOM.hydrateRoot(
      //   $('#root').get(0)!,
      //   <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
      //     <BrowserRouter>
      //       <ClientApp />
      //     </BrowserRouter>
      //   </SWRConfig>,
      // );
    }
  });
};

main().catch(console.error);
