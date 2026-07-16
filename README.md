# My Blog

![App Preview](https://imgix.cosmicjs.com/2f1b9470-8141-11f1-90a0-bb34f9b6dfc3-autopilot-photo-1526772662000-3f88f10405ff-1784225238827.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and responsive creative portfolio blog built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse posts, discover authors, and explore content organized by categories — all pulled dynamically from your Cosmic bucket.

## Features

- 📝 **Posts** — Rich blog posts with featured images, content, tags, author, and category
- 👤 **Authors** — Dedicated author pages with bios, profile photos, and their published posts
- 🏷️ **Categories** — Browse posts grouped by category
- 🎨 **Modern responsive design** — Beautiful layout that works on all devices
- ⚡ **Server-side rendering** — Fast, SEO-friendly pages powered by Next.js App Router
- 🖼️ **Optimized images** — Automatic image optimization via imgix
- 🔗 **Fully connected navigation** — Seamless links between posts, authors, and categories

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a591d9fbac0261361d64493&clone_repository=6a591e7abac0261361d644d3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `posts`, `authors`, and `categories` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (see `.env` example below):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected author and category (depth 1)
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

const posts = response.objects

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .depth(1)
```

## Cosmic CMS Integration

This app leverages your existing Cosmic content model:

- **Posts** (`posts`): title, content, featured_image, tags, author (connected), category (connected)
- **Authors** (`authors`): name, bio, profile_photo
- **Categories** (`categories`): name, description

All content is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects like authors and categories.

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add the environment variables in Site Settings
4. Deploy

<!-- README_END -->