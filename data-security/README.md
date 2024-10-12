# Data Security API Example

This directory demonstrates how to use API to configure:

1. Users, groups, roles.
1. Database query and export access control.
1. Dynamic data masking.

You can expand this example to build a GitOps solution to codify all data security policies.

# Fetch the access token

Doc: https://www.bytebase.com/docs/api/authentication/

```bash
export bytebase_url=http://localhost:5678
bytebase_account="ci@service.bytebase.com"
bytebase_password="bbs_VkANoCFP7T8rWiz1HhvH"
bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
    --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
    --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
echo $bytebase_token
```
