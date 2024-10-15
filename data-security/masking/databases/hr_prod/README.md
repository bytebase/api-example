## Column masking explicitly

Docs: https://www.bytebase.com/docs/security/data-masking/column-masking/

API: https://api.bytebase.com/#tag/orgpolicyservice/PATCH/v1/instances/{instance}/databases/{database}/policies/{policy}

```bash
curl --request PATCH "${bytebase_url}/v1/instances/prod-sample-instance/databases/hr_prod/policies/masking?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @column-masking.json
```

## Column semantic type and classification

Docs: 
  - Semantic type: https://www.bytebase.com/docs/security/data-masking/semantic-types/
  - Classification: https://www.bytebase.com/docs/security/data-masking/data-classification/#manual-classification

API: https://api.bytebase.com/#tag/databaseservice/PATCH/v1/instances/{instance}/databases/{database}/metadata

```bash
curl --request PATCH ${bytebase_url}/v1/instances/prod-sample-instance/databases/hr_prod/metadata \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @metadata.json
```
