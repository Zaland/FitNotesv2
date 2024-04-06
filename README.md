## Getting Started

Create a `.env` file. Copy and paste the contents of `.env.template` into `.env` file and fill in the required information.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run postgres database

Make sure you have `docker` and `docker-compose` and are in the root directory.

Run `npm run db-up` or `docker-compose up -d` to initiate the database.

Run `npm run db-migrate` to run migrations on the database.

Run `npm run db-down` or `docker-compose down` to delete the database.
