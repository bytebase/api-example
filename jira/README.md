# Bytebase Jira Integration Example

This is a sample app demonstrating how to integrate [Bytebase](https://github.com/bytebase/bytebase) with Jira for automated database change management.

Corresponding [tutorial 🔗](https://www.bytebase.com/docs/tutorials/database-change-management-with-jira-automated/)

![Jira Integration](./docs/jira-bb-workflow.gif)

## Prerequisites

- Node.js >= 18
- A running Bytebase instance
- A Jira account with appropriate permissions
- Bytebase service account with necessary permissions

## Getting Started

### Step 1 - Set up Bytebase and Jira

1. Follow the [Self-host Bytebase via docker](https://www.bytebase.com/docs/get-started/self-host/#docker) guide to set up Bytebase.
2. Create a [Bytebase service account](https://www.bytebase.com/docs/how-to/spanner/how-to-create-a-service-account-for-bytebase/) with the necessary permissions.
3. Set up a Jira project for database change management.

### Step 2 - Configure and Run the App

1. Clone this repository.
2. Copy `env-template.local` to `.env.local`.

   ```bash
   cp env-template.local .env.local
   ```

3. Update the `.env.local` file with your Bytebase and Jira details:

   ```
   NEXT_PUBLIC_BB_HOST=your_bytebase_host
   NEXT_PUBLIC_BB_SERVICE_ACCOUNT=your_service_account
   NEXT_PUBLIC_BB_SERVICE_KEY=your_service_key
   JIRA_HOST=your_jira_host
   JIRA_EMAIL=your_jira_email
   JIRA_API_TOKEN=your_jira_api_token
   ```

4. Install dependencies and run the development server:

   ```bash
   pnpm i && pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the running app.

## API Usage

This app demonstrates the integration between Bytebase and Jira, including:

- Creating Jira issues for database changes
- Creating Bytebase issues based on Jira issue status
- Syncing status between Bytebase and Jira

For more details on the Bytebase API, refer to the [official documentation](https://api.bytebase.com/).

For Jira API usage, consult the [Jira Cloud REST API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/).