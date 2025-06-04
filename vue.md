---
id: vue
---

# Quick start with Vue

Give a proper backend to your Vue.js app.

:::warning

This quick start guide focuses exclusively on the **frontend**. To ensure the functionality of this code, your Manifest backend must be [up and running](./introduction.md#install-manifest) at `http://localhost:1111`.

:::

# 1. Create a Vue app

If you already have a Vue app running, you can skip this step.

We are using Vue.js v3 in this tutorial. You can replace `my-client` by the name of your front-end app

```
npm create vue@latest
cd my-client // If you called your app "my-client" when asked in the previous step
npm install
npm run dev
```

# 2. Install Manifest SDK

Install the JS SDK from the root of your Vue app.

```
npm i @mnfst/sdk
```

# 3. Use it in your app

In that example we are using a Cat entity [created previously](entities.md). Replace it by your own entity. This example uses TypeScript, you can remove the typing to have plain JS.

```js
<script lang="ts">
import Manifest from "@mnfst/sdk";

interface Cat {
  id: string;
  name: string;
  type: string;
  image: string;
}

export default {
  data() {
    return {
      cats: [] as Cat[],
    };
  },
  mounted() {
    this.fetchCat();
  },
  methods: {
    async fetchCat() {

      // Init SDK
      const manifest = new Manifest();

      // Fetch Cats from the backend.
      manifest.from("cats")
        .find<Cat>()
        .then((res) => {
          // Store the response in the "cats" array
          this.cats = res.data;
        });
    },
  },
};
</script>

<template>
    <ul>
        <li v-for="cat of cats">{{ cat.name }}</li>
    </ul>
</template>


```

Checkout the [SDK doc](./crud.md#using-the-javascript-sdk) to see more usages of the SDK.,
