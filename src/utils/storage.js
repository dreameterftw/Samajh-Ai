import { openDB } from 'idb'

const DB_NAME = 'samajh-db'
const DB_VERSION = 1
const STORE = 'documents'

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore(STORE, {
        keyPath: 'id',
        autoIncrement: true,
      })
      store.createIndex('date', 'date')
    },
  })
}

export async function saveDocument({ image, ocrText, result, docType, redFlags, language }) {
  const db = await getDB()
  return db.add(STORE, {
    image,
    ocrText,
    result,
    docType,
    redFlags,
    language,
    date: new Date().toISOString(),
  })
}

export async function getAllDocuments() {
  const db = await getDB()
  const all = await db.getAllFromIndex(STORE, 'date')
  return all.reverse()
}

export async function deleteDocument(id) {
  const db = await getDB()
  return db.delete(STORE, id)
}

export async function clearAll() {
  const db = await getDB()
  return db.clear(STORE)
}
