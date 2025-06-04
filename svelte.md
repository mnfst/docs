---
id: svelte
---

# Quick start with Svelte

Give a proper backend to your Svelte app.

:::warning

This quick start guide focuses exclusively on the **frontend**. To ensure the functionality of this code, your Manifest backend must be [up and running](./introduction.md#install-manifest) at `http://localhost:1111`.

:::

# 1. Create a Svelte app

If you already have a Svelte app running, you can skip this step.

There are several ways to do that. In our example we use [SvelteKit](https://kit.svelte.dev/) to generate a pre-configured Svelte app, you . You can replace `my-client` by the name of your front-end app.

```
npm create svelte@latest my-client
cd my-client
npm install
npm run dev -- --open
```

# 2. Install Manifest SDK

Install the JS SDK from the root of your Svelte app.

```
npm i @mnfst/sdk
```

# 3. Use it in your app

In that example we are using a Cat entity [created previously](entities.md). Replace it by your own entity. This example uses TypeScript, you can remove the typing to have plain JS.

```js title="src/routes/+page.svelte"


<script lang="ts">
  import Manifest from "@mnfst/sdk";
  import { onMount } from "svelte";

  interface Cat {
    id: string;
    name: string;
    type: string;
    image: string;
  }

  let cats: Cat[] = [];

  onMount(async () => {
    const manifest = new Manifest();
    const result = await manifest.from("cats").find<Cat>();
    cats = result.data;
  });
</script>

<div class="main">
  <ul>
    {#each cats as cat}
      <li>{cat.name}</li>
    {/each}
  </ul>
</div>
```

Checkout the [SDK doc](./crud.md#using-the-javascript-sdk) to see more usages of the SDK: CRUD operations, file upload, authentication,
