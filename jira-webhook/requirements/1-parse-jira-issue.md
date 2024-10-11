When there is an issue updated in Jira, a webhook will trigger send request to `api/jira`, the request body is as follows:

```json
{
   "timestamp":1728376683790,
   "webhookEvent":"jira:issue_updated",
   "issue_event_type_name":"issue_generic",
   "user":{
      "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
      "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
      "avatarUrls":{
         "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
      },
      "displayName":"Adela",
      "active":true,
      "timeZone":"Asia/Shanghai",
      "accountType":"atlassian"
   },
   "issue":{
      "id":"10005",
      "self":"https://bytebase.atlassian.net/rest/api/2/10005",
      "key":"API-1",
      "fields":{
         "statuscategorychangedate":"2024-10-08T16:38:03.790+0800",
         "issuetype":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issuetype/10010",
            "id":"10010",
            "description":"",
            "iconUrl":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
            "name":"Database Change",
            "subtask":false,
            "avatarId":10307,
            "hierarchyLevel":0
         },
         "timespent":null,
         "customfield_10030":null,
         "project":{
            "self":"https://bytebase.atlassian.net/rest/api/2/project/10002",
            "id":"10002",
            "key":"API",
            "name":"API Sample",
            "projectTypeKey":"software",
            "simplified":false,
            "avatarUrls":{
               "48x48":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401",
               "24x24":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=small",
               "16x16":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=xsmall",
               "32x32":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=medium"
            }
         },
         "customfield_10032":null,
         "fixVersions":[
            
         ],
         "customfield_10033":null,
         "customfield_10034":null,
         "aggregatetimespent":null,
         "resolution":null,
         "customfield_10036":null,
         "customfield_10037":null,
         "customfield_10027":null,
         "customfield_10028":null,
         "customfield_10029":null,
         "resolutiondate":null,
         "workratio":-1,
         "lastViewed":"2024-10-08T16:34:09.627+0800",
         "issuerestriction":{
            "issuerestrictions":{
               
            },
            "shouldDisplay":false
         },
         "watches":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issue/API-1/watchers",
            "watchCount":1,
            "isWatching":true
         },
         "created":"2024-09-27T17:23:22.508+0800",
         "customfield_10020":null,
         "customfield_10021":null,
         "customfield_10022":null,
         "priority":{
            "self":"https://bytebase.atlassian.net/rest/api/2/priority/3",
            "iconUrl":"https://bytebase.atlassian.net/images/icons/priorities/medium.svg",
            "name":"Medium",
            "id":"3"
         },
         "customfield_10023":null,
         "customfield_10024":null,
         "customfield_10025":null,
         "labels":[
            
         ],
         "customfield_10016":null,
         "customfield_10017":null,
         "customfield_10018":{
            "hasEpicLinkFieldDependency":false,
            "showField":false,
            "nonEditableReason":{
               "reason":"PLUGIN_LICENSE_ERROR",
               "message":"The Parent Link is only available to Jira Premium users."
            }
         },
         "customfield_10019":"0|i0000v:",
         "timeestimate":null,
         "aggregatetimeoriginalestimate":null,
         "versions":[
            
         ],
         "issuelinks":[
            
         ],
         "assignee":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "updated":"2024-10-08T16:38:03.790+0800",
         "status":{
            "self":"https://bytebase.atlassian.net/rest/api/2/status/3",
            "description":"This issue is being actively worked on at the moment by the assignee.",
            "iconUrl":"https://bytebase.atlassian.net/images/icons/statuses/inprogress.png",
            "name":"In Progress",
            "id":"3",
            "statusCategory":{
               "self":"https://bytebase.atlassian.net/rest/api/2/statuscategory/4",
               "id":4,
               "key":"indeterminate",
               "colorName":"yellow",
               "name":"In Progress"
            }
         },
         "components":[
            
         ],
         "timeoriginalestimate":null,
         "description":"Create a table t2024, first to demodb",
         "customfield_10010":null,
         "customfield_10014":null,
         "timetracking":{
            
         },
         "customfield_10015":null,
         "customfield_10005":null,
         "customfield_10006":null,
         "security":null,
         "customfield_10007":null,
         "customfield_10008":null,
         "customfield_10009":null,
         "aggregatetimeestimate":null,
         "attachment":[
            
         ],
         "summary":"Create a table t2024 on test",
         "creator":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "subtasks":[
            
         ],
         "customfield_10040":"demodb",
         "reporter":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "aggregateprogress":{
            "progress":0,
            "total":0
         },
         "customfield_10001":null,
         "customfield_10002":[
            
         ],
         "customfield_10003":null,
         "customfield_10004":null,
         "customfield_10038":"CREATE TABLE t2024(id INT, name TEXT);",
         "customfield_10039":"http://localhost:8080/projects/jira-api/issues/create-a-table-t2024-on-test-196",
         "environment":null,
         "duedate":null,
         "progress":{
            "progress":0,
            "total":0
         },
         "votes":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issue/API-1/votes",
            "votes":0,
            "hasVoted":false
         }
      }
   },
   "changelog":{
      "id":"10030",
      "items":[
         {
            "field":"status",
            "fieldtype":"jira",
            "fieldId":"status",
            "from":"10003",
            "fromString":"To Do",
            "to":"3",
            "toString":"In Progress"
         }
      ]
   }
}
```

```json
{
   "timestamp":1728547205918,
   "webhookEvent":"jira:issue_updated",
   "issue_event_type_name":"issue_updated",
   "user":{
      "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
      "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
      "avatarUrls":{
         "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
         "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
      },
      "displayName":"Adela",
      "active":true,
      "timeZone":"Asia/Shanghai",
      "accountType":"atlassian"
   },
   "issue":{
      "id":"10005",
      "self":"https://bytebase.atlassian.net/rest/api/2/10005",
      "key":"API-1",
      "fields":{
         "statuscategorychangedate":"2024-10-10T13:43:31.613+0800",
         "issuetype":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issuetype/10010",
            "id":"10010",
            "description":"",
            "iconUrl":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
            "name":"Database Change",
            "subtask":false,
            "avatarId":10307,
            "hierarchyLevel":0
         },
         "timespent":null,
         "customfield_10030":null,
         "project":{
            "self":"https://bytebase.atlassian.net/rest/api/2/project/10002",
            "id":"10002",
            "key":"API",
            "name":"API Sample",
            "projectTypeKey":"software",
            "simplified":false,
            "avatarUrls":{
               "48x48":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401",
               "24x24":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=small",
               "16x16":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=xsmall",
               "32x32":"https://bytebase.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=medium"
            }
         },
         "customfield_10032":null,
         "fixVersions":[
            
         ],
         "customfield_10033":null,
         "customfield_10034":null,
         "aggregatetimespent":null,
         "resolution":null,
         "customfield_10036":null,
         "customfield_10037":null,
         "customfield_10027":null,
         "customfield_10028":null,
         "customfield_10029":null,
         "resolutiondate":null,
         "workratio":-1,
         "issuerestriction":{
            "issuerestrictions":{
               
            },
            "shouldDisplay":false
         },
         "lastViewed":"2024-10-10T13:45:30.412+0800",
         "watches":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issue/API-1/watchers",
            "watchCount":1,
            "isWatching":true
         },
         "created":"2024-09-27T17:23:22.508+0800",
         "customfield_10020":null,
         "customfield_10021":null,
         "customfield_10022":null,
         "priority":{
            "self":"https://bytebase.atlassian.net/rest/api/2/priority/3",
            "iconUrl":"https://bytebase.atlassian.net/images/icons/priorities/medium.svg",
            "name":"Medium",
            "id":"3"
         },
         "customfield_10023":null,
         "customfield_10024":null,
         "customfield_10025":null,
         "labels":[
            
         ],
         "customfield_10016":null,
         "customfield_10017":null,
         "customfield_10018":{
            "hasEpicLinkFieldDependency":false,
            "showField":false,
            "nonEditableReason":{
               "reason":"PLUGIN_LICENSE_ERROR",
               "message":"The Parent Link is only available to Jira Premium users."
            }
         },
         "customfield_10019":"0|i0000v:",
         "timeestimate":null,
         "aggregatetimeoriginalestimate":null,
         "versions":[
            
         ],
         "issuelinks":[
            
         ],
         "assignee":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "updated":"2024-10-10T16:00:05.918+0800",
         "status":{
            "self":"https://bytebase.atlassian.net/rest/api/2/status/10003",
            "description":"",
            "iconUrl":"https://bytebase.atlassian.net/",
            "name":"To Do",
            "id":"10003",
            "statusCategory":{
               "self":"https://bytebase.atlassian.net/rest/api/2/statuscategory/2",
               "id":2,
               "key":"new",
               "colorName":"blue-gray",
               "name":"New"
            }
         },
         "components":[
            
         ],
         "timeoriginalestimate":null,
         "description":"Description updated at 2024-10-10T03:51:13.417Z",
         "customfield_10010":null,
         "customfield_10014":null,
         "timetracking":{
            
         },
         "customfield_10015":null,
         "customfield_10005":null,
         "customfield_10006":null,
         "security":null,
         "customfield_10007":null,
         "customfield_10008":null,
         "customfield_10009":null,
         "aggregatetimeestimate":null,
         "attachment":[
            
         ],
         "summary":"Create a table t2025 on test",
         "creator":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "subtasks":[
            
         ],
         "customfield_10040":"demodb",
         "reporter":{
            "self":"https://bytebase.atlassian.net/rest/api/2/user?accountId=712020%3Acf20d007-987c-41f6-a858-a378543f8c96",
            "accountId":"712020:cf20d007-987c-41f6-a858-a378543f8c96",
            "avatarUrls":{
               "48x48":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "24x24":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "16x16":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png",
               "32x32":"https://secure.gravatar.com/avatar/10dbf272d98cec2958fa3d8c9b790a93?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FA-2.png"
            },
            "displayName":"Adela",
            "active":true,
            "timeZone":"Asia/Shanghai",
            "accountType":"atlassian"
         },
         "aggregateprogress":{
            "progress":0,
            "total":0
         },
         "customfield_10001":null,
         "customfield_10002":[
            
         ],
         "customfield_10003":null,
         "customfield_10004":null,
         "customfield_10038":"CREATE TABLE t2025(id INT, name TEXT);",
         "customfield_10039":"http://bytebase.com/issue/2024-10-10T08:00:04.883Z",
         "environment":null,
         "duedate":null,
         "progress":{
            "progress":0,
            "total":0
         },
         "votes":{
            "self":"https://bytebase.atlassian.net/rest/api/2/issue/API-1/votes",
            "votes":0,
            "hasVoted":false
         }
      }
   },
   "changelog":{
      "id":"10065",
      "items":[
         {
            "field":"Bytebase issue link",
            "fieldtype":"custom",
            "fieldId":"customfield_10039",
            "from":null,
            "fromString":"http://bytebase.com/issue/2024-10-10T07:59:50.016Z",
            "to":null,
            "toString":"http://bytebase.com/issue/2024-10-10T08:00:04.883Z"
         }
      ]
   }
}
```

We need to parse this body and to print it out on a webpage

1. This should only be triggered when the issue type is `Database Change`
1. The project key is `API`
1. The issue key is `API-1`
1. The summary in Jira is `Create a table t2024 on test`
1. The description in Jira is `Create a table t2024, first to demodb`
1. The SQL statement is `CREATE TABLE t2024(id INT, name TEXT);`
1. The database is `demodb`
1. The issue status is from `To Do` to `In Progress`
1. The customfield_10039 is bytebase issue link