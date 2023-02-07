import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('SAVE to the database');
  const jDb = await openDB('jate', 1);
  const trans = jDb.transaction('jate', 'readwrite');
  const jStore = trans.objectStore('jate');
  const jReq = jStore.put({ id: 1, value: content });
  const jRes = await jReq;
  console.log(' saved to the database', jRes.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jDb = await openDB('jate', 1);
  const trans = jDb.transaction('jate', 'readonly');
  const jStore = trans.objectStore('jate');
  const jReq = jStore.get(1);
  const jRes = await jReq;
  jRes
    ? console.log('data retrieved from the database', result.value)
    : console.log('data not found in the database');
  return jRes?.value;
}

initdb();
