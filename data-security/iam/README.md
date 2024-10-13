# Users

`Users` API is for demonstration purpose. For managing users, we highly recommend using [SSO](https://www.bytebase.com/docs/administration/sso/overview/)
to provision user instead of using API.

API: https://api.bytebase.com/#tag/authservice/POST/v1/users

```bash
## Create
curl --request POST ${bytebase_url}/v1/users \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @user.json
```

```bash
## Update
curl --request PATCH "${bytebase_url}/v1/users/103" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data '{
    "email":"test1@example.com",
    "title": "User updated",
    "phone": "+14082121234"
  }'
```

```bash
## Deactivate
curl --request DELETE "${bytebase_url}/v1/users/111" \
  --header 'Authorization: Bearer '${bytebase_token}
```

```bash
## Activate
curl --request POST "${bytebase_url}/v1/users/111:undelete" \
  --header 'Authorization: Bearer '${bytebase_token}
```

We don't provide example to configure users as we recommend using [SSO](https://www.bytebase.com/docs/administration/sso/overview/).

Another challenge for configuring users is you need to specify the password, which is not desirable.

# Groups

You can skip this if you have [SCIM](https://www.bytebase.com/docs/administration/scim/overview/) to
provision users and groups in an organization.

API: https://api.bytebase.com/#tag/groupservice

```bash
## Create
curl --request POST ${bytebase_url}/v1/groups \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data "$(jq -n --arg name 'groups/contractor@example.com' \
    '. + {name: $name} + input' group.json)"
```

You must be the **Group Owner** to update/delete the group.

```bash
## Update
curl --request PATCH "${bytebase_url}/v1/groups/contractor@example.com" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @group.json
```

```bash
## Delete
curl --request DELETE "${bytebase_url}/v1/groups/contractor@example.com" \
  --header 'Authorization: Bearer '${bytebase_token}
```

# Custom roles

Docs: https://www.bytebase.com/docs/administration/custom-roles/

API: https://api.bytebase.com/#tag/roleservice

```bash
## Create
curl --request POST "${bytebase_url}/v1/roles?roleId=auditor" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @custom-role.json
```

```bash
## Update
curl --request PATCH "${bytebase_url}/v1/roles/auditor" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @custom-role.json
```

```bash
## Delete
curl --request DELETE "${bytebase_url}/v1/roles/auditor" \
  --header 'Authorization: Bearer '${bytebase_token}
```

# IAM

API: https://api.bytebase.com/#tag/workspaceservice

```bash
export workspace_id=6c86d081-379d-4366-be6f-481425e6f397
curl --request POST "${bytebase_url}/v1/workspaces/${workspace_id}:setIamPolicy" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @iam.json
```