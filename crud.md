---
id: crud
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CRUD operations

## Introduction

Once you created your [entities](./entities.md), you probably want to interact with them. It is easy to connect your client to your Manifest backend.

Manifest provides out-of-the-box CRUD endpoints through the **REST API** or the **JS SDK**.

:::info

By default CRUD endpoints are private, only accessible for logged-in **admin** users. You can open them to the public using [policies](./access-policies.md).

:::

## Using the REST API

Manifest exposes a REST API for CRUD operations. The **OpenAPI** documentation is automatically generated on http://localhost:1111/api. Have a look!

For CRUD endpoints, this prefix is followed by `collections` for [collections entities](#collections) and `singles` for [single entities](#singles) and by the slug of your entity (you can change it in the [entity params](entities.md#entity-params))

Examples:

- `http://localhost:1111/api/collections/cats` gets the list of the cats
- `http://localhost:1111/api/singles/home-content` gets the home content

:::tip

In addition to **CRUD endpoints** that are generated automatically, you also can create your own [custom endpoints](./endpoints.md) to add your custom logic.

:::

## Using the JavaScript SDK

The **Manifest JS SDK** is used to fetch and manipulate your data from your JS client using an elegant and human-friendly interface.

The SDK can be integrated in any frontend stack app like [React](./react.md), [Vue](./vue.md), [Svelte](./svelte.md), [Astro](./astro.md), [Angular](./angular.md).... Or even by another server using NodeJS!

Install it via the terminal:

```bash
npm i @mnfst/sdk
```

Use the SDK directly in your favorite frontend:

```js title="Example SDK usage"
import Manifest from '@mnfst/sdk'

// Initialize client with default backend URL: http://localhost:1111.
const manifest = new Manifest()

// Initialize client with custom base URL.
const manifest = new Manifest('https://example.com')

// Perform CRUD operations...
const cats = await manifest.from('cats').find()
```

## Collections

The following CRUD operations can be done on [collections](./entities.md#collections) entities. A collection is a list of items that share a similar schema.

### Get a list of items

This operation will fetch a list of items from a collection.
<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `GET /api/collections/:slug`

```http title="Example HTTP Request"
GET /api/collection/users
```

```json title="Example HTTP Response"
{
  "data": [
    {
      "id": "2c4e6a8b-0d1f-4357-9ace-bdf024681357",
      "name": "Lara"
    },
    {
      "id": "e4d5c6b7-a890-4123-9876-543210fedcba",
      "name": "Karl"
    }
  ],
  "currentPage": 1,
  "lastPage": 1,
  "from": 1,
  "to": 10,
  "total": 3,
  "perPage": 10
}
```

**List filters**

You can filter by [property](./entities.md#properties) to refine the list of items. Use suffix to pass logic to it:

| Suffix     | Description           | Example                    |
| ---------- | --------------------- | -------------------------- |
| **\_eq**   | equals                | `isActive_eq=true`         |
| **\_neq**  | not equals            | `name_neq=alice`           |
| **\_gt**   | greater than          | `birthdate_gt=2020-01-01 ` |
| **\_gte**  | greater than or equal | `age_gte=4`                |
| **\_lt**   | less than             | `amount_lt=400`            |
| **\_lte**  | less than or equal    | `amount_lte=400`           |
| **\_like** | like                  | `name_like=%bi%`           |
| **\_in**   | included in           | `customer_in=1,2,3`        |

**Pagination**

All list requests are paginated by default. Just use the `page` parameter to choose your page and the `perPage` param if you want to change the number of items per page.

| Param       | Description                      | Example      |
| ----------- | -------------------------------- | ------------ |
| **page**    | The number of the page requested | `page=3`     |
| **perPage** | The number of items of each page | `perPage=40` |

**Order**

Order your list by a defined property. By default the results are ordered by `id` in a `DESC` order and thus shows the new ones first.

| Param       | Description                                | Example       |
| ----------- | ------------------------------------------ | ------------- |
| **orderBy** | The name of property you want to order by. | `orderBy=age` |
| **order**   | Ascending 'ASC' or Descending 'DESC'       | `order=DESC`  |

  </TabItem>
  <TabItem value="sdk" label="JS SDK" default>
    ```js title="Example SDK usage"
    // Get all users.
    const users = await manifest.from('users').find()

    console.log(users);
    // Output: {
    //   "data": [
    //     {
    //       "id": 'e4d5c6b7-a890-4123-9876-543210fedcba',
    //       "name": "Lara"
    //     },
    //     {
    //       "id": '2c4e6a8b-0d1f-4357-9ace-bdf024681357',
    //       "name": "Karl"
    //     }
    //   ],
    //   "currentPage": 1,
    //   "lastPage": 1,
    //   "from": 1,
    //   "to": 10,
    //   "total": 3,
    //   "perPage": 10
    // }
    ```

**List filters**

You can filter by [property](./entities.md#properties) to refine the list of items. Use the `where()` function with the correct operator to do it.

```js title="Example SDK list filtering"
const cats = await manifest
  .from('cats')
  .where('breed = siamese')
  .andWhere('active = true')
  .andWhere('birthDate > 2020-01-01')
  .find()
```

**Filter operators**

| Operator | Description           | Example                            |
| -------- | --------------------- | ---------------------------------- |
| **=**    | equals                | `.where('isActive = true')`        |
| **!=**   | not equals            | `.where('name != alice')`          |
| **>**    | greater than          | `.where('birthdate > 2020-01-01')` |
| **>=**   | greater than or equal | `.where('age >= 4')`               |
| **\<**   | less than             | `.where('amount < 400')`           |
| **\<=**  | less than or equal    | `.where('amount <= 400')`          |
| **like** | like                  | `.where('name_like=%bi%')`         |
| **in**   | included in           | `.where('customer_in=1,2,3')`      |

**Pagination**

All list requests are paginated by default. Just use the `page` parameter to chose your page and the `perPage` param if you want to change the number of items per page.

```js title="Example SDK list pagination"
const cats = await manifest.from('cats').find({ page: 1, perPage: 10 })
```

**Order**

Order your list by a defined property. By default the results are ordered by `id` in a `DESC` order and thus shows the new ones first.

```js title="Example SDK order"
// Order cats.
const cats = await manifest.from('cats').orderBy('age', { desc: true }).find()
```

  </TabItem>
</Tabs>

### Get a single item

This operation will fetch a single item based on its ID.

<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `GET /api/collections/:slug/:id`

    ```http title="Example HTTP Request"
    GET /api/collections/cats/2c4e6a8b-0d1f-4357-9ace-bdf024681357
    ```

    ```json title="Example HTTP Response"
    {
      "name": "Mina",
      "description": "A really cute cat"
    }
    ```

  </TabItem>
  <TabItem value="sdk" label="JS SDK" default>
    ```js title="Example SDK usage"
    // Get cat with ID 2c4e6a8b-0d1f-4357-9ace-bdf024681357
    const cat = await manifest.from('cats').findOneById('2c4e6a8b-0d1f-4357-9ace-bdf024681357')

    console.log(cat);
    // Output: {
    //  name: "Mina",
    //  description: "A really cute cat"
    // }
    ```

  </TabItem>
</Tabs>

### Create a new item

This operation will create a new item and store it in the database. The newly created item is returned as response.
<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `POST /api/collections/:slug`

    ```http title="Example HTTP Request"
    POST /api/collections/pokemons
    Content-Type: application/json
    Body:
    {
      "name": "Pikachu",
      "type": "electric",
      "level": 3,
    }

    ```

    ```json title="Example HTTP Response"
    {
      "id": '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      "name": "Pikachu",
      "type": "electric",
      "level": 3,
    }
    ```

  </TabItem>
  <TabItem value="sdk" label="JS SDK" default>
    ```js title="Example SDK usage"
    // Create a new item in the "pokemons" entity.
    const newPokemon = await manifest.from('pokemons').create({
      name: "Pikachu",
      type: "electric",
      level: 3,
    })

    console.log(newPokemon);
    // Output: {
    //  id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    //  name: "Pikachu",
    //  type: "electric",
    //  level: 3
    // }
    ```

  </TabItem>
</Tabs>

### Update an item

This operation will replace an existing item by the payload provided in the request and returns the updated item.

Unlike [partial updates](#patch-an-item), this operation will replace the whole item by the new one. Missing or empty properties will delete the previous ones.

<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `PUT /api/collections/:slug/:id`

    ```http title="Example HTTP Request"
    PUT /api/collections/pokemons/6ba7b810-9dad-11d1-80b4-00c04fd430c8
    Content-Type: application/json
    Body:
    {
      "name": "Raichu",
      "type": "electric",
      "level": 8
    }

    ```

    ```json title="Example HTTP Response"
    {
      "id": '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      "name": "Raichu",
      "type": "electric",
      "level": 8
    }
    ```

  </TabItem>
  <TabItem value="sdk" label="JS SDK" default>
    ```js title="Example SDK usage"
    // Updates the Pokemon item with ID a1b2c3d4-e5f6-4789-abcd-ef0123456789.
    const newPokemon = await manifest.from('pokemons').update('a1b2c3d4-e5f6-4789-abcd-ef0123456789', {
      name: "Raichu",
      type: "electric",
      level: 8,
    })

    console.log(newPokemon);
    // Output: {
    //  id: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
    //  name: "Raichu",
    //  type: "electric",
    // level: 8
    // }
    ```

  </TabItem>
</Tabs>

### Patch an item

This operation will partially replace an existing item and return the updated item.

Unlike [fully replacement](#update-an-item), this operation will only modify the properties provided in the payload and leave the other ones as they are.
<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `PATCH /api/collections/:slug/:id`

    ```http title="Example HTTP Request"
    PATCH /api/collections/pokemons/a1b2c3d4-e5f6-4789-abcd-ef0123456789
    Content-Type: application/json
    Body:
    {
      "level": 5,
    }
    ```

    ```json title="Example HTTP Response"
    {
      "id": 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
      "name": "Pikachu",
      "type": "electric",
      "level": 5
    }
    ```

 </TabItem>
 <TabItem value="sdk" label="JS SDK" default>
    ```js title="Example SDK usage"
    // Patches the Pokemon item with ID a1b2c3d4-e5f6-4789-abcd-ef0123456789.
    const newPokemon = await manifest.from('pokemons').patch('a1b2c3d4-e5f6-4789-abcd-ef0123456789', {
      level: 5
    })

    console.log(newPokemon);
    // Output: {
    //  id: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
    //  name: "Pikachu",
    //  type: "electric",
    //  level: 5
    }
    ```

</TabItem>
</Tabs>

### Delete an item

This operation will delete permanently an item from the database. This is an irreversible action. The deleted item is returned in the response.

<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `DELETE /api/collections/:slug/:id`

```http title="Example HTTP Request"
DELETE api/collections/cats/550e8400-e29b-41d4-a716-446655440000

```

```json title="Example HTTP Response"
{
  "name": "Fido",
  "description": "A cute black cat"
}
```

 </TabItem>
 <TabItem value="sdk" label="JS SDK" default>
   ```js title="Example SDK usage"
    // Delete the cat with ID 550e8400-e29b-41d4-a716-446655440000
.
    const deletedCat = await manifest.from('cats').delete('550e8400-e29b-41d4-a716-446655440000')

    console.log(deletedCat);
    // Output: {
    //  name: "Fido",
    // description: "A cute black cat"
    // }
    ````

</TabItem>
</Tabs>

## Singles

The following operations can be done on [singles](./entities.md#singles) entities. As there is only a single item per entity, there is no list-related operations, and single items cannot be deleted as we always want to return an object, even if empty.

### Get a single item

<Tabs>
<TabItem value="rest" label="REST API" default>
  **Request URL**: `GET /api/singles/:slug`

```http title="Example HTTP Request"
GET /api/singles/homepage
```

```json title="Example HTTP Response"
{
  "title": "My title",
  "description": "Welcome to my website!"
}
```

 </TabItem>
 <TabItem value="sdk" label="JS SDK" default>
   ```js title="Example SDK usage"
    // Get the homepage entity.
    const homepage = await manifest.single('homepage').get()

    console.log(homepage);
    // Output: {
    //  title: "My title",
    //  description: "Welcome to my website!"
    // }
    ````

</TabItem>
</Tabs>

### Update an item

This operation will replace an existing item by the payload provided in the request. Unlike [partial updates](#patch-an-item-1), this operation will replace the whole item by the new one. Missing or empty properties will delete the previous ones.
<Tabs>
<TabItem value="rest" label="REST API" default>
**Request URL**: `PUT /api/singles/:slug`

```http title="Example HTTP Request"
PUT /api/singles/homepage
Content-Type: application/json
Body:
{
  "title": "My new title",
  "description": "My new description"
}

```

```json title="Example HTTP Response"
{
  "title": "My new title",
  "description": "My new description"
}
```

 </TabItem>
 <TabItem value="sdk" label="JS SDK" default>
   ```js title="Example SDK usage"
   // Update single entity.
   const newHomepage = await manifest.single('homepage').update({
       title: 'My new title',
       description: 'My new description'
   })

    console.log(newHomepage);
    // Output: {
    //  title: "My new title",
    //  description: "My new description"
    // }
    ```

</TabItem>
</Tabs>

### Patch an item

This operation will partially replace an existing item. Unlike [fully replacement](#update-an-item-1), this operation will only modify the properties provided in the payload an leave the other ones as they are.

<Tabs>
<TabItem value="rest" label="REST API" default>
  **Request URL**: `PATCH /api/singles/:slug`

```http title="Example HTTP Request"
PATCH /api/singles/homepage
Content-Type: application/json
Body:
{
  "title": "My new title",
}
```

```json title="Example HTTP Response"
{
  "title": "My new title",
  "description": "Welcome to my website!"
}
```

 </TabItem>
 <TabItem value="sdk" label="JS SDK" default>

```js title="Example SDK usage"
// Update single entity partially.
const homepage = await manifest.single('homepage').patch({
  title: 'My new title'
})
console.log(homepage)
// Output: {
//  title: "My new title",
//  description: "Welcome to my website!"
// }
```

</TabItem>
</Tabs>

## Work with relations

If you added [relationships](./entities.md#relations) between your entities, you probably want to include them in the CRUD operations.

### Load relations

You can specify which relations you want to load with your entities in your query. **Eager relations** are loaded automatically.

<Tabs>
  <TabItem value="sdk" label="JS SDK" default>
    ```js
      // Fetch entities with 2 relations.
      const cities = await manifest
        .from('cities')
        .with(['region', 'mayor'])
        .find()

      // Fetch nested relations.
      const cities = await manifest
        .from('cities')
        .with(['region', 'region.country', 'region.country.planet'])
        .find()
    ```

  </TabItem>
  <TabItem value="rest" label="REST API" default>
    ```http

    // Fetch entities with 2 relations.
    GET http://localhost:1111/api/dynamic/city?relations=region,mayor

    // Fetch nested relations.
    GET http://localhost:111/api/dynamic/city?relations=region,region.country,region.country.planet
    ```

  </TabItem>
</Tabs>

### Filter by relation

Once the relation is loaded, you can also filter items by their relation id or properties.

<Tabs>
  <TabItem value="sdk" label="JS SDK" default>
    ```js
      // Get all cats that belong to owner with id 3f2504e0-4f89-11d3-9a0c-0305e82c3301.
      const cats = await manifest
        .from('cats')
        .with(['owner'])
        .where('owner.id = 3f2504e0-4f89-11d3-9a0c-0305e82c3301')
        .find()

      // Get all cats that have an owner with name "Jorge".
      const cats = await manifest
        .from('cats')
        .with(['owner'])
        .where('owner.name = Jorge')
        .find()
    ```

  </TabItem>
  <TabItem value="rest" label="REST API" default>
    ```http
    // Get all cats that belong to owner with id 3f2504e0-4f89-11d3-9a0c-0305e82c3301.
    GET http://localhost:1111/api/dynamic/cats?relations=owner&owner.id_eq=3f2504e0-4f89-11d3-9a0c-0305e82c3301

    // Get all cats that have an owner with name "Jorge".
    GET http://localhost:1111/api/dynamic/cats?relations=owner&owner.name_eq=Jorge
    ```

  </TabItem>
</Tabs>

### Store relations

To store or update an item with its relations, you have to pass the relation id(s) as a property that end with **Id** for many-to-one and **Ids** for many-to-many like `companyId` or `tagIds`

<Tabs>

  <TabItem value="rest" label="REST API" default>
    ```http
    // Store a new player with relations Team and Skill.
    POST http://localhost:1111/api/dynamic/players
    Content-Type: application/json
    {
        "name": "Mike",
        "teamId": 'e4d5c6b7-a890-4123-9876-543210fedcba',
        "skillIds": ['12345678-1234-5678-9abc-123456789012', '3f2504e0-4f89-11d3-9a0c-0305e82c3301']
    }
    ```

  </TabItem>
    <TabItem value="sdk" label="JS SDK" default>
    ```js
      // Store a new player with relations Team and Skill.
      const newPlayer = await manifest.from('players').create({
        name: 'Mike',
        teamId: 'e4d5c6b7-a890-4123-9876-543210fedcba',
        skillIds: ['12345678-1234-5678-9abc-123456789012', '3f2504e0-4f89-11d3-9a0c-0305e82c3301']
      })
    ```

  </TabItem>
</Tabs>

:::note

When storing **many-to-many** relations, you always need to **pass an array**, even if you just have one single value.

:::

### Update relations

As for updating properties, you can either do a **full replacement** using the update function (PUT) or a **partial replacement** using the patch function (PATCH).

<Tabs>
  <TabItem value="rest" label="REST API" default>
    ```http
    // Replaces the whole skill relations by the new skillIds array.
    PUT http://localhost:1111/api/dynamic/players/e4d5c6b7-a890-4123-9876-543210fedcba
    Content-Type: application/json
    {
      name: 'Mike',
      teamId: 'e4d5c6b7-a890-4123-9876-543210fedcba',
      skillIds: ['12345678-1234-5678-9abc-123456789012', '3f2504e0-4f89-11d3-9a0c-0305e82c3301']
    }

    // Updates the team without changing the skills or the name.
    PATCH http://localhost:1111/api/dynamic/players/e4d5c6b7-a890-4123-9876-543210fedcba
    Content-Type: application/json
    {
      teamId: '9b2fff23-ec93-4b48-9322-bbd4b6b5b123',
    }
    ```

  </TabItem>
  <TabItem value="sdk" label="JS SDK" default>
    ```js
      // Replaces the whole skill relations by the new skillIds array.
      await manifest.from('players').update('e4d5c6b7-a890-4123-9876-543210fedcba', {
        name: 'Mike',
        teamId: 'e4d5c6b7-a890-4123-9876-543210fedcba',
        skillIds: ['12345678-1234-5678-9abc-123456789012', '3f2504e0-4f89-11d3-9a0c-0305e82c3301']
      })

      // Updates the team without changing the skills or the name.
      await manifest.from('players').patch('e4d5c6b7-a890-4123-9876-543210fedcba', {teamId: '9b2fff23-ec93-4b48-9322-bbd4b6b5b123'})
    ```

  </TabItem>

</Tabs>
