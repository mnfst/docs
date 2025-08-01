---
id: get-started
title: Introduction
slug: /
description: Manifest is an Open Source backend that fits in a single YAML file. Easy to edit, validate and version for humans and LLMs.
---

# Manifest Documentation 👋

## Introduction

Manifest is a **backend** designed for developers using **AI coding tools** like [Cursor](https://www.cursor.com/), [Copilot](https://github.com/features/copilot) or [Windsurf](https://windsurf.com/).

If you’ve been using AI tools to build your app or website, you already know the truth: Generating a frontend is easy, but building the backend is still a mess.

With **Manifest**, you define your entire backend in a single YAML file. It can be generated and edited by both humans and LLMs.

Key advantages:

- 🤖 Fits naturally into AI-assisted coding
- 🔒 Easy to edit, validate and version.
- 🗄️ Data, logic, storage, essentials features and an admin panel
- 🧠 Reduce LLM token usage by up to 90%

## Install Manifest

Follow the steps below to install Manifest in your local machine.

### Prerequisites

- [NodeJS](https://nodejs.org/en/) (**20.x** or superior).

### Installation steps

Run this command to create a Manifest project ready to use with Cursor IDE.

```bash
# NPX
npx create-manifest@latest my-project --cursor

# Yarn
yarn create manifest my-project --cursor
```

This will create a `my-project` folder with a Manifest backend configured for Cursor.

You can replace `--cursor` with another option if you're using a different AI tool;

- `--copilot` if you're using **GitHub Copilot**
- `--windsurf` for **Windsurf**
- or remove it entirely if you're not using any AI coding tool

To start the Manifest backend, run the following command in the new project folder:

```
cd my-project
npm run start
```

You can now:
<br/> - See your **Admin panel** at http://localhost:1111 using the email `admin@manifest.build` and the password `admin`
<br/> - Use your **REST API** at http://localhost:1111/api

:::tip

If you already have a frontend app, you can run the `npx add-manifest` command from your **project root** to include it in your repo.

:::

#### Note with PNMP

As [PNPM](https://pnpm.io/fr/) blocks postinstall scripts, we have to adapt the `package.json`. Add this to your `package.json` file before doing `pnpm install`:

```json
  "pnpm": {
    "onlyBuiltDependencies": [
      "@nestjs/core",
      "sharp",
      "sqlite3"
    ]
  }
```
