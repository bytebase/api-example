# Bytebase API Experiment

This is an experimental project for [Bytebase](https://www.bytebase.com/) API using Next.js.

![Bytebase API Experiment with Next.js](public/add-issue.gif)

## Getting Started

### 1/2 Run a Bytebase console first

1. Check out [Self-host Bytebase via docker](https://www.bytebase.com/docs/get-started/self-host/#docker) for more information.
2. Register an admin account.

### 2/2 Run this app

1. Clone this repository.
2. Rename `env-template.local` to `.env.local`, update the values of your registered admin account.
3. Run the following commands:

```bash
npm i
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dig Deeper

### Fetch data
_You may find the following API used in `src/app/page.tsx`:_

- List all projects
  `/v1/projects`

- List all databases
  `/v1/instances/-/databases`

### Create an issue
_You may find the following API used in `src/app/components/add-issue-form.tsx` and `src/app/api/xxxx/route.ts`:_

In order to create an issue, you need to follow these steps:

1. Create a sheet
2. Create a plan
3. Create an issue
4. Create a rollout
