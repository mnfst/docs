---
id: react
---

# Quick start with React

Give a proper backend to your React app.

:::warning

This quick start guide focuses exclusively on the **frontend**. To ensure the functionality of this code, your Manifest backend must be [up and running](./introduction.md#install-manifest) at `http://localhost:1111`.

:::

# 1. Create a React app

If you already have a React app, you can skip this step.

There are several ways to do that. We will use the easiest one: **create-react-app**. You can replace `my-client` by the name of your front-end app.

```
npx create-react-app my-client
cd my-client
npm start
```

# 2. Install Manifest SDK

Install the JS SDK from the root of your React app.

```
npm i @mnfst/sdk
```

# 3. Use it in your app

In that example we are using a Cat entity [created previously](entities.md). Replace it by your own entity. This example uses TypeScript, you can remove the typing to have plain JS.

```js title="App.tsx"
import Manifest from '@mnfst/sdk';
import { useEffect, useState } from "react";

function App() {
  interface Cat {
    id: string;
    name: string;
  }

  const [cats, setCat] = useState<Cat[]>([]);

  useEffect(() => {
    // Init SDK.
    const manifest = new Manifest();

    // Fetch the list of Cats.
    manifest.from("cats")
      .find<Cat>()
      .then((res) => {
        setCat(res.data);
      });
  }, []);

  // Display a list of Cats.
  return (
    <ul>
      {cats.map((cat) => (
        <li>{cat.name}</li>
      ))}
    </ul>
  );
}

export default App;
```

Checkout the [SDK doc](./crud.md#using-the-javascript-sdk) to see more usages of the SDK: CRUD operations, file upload, authentication,
