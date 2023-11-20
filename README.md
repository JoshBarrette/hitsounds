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
