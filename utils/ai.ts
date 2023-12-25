import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'

const promptInstruction = `'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',`
const promptInstruction_negate = `'Rewrite the journal entry in completely opposite way. \n{format_instructions}\n{entry}',`

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('subject of journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative (does the journal entry contain negative emotions ?.'
      ),
    color: z
      .string()
      .describe(
        ' A hexadecimal color code representing mood of the entry. For example #0101fe for blue representing happiness.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: promptInstruction,
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (prompt: string) => {
  const input = await getPrompt(prompt)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
}

// export const qa = async (question, entries) => {
//   const docs = entries.map((entry) => {
//     return new Document({
//       pageContent: entry.content,
//       metadata: {
//         id: entry.id,
//         created: entry.createdAt,
//       },
//     })
//   })

//   const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
//   const chain = loadQARefineChain(model)
//   const embeddings =
// }
