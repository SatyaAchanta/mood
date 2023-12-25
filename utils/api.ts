const createURL = (path: string) => {
  return window.location.origin + path
}

export const createJournalEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), { method: 'POST' })
  )

  if (res.ok) {
    const responseData = await res.json()
    return responseData.data
  }
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  console.log(`--- autoSave res is ${res.status}`)
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
