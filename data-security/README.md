# Data Security API Example

This directory demonstrates how to use API to configure data security related features.
You can refer this example to build a GitOps solution to codify all data security policies.

This example shows a typical directory structure:

1. **principal**. Users, groups.
1. **iam**. Roles, Query, and Export permission settings.
1. **masking**. Dynamic data masking.

If you are familiar with Google Cloud Platform (GCP), you may notice the Bytebase model is quite familiar:

1. [GCP Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
1. [GCP IAM](https://cloud.google.com/security/products/iam)
1. [GCP Org policy](https://cloud.google.com/resource-manager/docs/organization-policy/overview)

# Fetch the access token with service account

To call the Bytebase API, you need to use the service account 

Doc: https://www.bytebase.com/docs/api/authentication/

```bash
export bytebase_url=http://localhost:5678
bytebase_account="api@service.bytebase.com"
bytebase_password="bbs_gNECWMQrKe6YbRJ1Np19"
bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
    --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
    --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
echo $bytebase_token
```
