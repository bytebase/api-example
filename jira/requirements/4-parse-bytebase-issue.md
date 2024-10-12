When there is an issue updated in bytebase project, a webhook will trigger send request to `api/receive-bb-issue-webhook`, the request body is as follows:

```javascript

{
   "level":"SUCCESS",
   "activity_type":"bb.issue.status.update",
   "title":"Issue resolved",
   "description":"",
   "link":"https://valid-just-tadpole.ngrok-free.app/projects/jira-api/issues/create-a-table-t2024-on-test-196",
   "creator_id":101,
   "creator_name":"Admin",
   "created_ts":1728701273,
   "issue":{
      "id":196,
      "name":"Create a table t2024 on test",
      "status":"DONE",
      "type":"bb.issue.database.general",
      "description":"Create a table t2024, first to hr_test"
   },
   "project":{
      "id":113,
      "name":"Jira API"
   }
}

```

currently the bytebaseIssueLink in jirawebhook is '@https://jlj1ndvx-8080.asse.devtunnels.ms/projects/jira-api/issues/237 ' while bytebaseissuelink in bbwebhook is '@https://jlj1ndvx-8080.asse.devtunnels.ms/projects/jira-api/issues/by-jira-1148-235'

when we get a bytebase webhook, we should check if it's a issue status update, if yes, we need to extract the jira issue id, and then update jira issue status, if bytebase status is done, we need to set jira issue status as done; if bytebase status is open, we need to set jira issue as 'In Progress'
