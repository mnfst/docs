---
id: endpoints
title: Custom Endpoints
description: Add your own endpoints for your custom logic with Manifest. Each endpoint triggers a handler file that has access to Manifest logic and data.
---

# Endpoints

## Introduction

A custom endpoint is a user-defined API route that executes specific logic on the backend. Unlike built-in routes, custom endpoints allow you to control how data is processed, retrieved, or modified in response to client requests.

For example, you can define an endpoint like `/competitors/:id/increase` that directly increments the score of a given competitor.

Custom endpoints in Manifest follow a simple structure where you define:

- **A path (path):** The URL where the endpoint can be accessed.
- **A method (method):** The type of HTTP request (GET, POST, etc.).
- **A handler (handler):** The JavaScript function that processes the request.

## Syntax

This is an example of a simple endpoint that returns a "Hello world from my new endpoint !" message when requesting `GET /endpoints/hello-world`.

```yaml title="manifest.yml"
endpoints:
  helloWorld:
    path: /hello-world
    method: GET
    handler: helloWorld
```

```js title="handlers/helloWorld.js"
module.exports = async (req, res) => {
  res.json({ message: 'Hello world from my new endpoint!' })
}
```

Manifest handlers are basically [ExpressJS middlewares](https://expressjs.com/en/guide/using-middleware.html) exposed with the [Manifest SDK](./crud.md#using-the-javascript-sdk) to help you work with your data.

Place the handler file in the `/handlers` folder. For example, if the handler is `helloWorld`, the file should be `helloWorld.js`.

:::tip

You can choose to set a different folder for handlers adding the `MANIFEST_HANDLERS_FOLDER` variable in your `.env` file.

:::

## Endpoint params

Each endpoint can be defined in the YAML file with the following values:

| Option          | Default | Type         | Description                                                                               |
| --------------- | ------- | ------------ | ----------------------------------------------------------------------------------------- |
| **path\***      | -       | string       | The path of your endpoint. Use the `:var` syntax for route params. Ex: `users/:id/upvote` |
| **method\***    | -       | _HttpMethod_ | The HTTP request method: "GET", "POST", "PATCH", "PUT" or "DELETE"                        |
| **handler\***   | -       | string       | The name of the handler function triggered                                                |
| **policies\***  | `[]`    | _Policy[]_   | The [access policies](./access-policies.md) that restrict the access of the endpoint      |
| **description** | -       | string       | Optional description for your endpoint                                                    |

## Manipulate data with the backend SDK

The next thing you may want to do is to **read and write data from your app**. This can be done using the Manifest backend SDK that shares the same CRUD and upload functions as the [JS SDK](./crud.md#using-the-javascript-sdk) for the front-end.

Take the following example of a `manifest.yml` file of a **leaderboard**:

```yaml title="manifest.yml"
name: Leaderboard app 🏅

entities:
  Competitor:
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

We can now add the handler in the `/handlers` folder:

```js title="/handlers/increaseScore.js"
module.exports = async (req, res, manifest) => {
  // Get the requested competitor with the Manifest backend SDK.
  const competitor = await manifest
    .from('competitors')
    .findOneById(req.params['id'])

  // Add 1 to the competitor score.
  const newScore = competitor.score + 1

  // Patch the record (changing only specified prop "score").
  await manifest.from('competitors').patch(competitor.id, {
    score: newScore
  })

  // Return updated score.
  res.json({ newScore })
}
```

The custom endpoint increases the score of a competitor. The path integrates an `id` route param that we can use as `req.params['id']` from our handler.

Note the third argument in our function. This is the Manifest backend SDK that allow you to do CRUD operations in your app using the same syntax as the [JS SDK](./crud.md#using-the-javascript-sdk).
