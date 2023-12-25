import { prisma } from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const logginedInUser = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: logginedInUser!.id as string,
    },
  })

  if (!match) {
    const user = await prisma.user.create({
      data: {
        clerkId: logginedInUser!.id,
        email: logginedInUser!.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()
  return <h1>New User Page</h1>
}

export default NewUserPage
