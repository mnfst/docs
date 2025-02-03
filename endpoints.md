---
id: endpoints
title: Endpoints
---

# Endpoints

You can add your own **custom endpoints** that will execute a handler function in **JavaScript** (.js file). Handlers are simple [ExpressJS](https://expressjs.com/) middlewares with an extra touch.

## Syntax

This is an example of a simple endpoint that returns a "hello world" message when requesting `GET /endpoints/hello-world`.

```yaml title="manifest/backend.yml"
endpoints:
  helloWorld:
    path: /hello-world
    method: GET
    handler: helloWorld
```

```js title="manifest/handlers/helloWorld.js"
module.exports = async (req, res) => {
  res.json({ message: 'Hello world from my new endpoint !' })
}
```

In the YAML file, we choose the path, method and handler.

A Handler in **JS** needs to be created in the `/manifest/handlers` folder with the name specified as "handler", in our case `helloWorld.js`.

**Manifest handlers** are just [ExpressJS middlewares](https://expressjs.com/en/guide/using-middleware.html) exposed with `Request` and `Response` params.

:::tip

You can choose to set a different folder for handlers adding the `MANIFEST_HANDLERS_FOLDER` variable in your `.env` file.

:::

## Endpoint params

Each endpoint can be defined in the YAML file with the following values:

| Option          | Default | Type         | Description                                                                                   |
| --------------- | ------- | ------------ | --------------------------------------------------------------------------------------------- |
| **path\***      | -       | string       | The path of your endpoint. Use the `:var` syntax for route params. Ex: `users/:id/upvote`     |
| **method\***    | -       | _HttpMethod_ | The HTTP request method: "GET", "POST", "PATCH", "PUT" or "DELETE"                            |
| **handler\***   | -       | string       | The name of the handler function triggered                                                    |
| **policies\***  | `[]`    | _Policy[]_   | The [access policies](./policies.md#access-policies) that restrict the access of the endpoint |
| **description** | -       | string       | Optional description for your endpoint                                                        |

## Manipulate data with the backend SDK

The next thing you may want to do is to **read and write data from your app**. This can be done using the Manifest backend SDK that shares the same CRUD and upload functions as the [JS SDK](http://localhost:3000/docs/javascript-sdk) for the front-end.

Take the following example of a backend.yml file of a **leaderboard**:

```yaml title="manifest/backend.yml"
name: Leaderboard app 🏅

entities:
🏆 Competitor:
  properties:
    - name
    - { name: score, type: number }

endpoints:
  increaseScore:
    description: Adds 1 to the competitor score.
    path: /competitors/:id/increase
    method: POST
    handler: increaseScore
```

We can now add the handler in the `/manifest/handlers` folder:

```js title="manifest/handlers/increaseScore.js"
module.exports = async (req, res, manifest) => {
  // Get the requested competitor with the Manifest backend SDK.
  const competitor = await manifest
    .from('competitors')
    .findOneById(req.params['id'])

  // Add 1 to the competitor score.
  const newScore = score + 1

  // Patch the record (changing only specified prop "score").
  await manifest.from('competitors').patch(competitor.id, {
    score: newScore
  })

  // Return updated score.
  res.json({ newScore })
}
```

The custom endpoint increases the score of a competitor. The path integrates an `id` route param that we can use as `req.params['id']` from our handler.

Note the third argument in our function. This is the Manifest backend SDK that allow you to do CRUD operations in your app using the same syntax as the [JS SDK](./javascript-sdk.md#crud-operations).
