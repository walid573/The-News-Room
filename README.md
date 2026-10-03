# The News Room

A modern Bengali news website built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**. It shows the latest headlines in a clean, responsive layout and has a dedicated article page for each story.

**Live demo:** https://news-room-orcin.vercel.app/
**Repository:** https://github.com/walid573/The-News-Room

---

## Features

- Home page with a lead story, topic sections and a "most read" sidebar
- Article page with headline, summary, publish date, inline images with captions and credits, and topic tags
- Scrolling breaking-news marquee
- Responsive layout for mobile, tablet and desktop
- Bengali typography with Noto Serif Bengali (`next/font`)
- Server-side data fetching with 5-minute revalidation
- Optimized images with `next/image`
- Strict TypeScript types for API responses

## Tech Stack

| Area      | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | Next.js (App Router, Server Components)     |
| Language  | TypeScript                                  |
| Styling   | Tailwind CSS (with DaisyUI component classes) |
| Font      | Noto Serif Bengali via `next/font/google`   |
| Linting   | ESLint                                      |
| Package manager | Bun (npm, yarn and pnpm also work)    |

## Project Structure

```
The-News-Room/
├── public/                  # Static assets (logo, icons)
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout: font, header, marquee, main wrapper
│       ├── page.tsx         # Home page
│       ├── globals.css      # Global styles
│       ├── components/      # Reusable UI
│       │   ├── Header.tsx   # Logo, date, sign in / sign up
│       │   ├── NavLinks.tsx # Category navigation
│       │   ├── Marquee.tsx  # Breaking news ticker
│       │   ├── MainNews.tsx # Lead story block
│       │   ├── NewsCard.tsx # Article card
│       │   └── MostRead.tsx # Most read sidebar
│       └── news/
│           └── [NewsId]/
│               └── page.tsx # Article details page
├── eslint.config.mjs
├── next.config.ts           # Remote image domains
├── postcss.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Routes

| Path              | Description                  |
| ----------------- | ---------------------------- |
| `/`               | Home page with news sections |
| `/news/[NewsId]`  | Full article page            |

## Data Source

The app reads from a public news API:

| Endpoint                                                  | Used for           |
| --------------------------------------------------------- | ------------------ |
| `https://news-api-v2.vercel.app/api/news/sections`        | Home page sections |
| `https://news-api-v2.vercel.app/api/article/:id`          | Article details    |

Responses are fetched on the server and revalidated every 300 seconds.

## Getting Started

### Prerequisites

- Node.js 18.18 or later (or Bun)
- Git

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:walid573/The-News-Room.git
cd The-News-Room

# 2. Install dependencies
bun install
# or: npm install

# 3. Start the development server
bun dev
# or: npm run dev
```

Open http://localhost:3000 in your browser.

### Available Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `bun dev`       | Start the development server     |
| `bun run build` | Create a production build        |
| `bun start`     | Run the production build         |
| `bun run lint`  | Run ESLint                       |

## Configuration

Article images come from an external host, so it must be allowed in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
    ],
  },
};

export default nextConfig;
```

Add more `remotePatterns` entries if the API serves images from other hosts.

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new):

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Click **Deploy**. No environment variables are required.

## Roadmap

- [ ] Category pages (`/category/[slug]`)
- [ ] Search
- [ ] Sign in / sign up functionality
- [ ] Dark mode
- [ ] Loading skeletons and error boundaries

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

## Author

**Mohammad Walid**
GitHub: [@walid573](https://github.com/walid573)

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- News content provided through the public news API listed above. All articles remain the property of their original publishers.

