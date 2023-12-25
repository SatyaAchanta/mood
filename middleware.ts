import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    // We do not want to protect this route because this is homepage
    publicRoutes: ['/']
});


export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };