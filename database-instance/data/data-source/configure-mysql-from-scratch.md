You can use the following command to install brew in your terminal under `database-instance` folder:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then start MySQL by

```bash
brew services start mysql
```

And check the status of MySQL service by

```bash
brew services list
```

Enter MySQL command line by

```bash
mysql -u root -p
```

With no password set by default, simply press `Enter` when the terminal prompts `Enter password:`.

Now that you are in MySQL command line, follow these code to grant access to the Bytebase container IP:

1. First check whether your MySQL was configured to only listen on localhost by

    ```SQL
    SHOW VARIABLES LIKE 'bind_address';
    ```

1. If it shows '127.0.0.1' or 'localhost', MySQL isn't accepting external connections. You'll have to follow these steps:

    - Find your MySQL configuration file (either `sudo nano /opt/homebrew/etc/my.cnf` or `sudo nano /etc/mysql/my.cnf`) and change the `bind-address = 127.0.0.1` inside into `bind-address = 0.0.0.0`.

    - Restart MySQL by `sudo mysql.server restart`.

1. create users for both the specific IP and a wildcard to be safe:

    ```SQL
    CREATE USER 'bytebase'@'172.17.0.2' IDENTIFIED BY 'testpwd1';
    GRANT ALL PRIVILEGES ON *.* TO 'bytebase'@'172.17.0.2';
    
    CREATE USER 'bytebase'@'%' IDENTIFIED BY 'testpwd1';
    GRANT ALL PRIVILEGES ON *.* TO 'bytebase'@'%';

    FLUSH PRIVILEGES;
    EXIT;
    ```

Now that the configuration is done, exit MySQL and go on following [the guide to add data source](/database-instance/README.md#add-data-source).
