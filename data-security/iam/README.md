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