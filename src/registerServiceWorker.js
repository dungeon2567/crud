/* eslint-disable no-console */

navigator.serviceWorker.register("/service-worker.js").then(registration => {
  registration.onupdatefound = () => {};
}).catch(err => {
  console.error(err);
})
