## Configure column masking explicitly

Correspond to https://www.bytebase.com/docs/security/data-masking/column-masking/

```bash
curl --request PATCH "${bytebase_url}/v1/instances/prod-sample-instance/databases/hr_prod/policies/masking?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @column-masking.json
```

## Configure column semantic type and classification

- Semantic type: https://www.bytebase.com/docs/security/data-masking/semantic-types/
- Classification: https://www.bytebase.com/docs/security/data-masking/data-classification/#manual-classification

```bash
curl --request PATCH ${bytebase_url}/v1/instances/prod-sample-instance/databases/hr_prod/metadata \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @metadata.json
```
