# hitsounds

Fullstack app for users to upload and share hitsounds/killsounds for Team Fortress 2 built using Next JS with App Router.

https://hitsounds.vercel.app

## About

-   S3 for storing uploaded files.
-   PlanetScale for database and Prisma for talking to it.
-   Clerk for user authentication.
-   tRPC for API routes that do not require sending files.

See `.env.example` for required variables.

## API Routes

`/upload`:

Takes FormData with the following fields:

| field name         | field data                            |
| ------------------ | ------------------------------------- |
| userId             | Clerk userID string                   |
| fileCount          | Number if files to upload             |
| file-n             | The nth file                          |
| file-n-name        | The nth file's name                   |
| file-n-type        | The nth file's type                   |
| file-n-description | The nth file's description (optional) |

The route will return an array of strings that are the responses for each of the sounds uploaded. Note that the nth string in the response array will correspond to the nth sound uploaded.

This route is only accessible through the site as it is protected by Clerk.

Note: start counting the nth file from 0 when submitting files to upload.

### TODO

-   Make a generic accordion. There is too much copied code on the admin dashboard.
-   PageSelector needs its own context. Passing like 4 things down through everything is not it.
-   Add history for recently played sounds.
-   Logging.
