# Embed SQL Editor

Corresponding [tutorial 🔗](https://www.bytebase.com/docs/tutorials/embed-sql-editor/).

This example demonstrates how to embed [Bytebase SQL Editor](https://www.bytebase.com/docs/sql-editor/overview/)
with iframe into your own application and call Bytebase API to prepare the environment.

## Scenario

You are a SaaS provider and you provision a separate database to store the data for each customer. Sometimes,
you need your support team to query the customer database for troubleshooting. You want to embed SQL Editor
into your internal support portal and grant query permission to the support team **on demand**.

## Prerequisites

1. A Bytebase deployment.
1. A PostgreSQL instance for hosting endusers' playground db.
1. Configure [SSO](https://www.bytebase.com/docs/administration/sso/overview/) so users don't need to log in Bytebase separately.

## Workflow

1. Support engineer visits the internal support portal and clicks `troubleshoot`.
1. Call the Bytebase API to create a project.
1. Call the Bytebase API to create a database under that project.
1. Call the Bytebase API to grant the permission to the support engineer to query the database.
1. Redirect the support engineer to SQL Editor page to run the query.
