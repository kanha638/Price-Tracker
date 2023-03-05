## Requirements before setting up this project

```
 node >= 14.*
 postgres >=13.*
```

## Setup

1.  Go to `./server` directory inside the repository
2.  now create a `.env` file for setting up the application environment

    ### Format

    ```
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/auth-flow-db?schema=public"
    NODE_ENV=development
    PORT=8000
    ORIGIN=http://localhost:3000
    ```

    ### Info

    ```
      PORT : "Port on which you want to run your backend app"
      ORIGIN : "this is the url of your frontend"
    ```

3.  After creating .env now migrate the schema into you local computer to setup your DB.

```
{
    Use These Commands to migrate your Database :
     1. npx prisma generate
     2. npx prisma migrate dev
}
```

4.  Now Your Backend is ready to run.

    For Starting the backend App :

    Command : `npm run dev`
