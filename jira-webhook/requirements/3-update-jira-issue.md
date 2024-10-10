## get Jira issue in Curl

the curl way to fetch via Jira API is like this

```bash
    curl -D- \
    -X GET \
    -H "Authorization: Basic YUBieXRlYmFzZS5jb206QVRBVFQzeEZmR0YwbW9ybEJScXJ0U25nYnUyWlhIZU5mcEpvdHFaRzlZLTVrdE5VMlpZSzRrV05LS0loY2FrRjN0M0RjMGpBWXROdDJEZWJmZkhuNTc4X0g4NnQ2aTJnbnljTWh0OHJBcThTZ25EeFZDRFFZdjdPSk4ycF81WVRiN2RNS1B0OW1ucFAzc2xlanZPdW9mMXBtbk9BdU5NOTNqNmpjS1ZJUnF2Y2FpUEIxOFU2QjdNPTc2NEFGQjU4" \
    -H "Content-Type: application/json" \
    "https://bytebase.atlassian.net/rest/api/3/issue/API-1"
```

This is what it returns

```bash

HTTP/2 200
date: Wed, 09 Oct 2024 10:01:41 GMT
content-type: application/json;charset=UTF-8
server: AtlassianEdge
timing-allow-origin: *
x-arequestid: 17313d0638778928cd7a91512d4095c0
set-cookie: atlassian.xsrf.token=e7c51a0f65c7138e40d82b4b65bc820a07888e98_lin; Path=/; SameSite=None; Secure
x-aaccountid: 712020%3Acf20d007-987c-41f6-a858-a378543f8c96
cache-control: no-cache, no-store, no-transform
vary: Accept-Encoding
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
atl-traceid: ddafb3edbcd447429cd7b9a1c0a32d49
strict-transport-security: max-age=63072000; includeSubDomains; preload
report-to: {"endpoints": [{"url": "https://dz8aopenkvv6s.cloudfront.net"}], "group": "endpoint-1", "include_subdomains": true, "max_age": 600}
nel: {"failure_fraction": 0.001, "include_subdomains": true, "max_age": 600, "report_to": "endpoint-1"}
server-timing: atl-edge;dur=552,atl-edge-internal;dur=18,atl-edge-upstream;dur=538,atl-edge-pop;desc="aws-ap-northeast-2"

{"expand":"renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations,customfield_10010.requestTypePractice","id":"10005","self":"https://bytebase.atlassian.net/rest/api/3/issue/10005","key":"API-1","fields":{"statuscategorychangedate":"2024-10-09T10:37:54.643+0800","issuetype":{"self":"https://bytebase.atlassian.net/rest/api/3/issuetype/10010","id":"10010","description":"","iconUrl":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium","name":"Database Change","subtask":false,"avatarId":10307,"hierarchyLevel":0},"timespent":null,"customfield_10030":null,"project":{"self":"https://bytebase.atlassian.net/rest/api/3/project/10002","id":"10002","key":"API","name":"API Sample","projectTypeKey":"software","simplified":false,"avatarUrls":{"48x48":"https://bytebase.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10401","24x24":"https://bytebase.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10401?size=small","16x16":"https://bytebase.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10401?size=xsmall","32x32":"https://bytebase.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10401?size=medium"}},"customfield_10032":null,"fixVersions":[],"customfield_10033":null,"customfield_10034":null,"aggregatetimespent":null,"resolution":null,"customfield_10027":null,"customfield_10028":null,"customfield_10029":null,"resolutiondate":null,"workratio":-1,"issuerestriction":{"issuerestrictions":{},"shouldDisplay":false},"watches":{"self":"https://bytebase.atlassian.net/rest/api/3/issue/API-1/watchers","watchCount":1,"isWatching":true},"lastViewed":"2024-10-09T17:51:23.798+0800","created":"2024-09-27T17:23:22.508+0800","customfield_10020":null,"customfield_10021":null,"customfield_10022":null,"priority":{"self":"https://bytebase.atlassian.net/rest/api/3/priority/3","iconUrl":"https://bytebase.atlassian.net/images/icons/priorities/medium.svg","name":"Medium","id":"3"},"customfield_10023":null,"customfield_10024":null,"customfield_10025":null,"labels":[],"customfield_10016":null,"customfield_10017":null,"customfield_10018":{"hasEpicLinkFieldDependency":false,"showField":false,"nonEditableReason":{"reason":"PLUGIN_LICENSE_ERROR","message":"The Parent Link is only available to Jira Premium users."}},"customfield_10019":"0|i0000v:","timeestimate":null,"aggregatetimeoriginalestimate":null,"versions":[],"issuelinks":[],"assignee":{"self":"https://bytebase.atlassian.net/rest/api/3/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96","accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96","emailAddress":"a@bytebase.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"},"displayName":"Adela","active":true,"timeZone":"Asia/Shanghai","accountType":"atlassian"},"updated":"2024-10-09T10:37:54.643+0800","status":{"self":"https://bytebase.atlassian.net/rest/api/3/status/10003","description":"","iconUrl":"https://bytebase.atlassian.net/","name":"To Do","id":"10003","statusCategory":{"self":"https://bytebase.atlassian.net/rest/api/3/statuscategory/2","id":2,"key":"new","colorName":"blue-gray","name":"To Do"}},"components":[],"timeoriginalestimate":null,"description":{"type":"doc","version":1,"content":[{"type":"paragraph","content":[{"type":"text","text":"Create a table t2025, first to demodb"}]}]},"customfield_10010":null,"customfield_10014":null,"timetracking":{},"customfield_10015":null,"customfield_10005":null,"customfield_10006":null,"security":null,"customfield_10007":null,"customfield_10008":null,"customfield_10009":null,"aggregatetimeestimate":null,"attachment":[],"summary":"Create a table t2025 on test","creator":{"self":"https://bytebase.atlassian.net/rest/api/3/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96","accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96","emailAddress":"a@bytebase.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"},"displayName":"Adela","active":true,"timeZone":"Asia/Shanghai","accountType":"atlassian"},"subtasks":[],"customfield_10040":"demodb","reporter":{"self":"https://bytebase.atlassian.net/rest/api/3/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96","accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96","emailAddress":"a@bytebase.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png","32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"},"displayName":"Adela","active":true,"timeZone":"Asia/Shanghai","accountType":"atlassian"},"aggregateprogress":{"progress":0,"total":0},"customfield_10001":null,"customfield_10002":[],"customfield_10003":null,"customfield_10004":null,"customfield_10038":{"type":"doc","version":1,"content":[{"type":"paragraph","content":[{"type":"text","text":"CREATE TABLE t2025(id INT, name TEXT);"}]}]},"customfield_10039":"http://localhost:8080/projects/jira-api/issues/create-a-table-t2024-on-test-196","environment":null,"duedate":null,"progress":{"progress":0,"total":0},"comment":{"comments":[],"self":"https://bytebase.atlassian.net/rest/api/3/issue/10005/comment","maxResults":0,"total":0,"startAt":0},"votes":{"self":"https://bytebase.atlassian.net/rest/api/3/issue/API-1/votes","votes":0,"hasVoted":false},"worklog":{"startAt":0,"maxResults":20,"total":0,"worklogs":[]}}}

```

## Update Jira Issue API in Curl

the curl way to update the issue is like this

```bash
curl --request PUT \
  --url 'https://your-domain.atlassian.net/rest/api/3/issue/{issueIdOrKey}' \
  --user 'email@example.com:<api_token>' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "fields": {
    "customfield_10000": {
      "content": [
        {
          "content": [
            {
              "text": "Investigation underway",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "customfield_10010": 1,
    "summary": "Completed orders still displaying in pending"
  },
  "historyMetadata": {
    "activityDescription": "Complete order processing",
    "actor": {
      "avatarUrl": "http://mysystem/avatar/tony.jpg",
      "displayName": "Tony",
      "id": "tony",
      "type": "mysystem-user",
      "url": "http://mysystem/users/tony"
    },
    "cause": {
      "id": "myevent",
      "type": "mysystem-event"
    },
    "description": "From the order testing process",
    "extraData": {
      "Iteration": "10a",
      "Step": "4"
    },
    "generator": {
      "id": "mysystem-1",
      "type": "mysystem-application"
    },
    "type": "myplugin:type"
  },
  "properties": [
    {
      "key": "key1",
      "value": "Order number 10784"
    },
    {
      "key": "key2",
      "value": "Order number 10923"
    }
  ],
  "update": {
    "components": [
      {
        "set": ""
      }
    ],
    "labels": [
      {
        "add": "triaged"
      },
      {
        "remove": "blocker"
      }
    ],
    "summary": [
      {
        "set": "Bug in business logic"
      }
    ],
    "timetracking": [
      {
        "edit": {
          "originalEstimate": "1w 1d",
          "remainingEstimate": "4d"
        }
      }
    ]
  }
}'

```


## Update Jira Issue API in Node.js

```js
// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

const bodyData = `{
  "issueIdsOrKeys": [
    "PR-1",
    "1001",
    "PROJECT-2"
  ]
}`;

fetch('https://your-domain.atlassian.net/rest/api/3/issue/unarchive', {
  method: 'PUT',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'email@example.com:<api_token>'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
```

Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition will be ignored as it is not supported yet.

The edits to the issue's fields are defined using update and fields. The fields that can be edited are determined using Get edit issue metadata.

The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting update.parent.set.none to true. Note that the description, environment, and any textarea type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (textfield) accept a string and don't handle Atlassian Document Format content.

Connect apps having an app user with Administer Jira global permission, and Forge apps acting on behalf of users with Administer Jira global permission, can override the screen security configuration using overrideScreenSecurity and overrideEditableFlag.

This operation can be accessed anonymously.

Permissions required:

Browse projects and Edit issues project permission for the project that the issue is in.
If issue-level security is configured, issue-level security permission to view the issue.
Data Security Policy: Not exempt from app access rules
Scopes
Connect app scope required: WRITE

OAuth 2.0 scopes required:
ClassicRECOMMENDED:write:jira-work
Granular:write:issue:jira