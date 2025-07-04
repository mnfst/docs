---
id: webhooks
title: Webhooks
description: Send requests to third-party applications using Manifest webhooks. Choose URL, method and send custom headers.
---

# Webhooks

## Introduction

**Webhooks** are a way for an app to send automated real-time notifications to another app when a specific [event](./webhooks.md#hook-events) occurs. In Manifest, there are 6 predefined events where you can hook HTTP requests.

Webhooks are useful to connect other applications or to trigger a micro-service like notifying someone or updating a file.

## Syntax

```yaml title="manifest.yml"
entities:
  # You can attach one or several webhooks to each entity event.
  Cat 😺:
    properties:
      - name
    hooks:
      beforeCreate:
        - { url: 'https://my-webhook.com' }

  Dog 🐶:
    properties:
      - name
    hooks:
      afterDelete:
        # Pass .env variables with ${} interpolation.
        - {
            url: 'https://another-webhook.com',
            headers: { authorization: 'Bearer ${API_KEY}' }
          }
        # Specific HTTP method.
        - { url: 'https://another-one.com', method: 'PATCH' }
```

## Webhook params

You can pass arguments using the long syntax:

| Option      | Default | Type          | Description                                                                            |
| ----------- | ------- | ------------- | -------------------------------------------------------------------------------------- |
| **url\***   | -       | string        | The URL of your webhook                                                                |
| **method**  | `POST`  | _HTTP Method_ | The HTTP method of the request                                                         |
| **headers** | `{}`    | object        | Optional headers of the request. Use `${MY_DOTENV_VAR}` syntax to use dotenv variables |

Available HTTP Methods are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.

:::note

Manifest does not enforce HTTP request success or failure; the lifecycle process continues regardless.

:::

## Webhook body

Manifest attaches a **JSON body** with key information about the record concerned to the webhook HTTP request.

The main structure of the body of the triggered HTTP requests will remain the same and only the `record` value will change: on _before_ events the `record` will contain your payload, whereas in _after_ requests, the `record` value will reflect the item after the operation.

This is the structure of the body:

```json title="HTTP request body (content-type is application/json)"
{
  "event": "beforeUpdate",
  "createdAt": "2025-01-22T13:38:48.399Z",
  "entity": "posts",
  "record": {
    "title": "my title",
    "content": "my content"
  }
}
```

## Hook events

This is the list and description of the 6 hook events available. All of them are related to an [entity](./entities.md).

| Name             | Description              |
| ---------------- | ------------------------ |
| **beforeCreate** | Before creating a record |
| **afterCreate**  | After creating a record  |
| **beforeUpdate** | Before updating a record |
| **afterUpdate**  | After updating a record  |
| **beforeDelete** | Before deleting a record |
| **afterDelete**  | After deleting a record  |
