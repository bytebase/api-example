from the lastJiraWebhook structure

{
    issueKey: string;
    issueType: string;
    projectKey: string;
    summary: string;
    description: string;
    sqlStatement: string;
    database: string;
    status: string;
    bytebaseIssueLink: string;
} 

we want to create a bytebase issue with the help of `utils/issueCreation.tsx`, `api/utils.ts`

1. try to match the jira `projectKey` with bytebase project key, if no match, we need to return error msg

    here is the sample to fetch all project from bytebase
        ```javascript
        import { generateToken, fetchData } from '@/app/api/utils';
        const token = await generateToken();
        const allProjectData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, token);
        ```
1. try to match the jira `database` with the databases belonging to that bytebase project, if no match, we need to return error msg

    here is the sample to fetch all databases belonging to a bytebase project
        ```javascript
        const response = await fetch(`/api/bb-databases/${encodeURIComponent(projectId)}`);
        ```

1. Jira issue match with Bytebase issue
    - projectKey -> bytebase project key
    - database -> bytebase database name
    - summary -> title
    - description -> description
    - sqlStatement -> SQL
    - bytebaseIssueLink -> Bytebase issue link