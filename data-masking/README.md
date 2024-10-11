# Bytebase Dynamic Data Masking Example

Demonstrate how to use API to configure different aspects of [Dynamic Data Masking](https://www.bytebase.com/docs/security/data-masking/overview/).

You can expand this example to build a GitOps solution to configure all masking settings as code.

## Fetch the access token

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
