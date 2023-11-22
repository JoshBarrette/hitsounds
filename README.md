# ...hitsounds

### TODO

-   Add proper resolves and rejects to s3put.
-   Add inputs to SoundToUpload component for changing sound name, type, and description.
-   Implement searching and filtering sounds.
-   Have the homepage display the most recently uploaded hitsounds.
-   Let users see their uploaded hitsounds and edit/delete them.
-   Allow admins to delete sounds and ban users.

### Examples of random things

find all sounds where the userID is "y0"

```ts
let sounds = await db.user.findUnique({
    where: {
        userID: "y0",
    },
    include: {
        uploads: true,
    },
});
```
