# IAM

Docs: https://www.bytebase.com/docs/security/data-access-control/

API: https://api.bytebase.com/#tag/projectservice/POST/v1/projects/{project}:setIamPolicy

```bash
export project_id=project-sample
curl --request POST "${bytebase_url}/v1/projects/${project_id}:setIamPolicy" \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @iam.json
```