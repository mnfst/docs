---
id: javascript-sdk
---

# JavaScript SDK

Use the **Manifest JS SDK** to fetch and manipulate your data from your JS client.

The SDK can be integrated in any frontend stack app like React, Vue, Svelte.... Or even by another server using NodeJS!

## Install

Install it via the terminal:

```bash
npm i @mnfst/sdk
```

Use the SDK directly in your favorite frontend:

```js
import Manifest from '@mnfst/sdk'

// Initialize client with default backend URL: http://localhost:1111.
const manifest = new Manifest()

// Initialize client with custom base URL.
const manifest = new Manifest('https://example.com')
```

## CRUD operations

Perform all CRUD (Create Read Update Delete) operations with the SDK.

```js
// Get all cats.
const cats = await manifest.from('cats').find()

// Get paginated cats.
const cats = await manifest.from('cats').find({ page: 1, perPage: 10 })

// Typed.
const cats: Cat[] = await manifest.from('cats').find<Cat>()

// Get a filtered list of cats.
const cats = await manifest
  .from('cats')
  .where('breed = siamese')
  .andWhere('active = true')
  .andWhere('birthDate > 2020-01-01')
  .find()

// Order cats.
const cats = await manifest
  .from('cats')
  .orderBy('age', { desc: true })
  .find()

// Load relations (eager relations are loaded automatically).
const cats = await manifest
  .from('cats')
  .with(['owner', 'owner.team', 'owner.team.manager'])
  .find()

// Filter by relations.
const cats = await manifest
  .from('cats')
  .with(['owner', 'store']) // Load relation first if not eager.
  .where(`owner.id in 1,2,3`)
  .andWhere(`store.name = CatLand`)
  .find()

// Create a cat.
const newCat = await manifest.from('cats').create({
  name: 'Milo',
  age: 2
})

// Update a cat.
const updatedCat = await manifest.from('cats').update(1, {
  name: 'updated name',
  age: 2
})

// Delete a cat.
await manifest.from('cats').delete(1)

// Get single entity.
const homeContent = await manifest.single('home').get()

// Update single entity.
await manifest.single('about').update({
  title: 'New about us title'
})

```

:::info

When filtering, you have access to the following operators: `=`, `!=`, `>`, `>=`, `<`, `<=`, `like` and `in`.

:::

## Get started with your favorite front-end framework

See the following quick start guides to integrate Manifest with popular front-end frameworks:

- [Get started with Angular](angular.md)
- [Get started with Astro](astro.md)
- [Get started with React](react.md)
- [Get started with Svelte](svelte.md)
- [Get started with Vue](vue.md)
