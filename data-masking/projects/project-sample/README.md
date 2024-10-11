```bash
curl --request POST ${bytebase_url}/v1/projects/project-sample/policies \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @masking-exception.json
```
