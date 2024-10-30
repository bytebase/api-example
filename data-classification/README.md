# Data Classification

This example demonstrates how to classify the columns using API. A common scenario is you build a
service to periodically sample the column data and classify the column accordingly. Once the column
is classified, Bytebase will apply the configured masking policy.

## Workflow

1. Define [classification](https://www.bytebase.com/docs/security/data-masking/data-classification/#step-1-define-classification).
1. Configure [Global Masking Policy](https://www.bytebase.com/docs/security/data-masking/data-classification/#step-2-configure-global-masking-policy).
1. Sampling column data and [classify the columns](https://www.bytebase.com/docs/security/data-masking/data-classification/#step-3-classify-column) accordingly.
