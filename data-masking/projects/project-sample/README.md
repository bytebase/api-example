## Configure masking exception

This corresponds to granting user permission to see unmasked data https://www.bytebase.com/docs/security/data-masking/access-unmasked-data/

```bash
curl --request POST ${bytebase_url}/v1/projects/project-sample/policies \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @masking-exception.json
```
