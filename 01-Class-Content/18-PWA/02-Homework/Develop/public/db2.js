let db;
// create a new db request for a "budget" database.
​
const request = window.indexedDB.open("budget", 1);
​
request.onupgradeneeded = function(event) {
  // create object store called "pending" and set autoIncrement to true
​
  const db = event.target.result;
  const store = db.createObjectStore("pending", {keyPath: "transactionID"});
  store.autoIncrement;
​
};
​
request.onsuccess = function(event) {
  db = event.target.result;
​
  if (navigator.onLine) {
    checkDatabase();
  }
};
​
request.onerror = function(event) {
  // log error here
};
​
function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  const db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  // access your pending object store
  const objStore = transaction.objectStore("pending");
  // add record to your store with add method.
  objStore.add(record)
}
​
function checkDatabase() {
  // open a transaction on your pending db
  const db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const objStore = transaction.objectStore("pending");
  // access your pending object store
  const getCursorRequest = objStore.openCursor();
  // get all records from store and set to a variable
​
  let transArr = []
​
  getCursorRequest.onsuccess = e => {
    const cursor = e.target.result;
    transArr.push(cursor.value);
    cursor.continue();
  };
​
 getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your pending db
        const db = request.result;
        const transaction = db.transaction(["pending"], "readwrite");
        const objStore = transaction.objectStore("pending");
          // access your pending object store
          // clear all items in your store
​
          objStore.clear();
          
      });
    }
  };
}
​
// listen for app coming back online
window.addEventListener("online", checkDatabase);
