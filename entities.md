---
id: entities
title: Entities
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Entities

## Introduction

An entity is a model of objects linked to real-world concepts. Creating an entity in manifest generates **CRUD endpoints** that can be used by the [REST API](./crud.md#using-the-rest-api) or the [SDK](./crud.md#using-the-javascript-sdk).

All entities are located in the `backend.yml` file under the **entities** property.

There are 2 types of entities in Manifest: [Collections](#collections) and [Singles](#singles). **Collections** are multiple instances of similar data, stored as a list. E.g., users, customers, videos, etc. Singles are unique, standalone data that are singular in nature. E.g., home content, about content, settings, logo...

## Collections

Let's see a simple example:

```yaml title="manifest/backend.yml"
name: A pet app

entities:
  Cat 😺:
    properties:
      - name
  Dog 🐶:
    properties:
      - name
```

This file will generate the **Cat** and **Dog** entity both with a `name` property. In Manifest by default all entities have an **id** (UUID format) so you do not need to add it. They also have automatic **createdAt** and **updatedAt** columns that are not selected by default in the API requests.

You can now add your own pets through the admin panel!

To generate dummy data for all your entities, run the simple command:

```
npm run manifest:seed
```

:::warning

The seed replaces the previous data by the new one and thus should never be used in production.

:::

### Entity params

You can pass different arguments to configure your entities. Example:

```yaml
entities:
  Member 👤:
    seedCount: 200
    mainProp: lastName
    properties:
      - firstName
      - lastName
      - email
```

| Option            | Default                    | Type     | Description                                                                                              |
| ----------------- | -------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| **authenticable** | false                      | boolean  | Whether the entity is [authenticable](auth.md#authenticable-entities) or not                             |
| **mainProp**      | _first string field_       | string   | Identifier prop. Used widely on the admin panel                                                          |
| **nameSingular**  | _singular lower case name_ | string   | The singular lowercase name of your entity. Used widely on the admin panel.                              |
| **namePlural**    | _plural lower case name_   | string   | The plural lowercase name of your entity. Used widely on the admin panel Default: plural lowercase name. |
| **policies**      | -                          | Policies | The [access control policies](./auth.md#access-policies) of your entity                                  |
| **properties**    | `[]`                       | Array    | The [properties](./entities.md#properties) of your entity                                                |
| **seedCount**     | `50`                       | number   | the number of entities to seed when running the seed command.                                            |
| **slug**          | _plural dasherized name_   | string   | The kebab-case slug of the entity that will define API endpoints.                                        |

## Singles

Single entities differ a bit from [collections](#collections). A single entity is **singular in nature**, and there can be only one record of them. Examples are website dynamic elements, pages, standalone content or settings. They do not have [relations](./entities.md#relations).

On single entities **Create** and **Delete** CRUD actions are disabled. Thus, the [REST API endpoints for single entities](./crud.md#singles) are different.

```yaml
ContactPage:
  single: true
  slug: contact
  properties:
    - { name: title, type: string }
    - { name: content, type: text }
    - { name: image, type: image }
  validation:
    title: { required: true }
```

You can generate dummy data for all your entities with the simple command:

```
npm run manifest:seed
```

### Entity params

You can pass different arguments to configure your single entities. Example:

```yaml
entities:
  Member 👤:
    seedCount: 200
    mainProp: lastName
    properties:
      - firstName
      - lastName
      - email
```

| Option           | Default                    | Type     | Description                                                                 |
| ---------------- | -------------------------- | -------- | --------------------------------------------------------------------------- |
| **nameSingular** | _singular lower case name_ | string   | The singular lowercase name of your entity. Used widely on the admin panel. |
| **policies**     | -                          | Policies | The [access control policies](./auth.md#access-policies) of your entity     |
| **properties**   | `[]`                       | Array    | The [properties](./entities.md#properties) of your entity                   |
| **slug**         | _plural dasherized name_   | string   | The kebab-case slug of the entity that will define API endpoints.           |

---

id: properties
title: Properties

---

## Properties

Properties are the characteristics of your [entities](./entities.md). For example, a **Product** can have properties like `name`, `description`, `price`...

### Syntax

You can add the properties to your entities in the **backend.yml file**

```yaml title="manifest/backend.yml"
name: Blog about cats
entities:
  Post 📝:
    properties:
      - name # Short syntax for string type.
      - { name: content, type: text } # Long syntax for other types.
      - { name: publishedAt, type: date }
      - { name: authorEmail, type: email, hidden: true } # Extra options.
      - {
          name: status,
          type: choice,
          options: { values: [draft, pending, published] },
          default: draft # Default value if property not specified.
        }
```

### Property params

You can pass arguments using the long syntax:

| Option         | Default  | Type       | Description                                                                                               |
| -------------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| **type**       | "string" | _PropType_ | The [Property type](#property-types) (text, number, email, location...)                                   |
| **hidden**     | `false`  | boolean    | If the property should be hidden in the API response                                                      |
| **options**    | -        | Object     | Specific options depending on [property type](#property-types)                                            |
| **validation** | -        | Object     | The [property validators](./validation.md) that each request compares against                             |
| **default**    | -        | any        | The default value. When creating an item, if the property is not specified it will default to this value. |

### Property types

Manifest vision of **property types** goes beyond software development typing and is already built-in for real world usages. For example, the [Money](#money) PropType is handier than [Number](#number) for managing amounts as it comes with a `currency` option that only allows 2 digits after the comma.

Each PropType comes with built-in type [validation](./validation.md).

Some of them have specific options. Here is a list of the available types:

#### String

A simple string.

```yaml
- { name: firstName, type: string }

# Short syntax, same as above.
- firstName
```

#### Textarea

Textarea field for medium-size texts.

```yaml
- { name: description, type: text }
```

#### Rich text

Rich text field for HTML content. The admin panel input can generate basic HTML tags like bold, italic, headings, links and bullet lists.

```yaml
- { name: description, type: richText }
```

#### Number

A numerical value.

```yaml
- { name: age, type: number }
```

#### Link

An URL that links to an external page.

```yaml
- { name: website, type: link }
```

#### Money

A money field with a currency. Money properties can have up to 2 digits after the comma.

```yaml
- { name: price, type: money, options: { currency: 'EUR' } }
```

###### Parameters

| Option       | Default | Type   | Description                                                                                      |
| ------------ | ------- | ------ | ------------------------------------------------------------------------------------------------ |
| **currency** | _USD_   | string | [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) |

#### Date

Basic date field.

```yaml
- { name: startDate, type: date }
```

#### Timestamp

Timestamp field (ISO 8601 Format)

```yaml
- { name: acquiredAt, type: timestamp }
```

#### Email

```yaml
- { name: email, type: email }
```

#### Boolean

For any field with a "true or false" value.

```yaml
- { name: isActive, type: boolean }
```

#### File

A file upload. Read more in the [file upload doc](./upload.md#upload-a-file).

```yaml
- { name: document, type: file }
```

:::note

Manifest stores the **absolute paths** of uploaded files. Use the [`BASE_URL`](./upload.md#add-a-base_url-variable) environment variable to adapt it to your domain.
:::

#### Image

An image upload. The different sizes should be provided to generate several sizes of it. Read more in the [image upload doc](./upload.md#upload-an-image).

```yaml
- {
    name: photo,
    type: image,
    options:
      { sizes: { small: { height: 90, width: 90 }, large: { width: 200 } } }
  }
```

:::note

Manifest stores the **absolute paths** of uploaded images. Use the [`BASE_URL`](./upload.md#add-a-base_url-variable) environment variable to adapt it to your domain.

:::

###### Parameters

| Option    | Default                                | Type             | Description                                                                                                                                                                                |
| --------- | -------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **sizes** | _thumbnail (80x80)_ _medium (160x160)_ | ImageSizesObject | An object with each key being the name of each size and with `width`, `height` and `fit` optional props. The _fit_ options works as in [Sharp](https://sharp.pixelplumbing.com/api-resize) |

#### Password

Password field. Most of the time you do not need to implement passwords manually as [authenticable entities](./auth.md#authenticable-entities) have built-in `email` and `password` fields to log in.

```yaml
- { name: password, type: password }
```

:::warning
When setting the type as `password`, Manifest hashes automatically the value before storing it. Passwords should never be stored as clear text.
:::

#### Choice

A given choice of options.

```yaml
- { name: sex, type: choice, options: { values: [male, female] } }

# Sequential if the values are ordered in a logical sense..
- {
    name: status,
    type: choice,
    options: { values: [draft, submitted, published], sequential: true }
  }
```

###### Parameters

| Option         | Default   | Type     | Description                                            |
| -------------- | --------- | -------- | ------------------------------------------------------ |
| **values**     | _(empty)_ | String[] | An array of strings representing the available choices |
| **sequential** | `false`   | boolean  | Specifies if the values are ordered in a logical sense |

#### Location

The location type consists in a object with `lat` and `lng` coordinates.

```yaml
- { name: location, type: location }
```

## Relations

You can create **one-to-many** relationships or **many-to-many** relationships.

### Syntax

The following example showcases the possibilities of **Manifest relations**:

```yaml title="manifest/backend.yml"
name: Basketball League 🏀

entities:
  Player 🤾:
    properties:
      - name
    belongsTo:
      - Team
    belongsToMany:
      - Skill

  Team 👥:
    properties:
      - name

  Skill 💪:
    properties:
      - name

  Fixture 🏟️:
    properties:
      - { name: homeScore, type: number }
      - { name: awayScore, type: number }
    belongsTo:
      - { name: homeTeam, entity: Team }
      - { name: awayTeam, entity: Team }
```

In other words:

- The **belongsTo** keyword creates a **many-to-one** relationship (and its opposite _one-to-many_)
- The **belongsToMany** keyword creates a **many-to-many** bi-directional relationship
- The **long syntax** (as in _Fixture.belongsTo_) is useful when we want to edit the name of the relationships

:::tip

All relationships are **bi-directional**, which means that you just have to specify them **in one side only** to work with them in both directions.

When you define a **belongsTo** relationship, it implicitly set the opposite _hasMany_ relationship and allow [querying relations](./crud.md#work-with-relations) in both directions.
:::

### Relation params

You can pass arguments using the long syntax:

| Option     | Default     | Type    | Description                                                                                                                      |
| ---------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **name**   | Entity name | string  | The name of the relation                                                                                                         |
| **entity** | -           | string  | The class name of the entity that the relationship is with                                                                       |
| **eager**  | `false`     | boolean | Whether the relationship should be eager loaded. Otherwise, you need to explicitly request the relation in the client SDK or API |
