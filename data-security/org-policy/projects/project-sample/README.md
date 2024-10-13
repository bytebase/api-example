# Masking exception

Docs: https://www.bytebase.com/docs/security/data-masking/access-unmasked-data/

API: https://api.bytebase.com/#tag/orgpolicyservice/PATCH/v1/projects/{project}/policies/{policy}

```bash
export project_id=project-sample
curl --request PATCH "${bytebase_url}/v1/projects/${project_id}/policies/masking_exception?allow_missing=true&update_mask=payload" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @masking-exception.json
```
