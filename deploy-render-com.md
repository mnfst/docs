---
id: deploy-render-com
---

# Deploy Manifest on Render.com

![Render.com homepage](./assets/images/deploy/renderhome.png)

[Render](https://render.com) is a popular cloud provider that enables developers to ship apps without hassle.

Create an account on render.com or sign in to your existing one. From the dashboard, click on "Create a new web service" to get started.

## Link the source provider

In our example, we are deploying a backend on a GitHub repository, but you can also deploy from GitLab or BitBucket.

Choose the correct repository and click on "Connect" to continue.

## Configure your app

![Render.com configuration](./assets/images/deploy/render1.png)

The following screen will display a form with some fields that you have to configure:

- **Region (optional):** Choose the closest region to your users
- **Build command**: Enter `echo "No build step required"` as that field is mandatory, but no build command is needed
- **Start command**: The value should be `node node_modules/manifest/dist/manifest/src/main.js`
- **Environment variables**: Add the 2 environment variables: `TOKEN_SECRET_KEY` (you can generate with https://jwtsecret.com/generate) and `NODE_ENV=production`.

Click on "Deploy web service" to launch the deployment.

🎉 That's it ! Your app should be available in a few minutes at the domain ending in onrender.com.

:::tip

If you want to activate health checks, go to the "Health Checks" section and replace `/healthz` with `/api/health`

:::