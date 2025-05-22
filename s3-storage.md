# S3 Storage

## Introduction

Manifest supports **S3 storage** to manage assets. To use it, ensure you have:

- A **storage bucket** (or equivalent).
- Access credentials with read and write permissions.

## Configuration

Define these variables in your `.env` file:

```
S3_BUCKET=my-bucket-name
S3_ENDPOINT=https://your-s3-provider.com
S3_REGION=XXX
S3_ACCESS_KEY_ID=XXX
S3_SECRET_ACCESS_KEY=XXX

# Optional: Specify the provider if using Supabase or other non-standard S3 services
# S3_PROVIDER=supabase
```

:::note
- Set `S3_PROVIDER=supabase` **only** if using Supabase. Ensure its `S3_ENDPOINT` URL does **not** end with `/s3`.
- `S3_PROVIDER` is optional for standard providers like AWS S3 and DigitalOcean Spaces.
- Validated with AWS S3 & DigitalOcean Spaces. Other S3-compatible providers may work but are untested.
:::
