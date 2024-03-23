export async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker
      .register('/serviceworker.global.js', {
        scope: '/',
      })
      .then((registration) => {
        console.log('成功');
        return registration;
      });

    // Wait until the service worker becomes active
    await new Promise<void>((resolve, reject) => {
      const activeServiceWorker = registration.active!;
      if (activeServiceWorker == null) {
        reject();
      }
      if (activeServiceWorker.state === 'activated') {
        resolve();
      }
      activeServiceWorker.addEventListener('statechange', (ev) => {
        if (ev.target instanceof ServiceWorker && ev.target.state === 'activated') {
          resolve();
        }
      });
    });
    console.log('登録完了');
  } catch (e) {
    console.log(e);
  }
}
