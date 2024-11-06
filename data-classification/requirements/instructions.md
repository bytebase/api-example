the classification is like this object:

```json

{
    "name": "settings/bb.workspace.data-classification",
    "value": {
        "dataClassificationSettingValue": {
            "configs": [
                {
                    "id": "58d7354e-6061-4346-b9a8-bb5e30b94fd2",
                    "title": "Classification Example",
                    "levels": [
                        {
                            "id": "1",
                            "title": "Level 1",
                            "description": ""
                        },
                        {
                            "id": "2",
                            "title": "Level 2",
                            "description": ""
                        }
                    ],
                    "classification": {
                        "1": {
                            "id": "1",
                            "title": "Basic",
                            "description": ""
                        },
                        "2": {
                            "id": "2",
                            "title": "Relationship",
                            "description": ""
                        },
                        "1-1": {
                            "id": "1-1",
                            "title": "Basic",
                            "description": "",
                            "levelId": "1"
                        },
                        "1-2": {
                            "id": "1-2",
                            "title": "Assert",
                            "description": "",
                            "levelId": "1"
                        },
                        "1-3": {
                            "id": "1-3",
                            "title": "Contact",
                            "description": "",
                            "levelId": "2"
                        },
                        "1-4": {
                            "id": "1-4",
                            "title": "Health",
                            "description": "",
                            "levelId": "2"
                        },
                        "2-1": {
                            "id": "2-1",
                            "title": "Social",
                            "description": "",
                            "levelId": "1"
                        },
                        "2-2": {
                            "id": "2-2",
                            "title": "Business",
                            "description": "",
                            "levelId": "1"
                        }
                    },
                    "classificationFromConfig": true
                }
            ]
        }
    }
}

```



the database metadata is like this object:

```json
{
    "name": "instances/prod-sample-instance/databases/hr_prod/metadata",
    "schemas": [
        {
            "name": "bbdataarchive",
            "tables": [
                {
                    "name": "_20240904030038_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 125",
                    "userComment": "issue 125",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914071430_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 150",
                    "userComment": "issue 150",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914071800_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 151",
                    "userComment": "issue 151",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074514_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 163",
                    "userComment": "issue 163",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074514_1_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 163",
                    "userComment": "issue 163",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074514_2_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 163",
                    "userComment": "issue 163",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074735_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 164",
                    "userComment": "issue 164",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074735_1_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 164",
                    "userComment": "issue 164",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20240914074759_0_t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 164",
                    "userComment": "issue 164",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "_20241010064152_0_t1010",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "0",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "issue 216, source table (public, t1010)",
                    "userComment": "issue 216, source table (public, t1010)",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "kkkkk",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "kkkkk_pk_e1737b",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"kkkkk_pk_e1737b\" ON \"bbdataarchive\".\"kkkkk\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "8192",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                }
            ],
            "externalTables": [],
            "views": [],
            "functions": [],
            "procedures": [],
            "streams": [],
            "tasks": [],
            "materializedViews": [],
            "packages": [],
            "owner": "bbsample"
        },
        {
            "name": "public",
            "tables": [
                {
                    "name": "audit",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": true,
                            "defaultExpression": "nextval('audit_id_seq'::regclass)",
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "operation",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "query",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "user_name",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "changed_at",
                            "position": 5,
                            "hasDefault": true,
                            "defaultExpression": "CURRENT_TIMESTAMP",
                            "onUpdate": "",
                            "nullable": true,
                            "type": "timestamp with time zone",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "audit_pkey",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"audit_pkey\" ON \"public\".\"audit\" USING btree (id);"
                        },
                        {
                            "name": "idx_audit_changed_at",
                            "expressions": [
                                "changed_at"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": false,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE INDEX \"idx_audit_changed_at\" ON \"public\".\"audit\" USING btree (changed_at);"
                        },
                        {
                            "name": "idx_audit_operation",
                            "expressions": [
                                "operation"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": false,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE INDEX \"idx_audit_operation\" ON \"public\".\"audit\" USING btree (operation);"
                        },
                        {
                            "name": "idx_audit_username",
                            "expressions": [
                                "user_name"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": false,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE INDEX \"idx_audit_username\" ON \"public\".\"audit\" USING btree (user_name);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "32768",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "department",
                    "columns": [
                        {
                            "name": "dept_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "dept_name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "department_dept_name_key",
                            "expressions": [
                                "dept_name"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"department_dept_name_key\" ON \"public\".\"department\" USING btree (dept_name);"
                        },
                        {
                            "name": "department_pkey",
                            "expressions": [
                                "dept_no"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"department_pkey\" ON \"public\".\"department\" USING btree (dept_no);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "32768",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "dept_emp",
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "dept_no",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "dept_emp_pkey",
                            "expressions": [
                                "emp_no",
                                "dept_no"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"dept_emp_pkey\" ON \"public\".\"dept_emp\" USING btree (emp_no, dept_no);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "1103",
                    "dataSize": "106496",
                    "indexSize": "57344",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [
                        {
                            "name": "dept_emp_dept_no_fkey",
                            "columns": [
                                "dept_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "department",
                            "referencedColumns": [
                                "dept_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        },
                        {
                            "name": "dept_emp_emp_no_fkey",
                            "columns": [
                                "emp_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "employee",
                            "referencedColumns": [
                                "emp_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        }
                    ],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "dept_manager",
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "dept_no",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "dept_manager_pkey",
                            "expressions": [
                                "emp_no",
                                "dept_no"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"dept_manager_pkey\" ON \"public\".\"dept_manager\" USING btree (emp_no, dept_no);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "16384",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [
                        {
                            "name": "dept_manager_dept_no_fkey",
                            "columns": [
                                "dept_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "department",
                            "referencedColumns": [
                                "dept_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        },
                        {
                            "name": "dept_manager_emp_no_fkey",
                            "columns": [
                                "emp_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "employee",
                            "referencedColumns": [
                                "emp_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        }
                    ],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "employee",
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": true,
                            "defaultExpression": "nextval('employee_emp_no_seq'::regclass)",
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "1-1",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "birth_date",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "1-3",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "first_name",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "last_name",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "gender",
                            "position": 5,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "hire_date",
                            "position": 6,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "employee_pkey",
                            "expressions": [
                                "emp_no"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"employee_pkey\" ON \"public\".\"employee\" USING btree (emp_no);"
                        },
                        {
                            "name": "idx_employee_hire_date",
                            "expressions": [
                                "hire_date"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": false,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE INDEX \"idx_employee_hire_date\" ON \"public\".\"employee\" USING btree (hire_date);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "1000",
                    "dataSize": "98304",
                    "indexSize": "98304",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "salary",
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "amount",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "idx_salary_amount",
                            "expressions": [
                                "amount"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": false,
                            "primary": false,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE INDEX \"idx_salary_amount\" ON \"public\".\"salary\" USING btree (amount);"
                        },
                        {
                            "name": "salary_pkey",
                            "expressions": [
                                "emp_no",
                                "from_date"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"salary_pkey\" ON \"public\".\"salary\" USING btree (emp_no, from_date);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "9488",
                    "dataSize": "458752",
                    "indexSize": "548864",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [
                        {
                            "name": "salary_emp_no_fkey",
                            "columns": [
                                "emp_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "employee",
                            "referencedColumns": [
                                "emp_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        }
                    ],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": true,
                            "defaultExpression": "0",
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": true,
                            "defaultExpression": "''::text",
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "created_time",
                            "position": 3,
                            "hasDefault": true,
                            "defaultExpression": "CURRENT_TIMESTAMP",
                            "onUpdate": "",
                            "nullable": false,
                            "type": "timestamp with time zone",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "PRIMARY",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"PRIMARY\" ON \"public\".\"t1\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "16384",
                    "indexSize": "16384",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "t1010",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "t1010_pk_f067dc",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"t1010_pk_f067dc\" ON \"public\".\"t1010\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "16384",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "t2024",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "name",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "t2024_pkey",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"t2024_pkey\" ON \"public\".\"t2024\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "8192",
                    "indexSize": "8192",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "title",
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "title",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "title_pkey",
                            "expressions": [
                                "emp_no",
                                "title",
                                "from_date"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"title_pkey\" ON \"public\".\"title\" USING btree (emp_no, title, from_date);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "1470",
                    "dataSize": "131072",
                    "indexSize": "73728",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [
                        {
                            "name": "title_emp_no_fkey",
                            "columns": [
                                "emp_no"
                            ],
                            "referencedSchema": "public",
                            "referencedTable": "employee",
                            "referencedColumns": [
                                "emp_no"
                            ],
                            "onDelete": "CASCADE",
                            "onUpdate": "NO ACTION",
                            "matchType": "SIMPLE"
                        }
                    ],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                }
            ],
            "externalTables": [],
            "views": [
                {
                    "name": "current_dept_emp",
                    "definition": " SELECT l.emp_no,\n    d.dept_no,\n    l.from_date,\n    l.to_date\n   FROM (dept_emp d\n     JOIN dept_emp_latest_date l ON (((d.emp_no = l.emp_no) AND (d.from_date = l.from_date) AND (l.to_date = d.to_date))));",
                    "comment": "",
                    "dependentColumns": [
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "dept_no"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "emp_no"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "from_date"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "to_date"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp_latest_date",
                            "column": "emp_no"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp_latest_date",
                            "column": "from_date"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp_latest_date",
                            "column": "to_date"
                        }
                    ],
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "dept_no",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "text",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 4,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ]
                },
                {
                    "name": "dept_emp_latest_date",
                    "definition": " SELECT emp_no,\n    max(from_date) AS from_date,\n    max(to_date) AS to_date\n   FROM dept_emp\n  GROUP BY emp_no;",
                    "comment": "",
                    "dependentColumns": [
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "emp_no"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "from_date"
                        },
                        {
                            "schema": "public",
                            "table": "dept_emp",
                            "column": "to_date"
                        }
                    ],
                    "columns": [
                        {
                            "name": "emp_no",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "from_date",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "to_date",
                            "position": 3,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "date",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ]
                },
                {
                    "name": "pg_stat_statements_info",
                    "definition": " SELECT dealloc,\n    stats_reset\n   FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);",
                    "comment": "",
                    "dependentColumns": [],
                    "columns": [
                        {
                            "name": "dealloc",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "bigint",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        },
                        {
                            "name": "stats_reset",
                            "position": 2,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": true,
                            "type": "timestamp with time zone",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ]
                }
            ],
            "functions": [
                {
                    "name": "log_dml_operations",
                    "definition": "CREATE OR REPLACE FUNCTION public.log_dml_operations()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    IF (TG_OP = 'INSERT') THEN\n        INSERT INTO audit (operation, query, user_name)\n        VALUES ('INSERT', current_query(), current_user);\n        RETURN NEW;\n    ELSIF (TG_OP = 'UPDATE') THEN\n        INSERT INTO audit (operation, query, user_name)\n        VALUES ('UPDATE', current_query(), current_user);\n        RETURN NEW;\n    ELSIF (TG_OP = 'DELETE') THEN\n        INSERT INTO audit (operation, query, user_name)\n        VALUES ('DELETE', current_query(), current_user);\n        RETURN OLD;\n    END IF;\n    RETURN NULL;\nEND;\n$function$\n",
                    "signature": "log_dml_operations()"
                },
                {
                    "name": "pg_stat_statements",
                    "definition": "CREATE OR REPLACE FUNCTION public.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision)\n RETURNS SETOF record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_1_10$function$\n",
                    "signature": "pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision)"
                },
                {
                    "name": "pg_stat_statements_info",
                    "definition": "CREATE OR REPLACE FUNCTION public.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone)\n RETURNS record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_info$function$\n",
                    "signature": "pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone)"
                },
                {
                    "name": "pg_stat_statements_reset",
                    "definition": "CREATE OR REPLACE FUNCTION public.pg_stat_statements_reset(userid oid DEFAULT 0, dbid oid DEFAULT 0, queryid bigint DEFAULT 0)\n RETURNS void\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_reset_1_7$function$\n",
                    "signature": "pg_stat_statements_reset(userid oid, dbid oid, queryid bigint)"
                }
            ],
            "procedures": [],
            "streams": [],
            "tasks": [],
            "materializedViews": [],
            "packages": [],
            "owner": "pg_database_owner"
        },
        {
            "name": "testschema",
            "tables": [
                {
                    "name": "t1",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "t1_pk_91ca85",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"t1_pk_91ca85\" ON \"testschema\".\"t1\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "0",
                    "indexSize": "8192",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                },
                {
                    "name": "t2",
                    "columns": [
                        {
                            "name": "id",
                            "position": 1,
                            "hasDefault": false,
                            "onUpdate": "",
                            "nullable": false,
                            "type": "integer",
                            "characterSet": "",
                            "collation": "",
                            "comment": "",
                            "userComment": "",
                            "effectiveMaskingLevel": "MASKING_LEVEL_UNSPECIFIED",
                            "generation": null
                        }
                    ],
                    "indexes": [
                        {
                            "name": "t2_pk_51b280",
                            "expressions": [
                                "id"
                            ],
                            "keyLength": [],
                            "descending": [],
                            "type": "btree",
                            "unique": true,
                            "primary": true,
                            "visible": false,
                            "comment": "",
                            "definition": "CREATE UNIQUE INDEX \"t2_pk_51b280\" ON \"testschema\".\"t2\" USING btree (id);"
                        }
                    ],
                    "engine": "",
                    "collation": "",
                    "charset": "",
                    "rowCount": "0",
                    "dataSize": "0",
                    "indexSize": "8192",
                    "dataFree": "0",
                    "createOptions": "",
                    "comment": "",
                    "userComment": "",
                    "foreignKeys": [],
                    "partitions": [],
                    "checkConstraints": [],
                    "owner": "bbsample"
                }
            ],
            "externalTables": [],
            "views": [],
            "functions": [],
            "procedures": [],
            "streams": [],
            "tasks": [],
            "materializedViews": [],
            "packages": [],
            "owner": "bbsample"
        }
    ],
    "characterSet": "UTF8",
    "collation": "en_US.UTF-8",
    "extensions": [
        {
            "name": "pg_stat_statements",
            "schema": "public",
            "version": "1.10",
            "description": "track planning and execution statistics of all SQL statements executed"
        }
    ],
    "schemaConfigs": [
        {
            "name": "public",
            "tableConfigs": [
                {
                    "name": "employee",
                    "columnConfigs": [
                        {
                            "name": "birth_date",
                            "semanticTypeId": "",
                            "labels": {},
                            "classificationId": "1-3"
                        },
                        {
                            "name": "emp_no",
                            "semanticTypeId": "",
                            "labels": {},
                            "classificationId": "1-1"
                        }
                    ],
                    "classificationId": "",
                    "updater": "",
                    "sourceBranch": "",
                    "updateTime": null
                }
            ],
            "functionConfigs": [],
            "procedureConfigs": [],
            "viewConfigs": []
        }
    ],
    "owner": "bbsample"
}
```