import { getUserByClerkId } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      ...analysis,
    },
  })

  revalidatePath(`/journal/${updatedEntry.id}`)

  return NextResponse.json({ data: { ...updatedEntry, analysis: analysis } })
}
