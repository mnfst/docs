---
id: properties
title: Properties
---

# Add properties to an entity

Properties are the characteristics of your [entities](entities). For example, a **Product** can have properties like `name`, `description`, `price`...

## Syntax

You can add the properties to your entities in the **backend.yml file**

```yaml
name: Blog about cats
entities:
  📝 Post:
    properties:
      - name # Short syntax for string type.
      - { name: content, type: text } # Property type specified.
      - { name: publishedAt, type: date }
      - { name: authorEmail, type: email, hidden: true } # Extra options.
```

## Property params

You can pass arguments using the long syntax:

| Option         | Default  | Type       | Description                                                                   |
| -------------- | -------- | ---------- | ----------------------------------------------------------------------------- |
| **type**       | "string" | _PropType_ | The [Property type](#property-types) (text, number, email, location...)       |
| **hidden**     | `false`  | boolean    | If the property should be hidden in the API response                          |
| **options**    | -        | Object     | Specific options depending on [property type](#property-types)                |
| **validation** | -        | Object     | The [property validators](./validation.md) that each request compares against |

## Property types

Manifest vision of **property types** goes beyond software development typing and is already built-in for real world usages. For example, the [Money](#money) PropType is handier than [Number](#number) for managing amounts as it comes with a `currency` options and only allows 2 digits after coma.

Each PropType comes with a built-in type [validation](#validation).

Some of them have specific options. Here is a list of the available types

### String

A simple string.

```yaml
- { name: firstName, type: string }

# Short syntax, same as above.
- firstName
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-r3tmlw?file=manifest%2Fbackend.yml)

### Textarea

Textarea field for medium-size texts.

```yaml
- { name: description, type: text }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-ih3ish?file=manifest%2Fbackend.yml)

### Number

A numerical value.

```yaml
- { name: age, type: number }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-i339nv?file=manifest%2Fbackend.yml)

### Link

An URL that links to an external page.

```yaml
- { name: website, type: link }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-6s8jxx?file=manifest%2Fbackend.yml)

### Money

A money field with a currency. Money properties can have up to 2 digits after coma.

```yaml
- { name: price, type: money, options: { currency: "EUR" } }
```

##### Parameters

| Option       | Default | Type   | Description                                                                                      |
| ------------ | ------- | ------ | ------------------------------------------------------------------------------------------------ |
| **currency** | _USD_   | string | [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) |

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-jjlyxu?file=manifest%2Fbackend.yml)

### Date

Basic date field.

```yaml
- { name: startDate, type: date }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-bmxncv?file=manifest%2Fbackend.yml)

### Timestamp

Timestamp field.

```yaml
- { name: acquiredAt, type: timestamp }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-mrz18z?file=manifest%2Fbackend.yml)

### Email

```yaml
- { name: email, type: email }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-5pokfh?file=manifest%2Fbackend.yml)

### Boolean

For any field with a "true or false" value.

```yaml
- { name: isActive, type: boolean }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-u5iyur?file=manifest%2Fbackend.yml)

### File

A file upload. Read more in the [file upload doc](./upload.md#upload-a-file).

```yaml
- { name: document, type: file }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-dylmky?file=manifest%2Fbackend.yml)

### Image

An image upload. The different sizes should be provided to generate several sizes of it. Read more in the [image upload doc](./upload.md#upload-an-image).

```yaml
- {
    name: photo,
    type: image,
    options:
      { sizes: { small: { height: 90, width: 90 }, large: { width: 200 } } },
  }
```

##### Parameters

| Option    | Default                                | Type             | Description                                                                                                                                                                                |
| --------- | -------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **sizes** | _thumbnail (80x80)_ _medium (160x160)_ | ImageSizesObject | An object with each key being the name of each size and with `width`, `height` and `fit` optional props. The _fit_ options works as in [Sharp](https://sharp.pixelplumbing.com/api-resize) |

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-rytpmz?file=manifest%2Fbackend.yml)

### Password

Password field. Most of the time you do not need to implement passwords manually as [authenticable entities](./auth.md#authenticable-entities) have built-in `email` and `password` fields to log in.

```yaml
- { name: password, type: password }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-n15k9a?file=manifest%2Fbackend.yml)

:::warning
When setting the type as `password`, Manifest hashes automatically the value before storing it. Passwords should never be stored as clear text.
:::

### Choice

A given choice of options.

```yaml
- { name: sex, type: choice, options: { values: [male, female] } }

# Sequential if the values are ordered in a logical sense..
- {
    name: status,
    type: choice,
    options: { values: [draft, submitted, published], sequential: true },
  }
```

##### Parameters

| Option         | Default   | Type     | Description                                            |
| -------------- | --------- | -------- | ------------------------------------------------------ |
| **values**     | _(empty)_ | String[] | An array of strings representing the available choices |
| **sequential** | `false`   | boolean  | Specifies if the values are ordered in a logical sense |

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-ashxqx?file=manifest%2Fbackend.yml)

### Location

The location type consists in a object with `lat` and `lng` coordinates.

```yaml
- { name: location, type: location }
```

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/mnfst-manifest-nqb5ix?file=manifest%2Fbackend.yml)
