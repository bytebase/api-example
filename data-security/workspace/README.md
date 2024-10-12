# Configure users

We don't provide example to configure users as we recommend using [SSO](https://www.bytebase.com/docs/administration/sso/overview/).

Another challenge for configuring users is you need to specify the password, which is not desirable.

# Configure groups

You can skip this if you have [SCIM](https://www.bytebase.com/docs/administration/scim/overview/) to
provision users and groups in an organization.

API: https://api.bytebase.com/#tag/groupservice

```bash
## Create
curl --request POST ${bytebase_url}/v1/groups \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @group.json
```

# Configure custom roles

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
