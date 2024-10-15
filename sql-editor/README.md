# Embed SQL Editor 

This example demonstrates how to embed [Bytebase SQL Editor](https://www.bytebase.com/docs/sql-editor/overview/) with iframe into your own application and call Bytebase API to prepare the environment.

## Scenario

You are building an online interactive SQL playground for people to learn PostgreSQL interactively.

## Prerequisites

1. A Bytebase deployment running in [SQL Editor mode](https://www.bytebase.com/docs/administration/mode/).
1. A PostgreSQL instance for hosting endusers' playground db.

## Workflow

1. User visits the website and clicks `start`.
1. Call the Bytebase API to create a project.
1. Call the Bytebase API to create a database.
1. Call the Bytebase API to move the database to the project.
1. Call the Bytebase API to grant that the permission to access that project and query the database.
1. Redirect user to SQL Editor page to run the query.