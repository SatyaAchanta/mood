import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content:
        'I have been receovring from injury and doing great as per fitness level. However, I am unable to workout like how I used to workout before',
    },
  })

  console.log(`--- before analyzing content`)
  const analysis = await analyze(entry.content)
  console.log(analysis)

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })

  // need this below line for the page to be updated
  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
