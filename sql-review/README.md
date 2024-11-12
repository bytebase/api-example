# SQL Review

Corresponding [tutorial 🔗](https://www.bytebase.com/docs/tutorials/api-sql-review/).

This example demonstrates how to use API to configure [SQL Review](https://www.bytebase.com/docs/sql-review/review-policy/) policies.
This example defines the following review policies:

- `basic`. Applies to environment `test` and project `basic`.
- `advanced`. Applies to environment `prod`.

## Fetch the access token with service account

To call the Bytebase API, you need to use the service account

Doc: https://www.bytebase.com/docs/api/authentication/

```bash
export bytebase_url=http://localhost:5678
bytebase_account="ci@service.bytebase.com"
bytebase_password="bbs_Jrlj59enAEwSG7fM8a69"
bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
    --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
    --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
echo $bytebase_token
```

## Configure SQL Review policy

### Upsert

```bash
curl --request PATCH "${bytebase_url}/v1/reviewConfigs/basic?allow_missing=true&update_mask=rules" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @policy/basic.json

curl --request PATCH "${bytebase_url}/v1/reviewConfigs/advanced?allow_missing=true&update_mask=rules" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @policy/advanced.json
```

### Delete

```bash
curl --request DELETE ${bytebase_url}/v1/reviewConfigs/basic \
  --header 'Authorization: Bearer '${bytebase_token}

curl --request DELETE ${bytebase_url}/v1/reviewConfigs/advanced \
  --header 'Authorization: Bearer '${bytebase_token}
```

## Configure policy on environment

### Attach

```bash
curl --request PATCH "${bytebase_url}/v1/environments/test/policies/tag?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @binding/environments/test.json

curl --request PATCH "${bytebase_url}/v1/environments/prod/policies/tag?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @binding/environments/prod.json
```

### Remove

```bash
curl --request DELETE ${bytebase_url}/v1/environments/test/policies/tag \
  --header 'Authorization: Bearer '${bytebase_token}

curl --request DELETE ${bytebase_url}/v1/environments/prod/policies/tag \
  --header 'Authorization: Bearer '${bytebase_token}
```

## Configure policy on project

### Attach

```bash
curl --request PATCH "${bytebase_url}/v1/projects/project-sample/policies/tag?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @binding/projects/project-sample.json
```

### Remove

```bash
curl --request DELETE ${bytebase_url}/v1/projects/project-sample/policies/tag \
  --header 'Authorization: Bearer '${bytebase_token}
```
