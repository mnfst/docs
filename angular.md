---
id: angular
---

# Quick start with Angular

Give a proper backend to your Angular app.

:::warning

This quick start guide focuses exclusively on the **frontend**. To ensure the functionality of this code, your Manifest backend must be [up and running](./introduction.md#install-manifest) at `http://localhost:1111`.

:::

# 1. Create a Angular app

If you already have your Angular app up and running, skip this step.

We will use the [Angular CLI](https://angular.dev/tools/cli) to create a new Angular project. You can replace `my-client` by the name of your front-end app.

```
ng new my-client
cd my-client
ng serve
```

# 2. Install Manifest SDK

Install the JS SDK from the root of your Angular app.

```
npm i @mnfst/sdk
```

# 3. Use it in your app

In that example we are using a Cat entity [created previously](entities.md). Replace it by your own entity.

```js title="app.component.ts"
import { Component } from '@angular/core'
import Manifest from '@mnfst/sdk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cats: { id: string, name: string }[] = []

  async ngOnInit() {
    // Init SDK.
    const manifest = new Manifest()

    // Fetch the list of Cats.
    const result = await manifest.from('cats').find()
    this.cats = result.data
  }
}
```

And in the template:

```html
<ul>
  <li *ngFor="let cat of cats">{{ cat.name }}</li>
</ul>
```

Checkout the [SDK doc](./crud.md#using-the-javascript-sdk) to see more usages of the SDK: CRUD operations, file upload, authentication,
