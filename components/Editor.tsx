'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

interface iAnalysis {
  name: string
  value: string
}

const Editor = ({ entry }) => {
  const [entryValue, setEntryValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis
  const analysisData: iAnalysis[] = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Color', value: color },
  ]

  useAutosave({
    data: entryValue,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsLoading(true)
      const updatedEntry = await updateEntry(entry.id, _text)
      setAnalysis(updatedEntry.analysis)
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading...</div>}
        <textarea
          className="w-full h-full p-x text-xl outline-none"
          value={entryValue}
          onChange={(e) => setEntryValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{
            backgroundColor: analysis.color,
          }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
