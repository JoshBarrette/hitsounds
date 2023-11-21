# ...hitsounds

### TODO

-   Add proper resolves and rejects to s3put.
-   Implement drag and drop to Uploader component.
-   Add inputs to SoundToUpload component for changing sound name, type, and description.
-   Add context to Uploader components for sharing access to the files array.

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
