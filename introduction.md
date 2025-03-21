---
id: get-started
title: Get started
slug: /
---

# Manifest Documentation 👋

## Introduction

Manifest is a lightweight **Backend-as-a-Service** (BaaS) that fits into a single YAML file.

Key advantages:

- ⚡ Develop 10x faster comparing to traditional approaches
- 😎 Easy to read and version control for humans and AIs
- 🕊️ Self-hosted Free Open Source software

## Install Manifest

Follow the steps below to install Manifest in your local machine.

### Prerequisites

- [NodeJS](https://nodejs.org/en/) (**20.x** or superior).

### Installation steps

Run the following on your terminal from the **root of your project**:

```bash
npx add-manifest@latest
```

This will create a `manifest/backend.yml` file and add the required dependencies.

Then, serve the backend locally:

```
npm run manifest
```

You can now:
<br/> - See your **Admin panel** at http://localhost:1111 using the email `admin@manifest.build` and the password `admin`
<br/> - Use your **REST API** at http://localhost:1111/api

:::tip

If you already have a frontend app, you can run the `npx add-manifest` command from your **project root** to include it in your repo.

:::

#### Note with PNPM

As [PNPM](https://pnpm.io/fr/) blocks postinstall scripts, we have to adapt the `þackage.json`. Add this to your `package.json` file before doing `pnpm install`:

```json
  "pnpm": {
    "onlyBuiltDependencies": [
      "@nestjs/core",
      "sharp",
      "sqlite3"
    ]
  }
```
