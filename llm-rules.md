---
id: llm-rules
title: LLM Rules
descriptions: Use Manifest rules in your AI Code Editor to improve your LLM understanding of Manifest backend.
---

# LLM rules

Rules are predefined guidelines and constraints that steer an AI assistant’s behavior. They specify the style, conventions, best practices, or security policies to follow. Rules ensure consistency, quality, and compliance of the generated suggestions.

## Usage

Running the install command above will add the rules to the Manifest rules in your project.

```bash
npx create-manifest --cursor
```

You can replace `--cursor` with another option if you're using a different AI tool;

- `--copilot` if you're using GitHub Copilot
- `--windsurf` for Windsurf

If you need to install rules manually, download the file below and add it to your AI code editor:

<a href="https://raw.githubusercontent.com/mnfst/rules/refs/heads/main/src/rules.md" download>
  ⬇️ Download Manifest Rules
</a>

## Integration with Lovable, Bolt.new and vibe coding tools

<div style={{ backgroundColor: '#d6ffee', padding: '1em 1em 0.1em 1em', borderRadius: '12px' }}>

Manifest already works with ❤️ [Lovable](https://lovable.dev) and [Bolt.new](https://bolt.new) if you clone the project and run it locally. However it is still hard to convince those LLM to use manifest as a backend as they have been programmed to do otherwise. With a native integration, you could launch Manifest directly inside them.

Want to see Manifest inside **Lovable** ? ⬆️ **[Upvote the idea](https://lovable.featurebase.app/fr/p/manifestbuild-integration?slug=manifestbuild-integration)**.

</div>

## Types and OpenAPI Generation

When you run Manifest, it generates 2 key context files in the **/.manifest** folder:

- **openapi.yml**: [OpenAPI](https://www.openapis.org/) spec for the available endpoints, schemas, and the API base URL of your backend.
- **types.ts**: type file with typings and DTOs (Data Transfer Object) for each entity.

By including these context files, Manifest ensures your AI code editor understands your API, enabling smarter and more reliable code generation,especially when you want to connect a frontend to your Manifest backend.
