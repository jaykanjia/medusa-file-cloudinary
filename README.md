<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa File Cloudinary Plugin
</h1>

## Compatibility

This starter is compatible with versions >= 2.4.0 of `@medusajs/medusa`.

---

## Medusa File Cloudinary Plugin

Easily integrate [Cloudinary](https://cloudinary.com/) as a file storage provider in your Medusa store.  
This plugin enables seamless upload, retrieval, and management of images and other media files using Cloudinary's robust cloud infrastructure, directly from your Medusa backend.

### Installation

Install the plugin in your Medusa project:

```bash
yarn add @jaykanjia/medusa-file-cloudinary
# or
npm install @jaykanjia/medusa-file-cloudinary
```

---

### Configuration

#### Step 1: Update Medusa Configuration

Modify your `medusa-config.ts` (usually found in your Medusa project's root or under `medusa-store-final/medusa-config.ts`) to register the plugin as a file provider:

```ts
{
  resolve: "@medusajs/medusa/file",
  options: {
    providers: [
      {
        resolve: "@jaykanjia/medusa-file-cloudinary/providers/file-cloudinary",
        id: "cloudinary",
        options: {
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          folderName: "medusa", // optional, defaults to root
          secure: true,         // optional, defaults to true
        },
      },
    ],
  },
},
```

---

#### Step 2: Set Environment Variables

Add the following environment variables to your `.env` file:

```env
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

You can find these credentials in your Cloudinary dashboard.

---

## Getting Started

Visit the [Quickstart Guide](https://docs.medusajs.com/learn/installation) to set up a server.

Visit the [Plugins documentation](https://docs.medusajs.com/learn/fundamentals/plugins) to learn more about plugins and how to create them.

Visit the [Docs](https://docs.medusajs.com/learn/installation#get-started) to learn more about our system requirements.

## What is Medusa

Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

Learn more about [Medusa's architecture](https://docs.medusajs.com/learn/introduction/architecture) and [commerce modules](https://docs.medusajs.com/learn/fundamentals/modules/commerce-modules) in the Docs.

## Community & Contributions

The community and core team are available in [GitHub Discussions](https://github.com/medusajs/medusa/discussions), where you can ask for support, discuss roadmap, and share ideas.

Join our [Discord server](https://discord.com/invite/medusajs) to meet other community members.

## Other channels

- [GitHub Issues](https://github.com/medusajs/medusa/issues)
- [Twitter](https://twitter.com/medusajs)
- [LinkedIn](https://www.linkedin.com/company/medusajs)
- [Medusa Blog](https://medusajs.com/blog/)
