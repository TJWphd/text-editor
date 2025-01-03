import { openDB } from "idb";

const initdb = async () =>
  openDB("textedit", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("textedit")) {
        console.log("textedit database already exists");
        return;
      }
      db.createObjectStore("textedit", { keyPath: "id", autoIncrement: true });
      console.log("textedit database created");
    },
  });

//method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const todosDb = await openDB("textedit", 1);
  const tx = todosDb.transaction("textedit", "readwrite");
  const store = tx.objectStore("textedit");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database", result.value);
};

//  method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  const todosDb = await openDB("textedit", 1);
  const tx = todosDb.transaction("textedit", "readonly");
  const store = tx.objectStore("textedit");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
