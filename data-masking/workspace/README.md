## Configure data classification

```bash
curl --request PATCH ${bytebase_url}/v1/settings/bb.workspace.data-classification \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @data-classification.json
```

## Configure masking algorithm

```bash
curl --request PATCH ${bytebase_url}/v1/settings/bb.workspace.masking-algorithm \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @masking-algorithm.json
```

## Configure semantic type

```bash
curl --request PATCH ${bytebase_url}/v1/settings/bb.workspace.semantic-types \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @semantic-type.json
```

## Configure global masking rule

```bash
curl --request PATCH ${bytebase_url}/v1/policies/masking_rule?update_mask=payload \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data @global-masking-rule.json
```
