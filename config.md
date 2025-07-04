---
id: config
title: Manifest Configuration
description: Configure Manifest Database (PostgreSQL, MySQL or SQLite), Port, OpenAPI and environments with a simple config.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Introduction

Manifest embraces the **convention over configuration** concept: it assumes several logical situations by default without showing you the setting to keep things as simple as possible.

Nevertheless there is still the possibility to adapt your Manifest app to your needs, especially through the `.env` file. Here is the list of available environment variables:

## General variables

General environment variables.

| Variable      | Default                             | Description                                                                                                                                                 |
| ------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV      | `development`                       | The app environment. For production and staging instances, it should be set to `production`, mostly to turn off live reload on file change.                 |
| PORT          | `1111`                              | The port of your app. You can either adapt your server settings to listen to `1111` or change here to your server's default (usually `3000`)                |
| BASE_URL      | `http://localhost:$PORT`            | The base url of your backend. Change it when deploying if you use [file or image upload](./upload.md)                                                       |
| OPEN_API_DOCS | `true` unless `NODE_ENV=production` | Determines whether the OpenAPI doc is shown (formerly Swagger) for your REST API at `/api`. Make sure to set to `true` if you want to display on production |

## Paths

Environment variables related to paths.

| Variable                 | Default         | Description                                                                                                                 |
| ------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| PUBLIC_FOLDER            | `/public`       | The public folder to show [static files](https://expressjs.com/en/starter/static-files.html)                                |
| MANIFEST_HANDLERS_FOLDER | `/handlers`     | The folder to put your handlers functions for [custom endpoints](./endpoints.md)                                            |
| MANIFEST_FILE_PATH       | `/manifest.yml` | The relative or absolute path of your Manifest YAML file                                                                    |
| TOKEN_SECRET_KEY         | `-`             | The secret key behind the JWT authentication. Required on production, you can [generate one here](https://jwtsecrets.com/). |

## Database

By default Manifest runs with [SQLite](https://www.sqlite.org/) to enable instant launch with the `npx add-manifest@latest` command.

We recommend switching to [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/) or its alternative [MariaDB](https://mariadb.org/) on production for more robustness and to choose from a large number of managed database providers.

| Variable      | Default                | Description                                                               | Applies To         |
| ------------- | ---------------------- | ------------------------------------------------------------------------- | ------------------ |
| DB_CONNECTION | `sqlite`               | Choose `postgres` switching to PostgreSQL or `mysql` for MySQL or MariaDB | All                |
| DB_PATH       | `/.manifest/db.sqlite` | Path of the database. Your server should have access to this path locally | SQLite             |
| DB_HOST       | `localhost`            | Database host                                                             | PostgreSQL / MySQL |
| DB_PORT       | `5432`                 | Database port                                                             | PostgreSQL / MySQL |
| DB_USERNAME   | `postgres`             | Database username                                                         | PostgreSQL / MySQL |
| DB_PASSWORD   | `postgres`             | Database password                                                         | PostgreSQL / MySQL |
| DB_DATABASE   | `manifest`             | Database name                                                             | PostgreSQL / MySQL |
| DB_SSL        | `false`                | Require SSL for DB connection. Set to true if using remote DB.            | PostgreSQL / MySQL |

### Example configurations

Here are examples of `.env` files for different database connections:

<Tabs>
  <TabItem value="sqlite" label="SQLite" default>
   ```env

    DB_CONNECTION=sqlite

    DB_PATH=/.manifest/db.sqlite

    ```

  </TabItem>
  <TabItem value="postgresql" label="PostgreSQL" default>
   ```env

    DB_CONNECTION=postgres

    DB_HOST=my-host.com
    DB_USERNAME=owner
    DB_PASSWORD=xxxxx
    DB_DATABASE=my_app
    DB_SSL=true # Required for remote managed DBs, remove if local

    ```

  </TabItem>
   <TabItem value="mysql" label="MySQL / MariaDB" default>
    ```env

    DB_CONNECTION=mysql

    DB_USERNAME=xxxxx
    DB_PASSWORD=xxxxx
    DB_HOST=my-host.com
    DB_PORT=25060
    DB_DATABASE=my_app
    DB_SSL=true # Required for remote managed DBs, remove if local

    ```

  </TabItem>
</Tabs>

## Integrating Manifest

**Manifest has been designed to be easily integrated**, providing a simple yet complete backend to any tool. See how it runs on [Stackblitz](https://manifest.new) for example.

The backend fits in an [NPM Package](https://www.npmjs.com/package/manifest) that you can add to your dependencies simply by running `npm install manifest`. By default, Manifest uses [SQLite](https://www.sqlite.org/), the n°1 file-based database. This means it’s portable and doesn’t require any kind of server to run.

If you plan to run Manifest on a **mounted drive** like most cloud editors do, add the `--mountedDrive` argument to the run command to prevent [watcher errors](https://github.com/remy/nodemon?tab=readme-ov-file#application-isnt-restarting):

```
npm run start -- --mountedDrive
```
