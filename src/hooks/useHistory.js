import { useState, useEffect } from 'react'
import { saveDocument, getAllDocuments, deleteDocument } from '../utils/storage'

export function useHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const docs = await getAllDocuments()
    setHistory(docs)
    setLoading(false)
  }

  async function save(data) {
    await saveDocument(data)
    await load()
  }

  async function remove(id) {
    await deleteDocument(id)
    setHistory(prev => prev.filter(d => d.id !== id))
  }

  return { history, loading, save, remove }
}
