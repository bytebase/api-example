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