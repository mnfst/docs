---
id: policies
---

# API Policies

API Policies ensure that we provide specific access to resources for users. They are a way to implement **Authorization** following the RBAC (Role-Based Access Control) method. Indeed it is possible to create different entities (ex: User, Manager...) with different access to resources.

Policies can be added to [entities](./entities.md) or [endpoints](./endpoints.md).

## Entity rules

Each entity has **5 rules** where one or several access policies can be applied:

- **create**: create a new item
- **read**: see the detail and the list of items
- **update**: update an existing item
- **delete**: delete an existing item
- **signup**: sign up as a new user (only for [authenticable entities](./auth.md#authenticable-entities))

## Access policies

The policies for each rule can be added to each [entity description](./entities.md) as shown below:

```yaml
entities:
  Invoice 🧾:
    properties:
      - number
      - { name: issueDate, type: date }
    policies:
      create:
        - { access: restricted, allow: User }
      update:
        - access: admin
      delete:
        - access: forbidden
```

In this case, everyone can see the **Invoice** items, only logged-in **Users** can create new ones. Updating an Invoice is restricted to [Admins](./auth.md#admins) only and no one can delete them (not even Admins).

:::warning
If **no policy** is specified for a rule, **the access is public** for the related action, thus anyone can manage records.

The only exception is the **update** of [single entities](./entities.md#singles) that is set to `admin` by default for convenience.
:::

| Prop       | Description                                                               | Type               |
| ---------- | ------------------------------------------------------------------------- | ------------------ |
| **access** | The type of access: **public**, **restricted**, **admin**, **forbidden**  | AccessType         |
| **allow**  | Only for **restricted** access: the entity (or entities) that have access | string \| string[] |

### Access types

There are 4 possible access types:

| Access         | Description                                                                                                                                                                                     | Short version (emoji) |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **public**     | Everyone has access                                                                                                                                                                             | 🌐                    |
| **restricted** | Only logged-in users have access to it. If _allow_ key specifies one or several entities, users logged in as other entities will not have access. Admins always have access to restricted rules | 🔒                    |
| **admin**      | Only [admins](./auth.md#admins) have access                                                                                                                                                     | 👨🏻‍💻                    |
| **forbidden**  | No one has access, not even admins                                                                                                                                                              | 🚫                    |

### Additional examples

```yaml
entities:
  Project 🗂️:
    properties:
      - name
    policies:
      read:
        - { access: restricted, allow: [Contributor, Manager] } # Only some entities (and admins).
      create:
        - { access: restricted, allow: Manager } # Only managers (and admins).
      update:
        - access: 👨🏻‍💻 # Only admin.
      delete:
        - access: 🚫 # Forbidden (no one).

  Contributor 👨‍💼:
    authenticable: true
    properties:
      - name
    policies:
      signup:
        - access: 🚫 # Forbidden (no one).
      create:
        - { access: 🔒, allow: Manager } # Managers can create contributors.
      update:
        - { access: 🔒, allow: Manager }
      delete:
        - { access: 🔒, allow: Manager } # Managers can create contributors.
```
