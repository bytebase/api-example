## Update data classification

```bash
curl --request PATCH ${bytebase_url}/v1/settings/bb.workspace.data-classification \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @data-classification.json
```
