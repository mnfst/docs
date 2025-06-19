---
id: access
---

# Access policies

Access Policies ensure that we provide specific access to resources for users. You may want to open publicly the **read** access for an entity while limiting **creation** to logged in users for example.

Access policies are a way to implement **Authorization** following the RBAC (Role-Based Access Control) method. Indeed it is possible to create different entities (ex: User, Manager...) with different access to resources. You also can limit access to a user own's records using [ownership-based access](#ownership-based-access).

Policies can be added to [entities](./entities.md) and [endpoints](./endpoints.md).

:::info
By default, all CRUD rules access are set to **admin** and thus only available for logged-in admins. Custom endpoints are **public** by default.
:::

## Syntax

The policies for each rule can be added to each [entity description](./entities.md) as shown below:

```yaml
entities:
  Invoice 🧾:
    properties:
      - number
      - { name: issueDate, type: date }
    policies:
      create:
        - { access: restricted, allow: User } # Only logged in users can create.
      read:
        - access: public # All read endpoints are public.
      update:
        - access: admin # Only logged in admins can update.
      delete:
        - access: forbidden # No one can delete (even admins!)
```

In this case, everyone can see the **Invoice** items, only logged-in **Users** can create new ones. Updating an Invoice is restricted to [Admins](./auth.md#admins) only and no one can delete them (not even Admins).

| Prop       | Description                                                               | Type               |
| ---------- | ------------------------------------------------------------------------- | ------------------ |
| **access** | The type of access: **public**, **restricted**, **admin**, **forbidden**  | AccessType         |
| **allow**  | Only for **restricted** access: the entity (or entities) that have access | string \| string[] |

### Access types

There are 4 possible access types:

| Access         | Description                                                                                                                                                                                                                                                          | Short version (emoji) |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **public**     | Everyone has access                                                                                                                                                                                                                                                  | 🌐                    |
| **restricted** | Only logged-in users have access to it. If _allow_ key specifies one or several entities, users logged in as other entities will not have access. If _condition_ is set to `self`, it limits access to the item owner. Admins always have access to restricted rules | 🔒                    |
| **admin**      | Only [admins](./auth.md#admins) have access                                                                                                                                                                                                                          | 👨🏻‍💻                    |
| **forbidden**  | No one has access, not even admins                                                                                                                                                                                                                                   | 🚫                    |

### Entity rules

Each entity has **5 rules** where one or several access policies can be applied:

- **create**: create a new item
- **read**: see the detail and the list of items
- **update**: update an existing item
- **delete**: delete an existing item
- **signup**: sign up as a new user (only for [authenticable entities](./auth.md#authenticable-entities))

By default, all rules have the [admin access type](#access-types)

## Ownership-based access

Above rules are based on predefined roles, but you many want to grant user access only to their own records. For example, a platform like _Craiglist_ allows its users to create and manage classified ads only for them, not letting users edit others' content.

In Manifest, this is done simply by adding the `{condition: 'self'}` to a restricted policy:

```yaml
User:
  properties:
    - name
  authenticable: true

Project:
  properties:
    - name
  belongsTo:
    - User # Should belong to an authenticable entity.
  policies:
    create:
      - { access: restricted, allow: User, condition: self }
```

See ? Just adding the `self` condition prevent creating projects for other users than themselves.

Even if it looks very simple, it has slighlty different impact based on rule where it is added. See the following example:

```yaml
policies:
  create:
    - { access: restricted, allow: User, condition: self }
  read:
    - { access: restricted, allow: User, condition: self }
  update:
    - { access: restricted, allow: User, condition: self }
  delete:
    - { access: restricted, allow: User, condition: self }
```

This means:

- Create: Record creation is authorized only if owner is the logged in user
- Read: You can only fetch your own record: it forces a filter
- Update: You only can update your own records and cannot change the ownership of them
- Delete: You only can delete your own records

## Additional examples

```yaml
entities:
  Project 🗂️:
    properties:
      - name
    belongsTo:
      - Manager
    policies:
      read:
        - { access: restricted, allow: [Contributor, Manager] } # Only some entities (and admins).
      create:
        - { access: restricted, allow: Manager, condition: self } # Only managers for themselves (and admins).
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

endpoints:
  basicEndpoint:
    path: /basic
    description: A basic endpoint that returns a simple message.
    method: GET
    handler: basicEndpoint
    policies:
      - access: public # This endpoint is public.
```
