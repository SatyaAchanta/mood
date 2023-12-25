interface iAnalysis {
  name: string
  value: string
}

/**
 * Unused component, I was trying my ownthing to
 * refactor Analysis piece of UI
 * but I liked Scott's way of doing it, so ended
 * up moving everything to Editor Component
 * @param param0 analysis data
 * @returns renders sidebar UI for analysis data
 */
export const Analysis = ({ analysisData }: { analysisData: iAnalysis[] }) => {
  return (
    <div className="border-l border-black/10">
      <div
        className="px-6 py-10"
        style={{
          backgroundColor: analysisData.filter(
            (dataItem) => dataItem.name.toLowerCase() === 'color'
          )[0].value,
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
  )
}
