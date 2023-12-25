
[Link to frontend masters course](https://frontendmasters.com/courses/fullstack-app-next-v3/)

[Link to Github Repo for this course](https://github.com/Hendrixer/fullstack-ai-nextjs)

[Link to Vector Embeddings from openai blog](https://openai.com/blog/introducing-text-and-code-embeddings)



## Technologies and Frameworks

- NextJs
- use node >= 18.17.0
- [Clerk](https://clerk.com/) - for Authentication
	- [Clerk Homepage](npm install @clerk/nextjs)
- Tailwind CSS intellisense plugin from VSCode


## Highlights

-  What are we doing ?
	- Journal App called "Mood", and using AI , it will try to determine what the mood of journal entry is.
	- App gives sentimental analysis and sum up your mood on that day using LLM
	- What my day like yesterday , week or month
- `middleware.ts`
	- Sits in the root of the app
	- This is from clerk's authentication procedure.
	- this file determines which routes can be left publicly and for open access and which routes can be secured

###  `Planet Scale`
	- serverless SQL database
	- works in serverless environments
	- We will `prisma` as ORM for `planet scale` DB
	- `pscale auth login` ~ to login into pscale DB from local
	- `pscale branch create <db_name> <branch_name>`
	- `pscale connect <db_name> <branch_name> --port 3309`
		- We need to connect to branch locally to use the DB by local app development
		- We need to stop and start this whenever connection broken to our app
### `prisma`

ORM that helps us to connect to our DB. Prisma is not a DB, instead its just a tool that lets us use functions to connect to DB we want

- `npm install @prisma/client`
- `npm install prisma --save-dev`
- `npx prisma init`

- After running above commands, we should be seeing  `prisma` :luc_folder: in our app.
- Never run migrations form prisma if you using `planet scale` (PS). PS does migrations by itself


	### Steps:
	
	- Create schema/table in `schema.prisma`
	- Push that schema to `planet scale` using `npx prisma push db`
		- this will push all the schema changes to the DB
	- Refer [prsima documentation with NextJs](https://www.prisma.io/docs/nextjs)

- Now we need to sync `clerk` user with our user in `planet scale`
- `npx prisma studio` ~ to verify whether your db changes are in prisma ORM locally
	- We still need to push the changes to `planet scale` DB




## Important points:

- any HTML events in NextJS app should be `client side` component.
	- we cannot make those events as part of server side components
	- interactivity required JS
- We **cannot** pass function as props between server components and client components because functions cannot be serialized over the internet
-  `react-autosave`
	- Useful package to auto save.
- **AI: LLM**:
	- Basic level language level model
	- GPT: Generative pre-trained transformer
	- LangChain: An API for LLMs
	- `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` - Open AI API
		- add this to your `.env.local` file
		- make sure `.env` files are added to `.gitignore`
- **ZOD**:
	- Why we use it ?
	- Learn more about ZOD later, learn about its application and usefulness in real world



## Vector Database

- Vector
	- Array of numbers between 0 and 1
	- Collection of data stores in mathematical representations

