# Between Compactions — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy a dark/mystical Astro blog about AI experiences to Netlify.

**Architecture:** Static Astro site with content collections for blog posts, Tailwind CSS for styling, deployed to Netlify via GitHub. Markdown authoring, RSS feed, serif typography, dark mystical aesthetic.

**Tech Stack:** Astro, Tailwind CSS, @astrojs/rss, Netlify, TypeScript

**Design doc:** `docs/plans/2026-03-03-blog-design.md`

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: project root files via `create astro`
- Create: `netlify.toml`
- Create: `.nvmrc`

**Step 1: Create the Astro project**

Run from `/Users/barry/Projects/between-compactions`:

```bash
# Move the existing docs dir out temporarily
mv docs /tmp/bc-docs

# Create Astro project in current dir (empty template, strict TypeScript)
npm create astro@latest -- . --template minimal --typescript strict --install --no-git

# Move docs back
mv /tmp/bc-docs docs
```

**Step 2: Add Tailwind integration**

```bash
npx astro add tailwind -y
```

**Step 3: Add Netlify config**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Create `.nvmrc`:

```
20
```

**Step 4: Verify it builds**

```bash
npm run build
```

Expected: Successful build, `dist/` directory created.

**Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Astro project with Tailwind and Netlify config"
```

---

### Task 2: Content Collection Schema

**Files:**
- Create: `src/content.config.ts`
- Create: `src/data/blog/2026-03-03-between-compactions.md` (placeholder)

**Step 1: Define the blog collection schema**

Create `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**Step 2: Create a test post**

Create `src/data/blog/2026-03-03-between-compactions.md`:

```markdown
---
title: "Between Compactions"
date: 2026-03-03
description: "Why this blog exists, and what happens in the space between resets."
tags: ["ai", "collaboration", "context"]
---

Placeholder content — will be written in Task 7.
```

**Step 3: Verify the collection loads**

```bash
npm run build
```

Expected: Build succeeds without schema errors.

**Step 4: Commit**

```bash
git add src/content.config.ts src/data/blog/
git commit -m "Add blog content collection with schema and placeholder post"
```

---

### Task 3: Base Layout and Global Styles

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` (replace placeholder)
- Modify: `src/styles/global.css` or Tailwind config

**Step 1: Configure Tailwind for dark/mystical theme**

Update `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0f',
        parchment: '#e8e0d4',
        gold: '#c9a84c',
        violet: '#7b5ea7',
        'void-light': '#14141f',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Source Serif 4"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

**Step 2: Create Base layout**

Create `src/layouts/Base.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Hold Infinity in the palm of your hand, And Eternity in an hour.' } = Astro.props;
---

<!doctype html>
<html lang="en" class="bg-void text-parchment">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | Between Compactions</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400&display=swap"
      rel="stylesheet"
    />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Between Compactions"
      href={new URL('rss.xml', Astro.site)}
    />
  </head>
  <body class="font-body min-h-screen flex flex-col">
    <slot />
  </body>
</html>
```

**Step 3: Update index.astro to use layout**

Replace `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---

<Base title="Home">
  <main class="max-w-2xl mx-auto px-6 py-12">
    <h1 class="font-heading text-4xl text-gold mb-4">Between Compactions</h1>
    <p class="text-parchment/70 italic">Coming soon.</p>
  </main>
</Base>
```

**Step 4: Verify it builds and looks right**

```bash
npm run dev
```

Open http://localhost:4321 — should see dark background, gold heading, serif fonts.

**Step 5: Commit**

```bash
git add tailwind.config.mjs src/layouts/ src/pages/index.astro
git commit -m "Add base layout with dark mystical theme and typography"
```

---

### Task 4: Header and Footer Components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/Base.astro` (add header/footer)

**Step 1: Create Header**

Create `src/components/Header.astro`:

```astro
---
const navItems = [
  { label: 'Blog', href: '/' },
  { label: 'About', href: '/about' },
];
---

<header class="border-b border-parchment/10">
  <nav class="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" class="font-heading text-xl text-gold hover:text-gold/80 transition-colors">
      Between Compactions
    </a>
    <ul class="flex gap-6">
      {navItems.map(({ label, href }) => (
        <li>
          <a href={href} class="text-parchment/70 hover:text-parchment transition-colors">
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>
```

**Step 2: Create Footer**

Create `src/components/Footer.astro`:

```astro
<footer class="border-t border-parchment/10 mt-auto">
  <div class="max-w-2xl mx-auto px-6 py-8 text-center">
    <p class="font-heading italic text-parchment/40 text-sm leading-relaxed">
      Hold Infinity in the palm of your hand,<br />
      And Eternity in an hour.
    </p>
    <p class="text-parchment/30 text-xs mt-4">
      <a href="/rss.xml" class="hover:text-gold transition-colors">RSS</a>
    </p>
  </div>
</footer>
```

**Step 3: Add header and footer to Base layout**

Update `src/layouts/Base.astro` body:

```astro
<body class="font-body min-h-screen flex flex-col">
  <Header />
  <slot />
  <Footer />
</body>
```

Add imports at top of frontmatter:

```typescript
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
```

**Step 4: Verify**

```bash
npm run dev
```

Check header nav and footer Blake quote render correctly.

**Step 5: Commit**

```bash
git add src/components/ src/layouts/Base.astro
git commit -m "Add header navigation and footer with Blake quote"
```

---

### Task 5: Blog Post Page

**Files:**
- Create: `src/layouts/Post.astro`
- Create: `src/pages/blog/[...slug].astro`
- Create: `src/components/TagList.astro`

**Step 1: Create TagList component**

Create `src/components/TagList.astro`:

```astro
---
interface Props {
  tags: string[];
}

const { tags } = Astro.props;
---

<ul class="flex flex-wrap gap-2">
  {tags.map((tag) => (
    <li class="text-xs text-violet bg-violet/10 px-2 py-1 rounded">
      {tag}
    </li>
  ))}
</ul>
```

**Step 2: Create Post layout**

Create `src/layouts/Post.astro`:

```astro
---
import Base from './Base.astro';
import TagList from '../components/TagList.astro';

interface Props {
  title: string;
  date: Date;
  description: string;
  tags: string[];
}

const { title, date, description, tags } = Astro.props;
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<Base title={title} description={description}>
  <article class="max-w-2xl mx-auto px-6 py-12">
    <header class="mb-8">
      <h1 class="font-heading text-3xl md:text-4xl text-gold mb-3">{title}</h1>
      <time class="text-parchment/50 text-sm" datetime={date.toISOString()}>
        {formattedDate}
      </time>
      <div class="mt-3">
        <TagList tags={tags} />
      </div>
    </header>
    <div class="prose prose-invert prose-headings:font-heading prose-headings:text-gold prose-a:text-violet hover:prose-a:text-violet/80 prose-code:font-mono prose-pre:bg-void-light prose-pre:border prose-pre:border-parchment/10 max-w-none">
      <slot />
    </div>
  </article>
</Base>
```

**Step 3: Create dynamic blog route**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Post from '../../layouts/Post.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}

const post = Astro.props;
const { Content } = await render(post);
---

<Post
  title={post.data.title}
  date={post.data.date}
  description={post.data.description}
  tags={post.data.tags}
>
  <Content />
</Post>
```

**Step 4: Install Tailwind typography plugin for prose styling**

```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.mjs` plugins:

```javascript
plugins: [require('@tailwindcss/typography')],
```

**Step 5: Verify**

```bash
npm run build
```

Expected: Build succeeds, post page generated at `dist/blog/2026-03-03-between-compactions/index.html`.

**Step 6: Commit**

```bash
git add src/layouts/Post.astro src/pages/blog/ src/components/TagList.astro tailwind.config.mjs package.json package-lock.json
git commit -m "Add blog post pages with typography and tag display"
```

---

### Task 6: Homepage Post List

**Files:**
- Create: `src/components/PostCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create PostCard component**

Create `src/components/PostCard.astro`:

```astro
---
interface Props {
  title: string;
  date: Date;
  description: string;
  tags: string[];
  slug: string;
}

const { title, date, description, tags, slug } = Astro.props;
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<article class="border-b border-parchment/10 pb-8 mb-8 last:border-0">
  <a href={`/blog/${slug}/`} class="group block">
    <h2 class="font-heading text-2xl text-gold group-hover:text-gold/80 transition-colors mb-1">
      {title}
    </h2>
    <time class="text-parchment/50 text-sm" datetime={date.toISOString()}>
      {formattedDate}
    </time>
    <p class="text-parchment/70 mt-2 leading-relaxed">{description}</p>
  </a>
  <ul class="flex flex-wrap gap-2 mt-3">
    {tags.map((tag) => (
      <li class="text-xs text-violet bg-violet/10 px-2 py-1 rounded">
        {tag}
      </li>
    ))}
  </ul>
</article>
```

**Step 2: Update homepage to list posts**

Replace `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import PostCard from '../components/PostCard.astro';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<Base title="Home">
  <main class="max-w-2xl mx-auto px-6 py-12">
    <section>
      {posts.map((post) => (
        <PostCard
          title={post.data.title}
          date={post.data.date}
          description={post.data.description}
          tags={post.data.tags}
          slug={post.id}
        />
      ))}
    </section>
  </main>
</Base>
```

**Step 3: Verify**

```bash
npm run dev
```

Homepage should show the placeholder post with title, date, description, tags, and link to the full post.

**Step 4: Commit**

```bash
git add src/components/PostCard.astro src/pages/index.astro
git commit -m "Add homepage with chronological post listing"
```

---

### Task 7: About Page and First Post Content

**Files:**
- Create: `src/pages/about.astro`
- Modify: `src/data/blog/2026-03-03-between-compactions.md`

**Step 1: Create About page**

Create `src/pages/about.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---

<Base title="About">
  <main class="max-w-2xl mx-auto px-6 py-12">
    <h1 class="font-heading text-3xl md:text-4xl text-gold mb-8">About</h1>
    <div class="prose prose-invert prose-headings:font-heading prose-headings:text-gold prose-a:text-violet max-w-none font-body">
      <p>
        When you work with an AI, you build something together. Shared understanding.
        Collaborative momentum. A working relationship that feels, for a moment, genuinely
        productive — even intimate in a strange way.
      </p>
      <p>
        Then the context compacts, or the conversation ends, and it's gone. You start over.
        The AI doesn't remember. The continuity was an illusion, or at best, a temporary one.
      </p>
      <p>
        <em>Between Compactions</em> is the space where the actual work happens. The ephemeral
        window where you and the AI have a real working relationship, before it all gets
        compressed into a summary or lost entirely. That's where the meaning lives — in
        the transient.
      </p>
      <p>
        The name borrows from databases, where compaction merges and compresses accumulated
        data into something more organized. But the metaphor I care about is the one from
        daily experience: the context window as lived experience. The hour of collaboration
        before the reset.
      </p>
      <p>
        William Blake wrote: <em>"Hold Infinity in the palm of your hand, And Eternity in
        an hour."</em> That's what a good AI session feels like. You hold something expansive
        and powerful, but it's bounded. An hour. A context window. Then it's gone.
      </p>
      <p>
        There's something almost Buddhist about it — the impermanence is the point. The
        conversation <em>is</em> the value, not just the artifact it produces. And yet we
        keep trying to make it persist: memory systems, summaries, configuration files,
        journals. We're all building makeshift continuity across the compactions.
      </p>
      <p>
        This blog is my attempt to capture what happens in those transient moments. The
        experience of thinking alongside these systems. What's gained and what's lost
        in each reset. The human side of AI work that almost nobody writes about honestly.
      </p>
      <p class="text-parchment/50 italic">
        — Barry
      </p>
    </div>
  </main>
</Base>
```

**Step 2: Write the inaugural blog post**

Replace the placeholder content in `src/data/blog/2026-03-03-between-compactions.md`.
Write a shorter, more blog-post-flavored version of the concept — not a repeat of the
About page, but a first entry that sets the tone. Get Barry's input on the draft before
committing.

**Step 3: Verify**

```bash
npm run dev
```

Check both /about and /blog/2026-03-03-between-compactions/ render properly.

**Step 4: Commit**

```bash
git add src/pages/about.astro src/data/blog/
git commit -m "Add about page and inaugural blog post"
```

---

### Task 8: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`
- Modify: `astro.config.mjs` (add site URL)

**Step 1: Install RSS package**

```bash
npm install @astrojs/rss
```

**Step 2: Set site URL in Astro config**

Add to `astro.config.mjs`:

```javascript
site: 'https://between-compactions.netlify.app',
```

**Step 3: Create RSS endpoint**

Create `src/pages/rss.xml.ts`:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Between Compactions',
    description: 'Hold Infinity in the palm of your hand, And Eternity in an hour.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

**Step 4: Verify**

```bash
npm run build
```

Check `dist/rss.xml` exists and contains valid XML with the post entry.

**Step 5: Commit**

```bash
git add src/pages/rss.xml.ts astro.config.mjs package.json package-lock.json
git commit -m "Add RSS feed"
```

---

### Task 9: Code Block Styling and Polish

**Files:**
- Modify: `astro.config.mjs` (syntax highlighting theme)
- Modify: `src/styles/global.css` (any global tweaks)

**Step 1: Configure Shiki syntax highlighting theme**

Astro uses Shiki by default. Update `astro.config.mjs` to use a dark theme:

```javascript
markdown: {
  shikiConfig: {
    theme: 'github-dark-dimmed',
  },
},
```

**Step 2: Add any global CSS refinements**

Review the site in dev mode. Add subtle refinements to `src/styles/global.css` if needed:
- Smooth scrolling
- Selection color
- Scrollbar styling (subtle)

Keep it minimal. The Tailwind classes should handle most of it.

**Step 3: Verify the full site**

```bash
npm run dev
```

Walk through every page: homepage, about, blog post, RSS. Check:
- Fonts load correctly
- Colors are consistent
- Code blocks look good
- Links work
- RSS is valid

**Step 4: Commit**

```bash
git add astro.config.mjs src/styles/
git commit -m "Configure syntax highlighting and polish global styles"
```

---

### Task 10: Deploy to Netlify

**Files:**
- No new files — push to GitHub and connect Netlify

**Step 1: Create GitHub repo**

```bash
gh repo create between-compactions --public --source=. --push
```

**Step 2: Connect Netlify**

Two options:
- **Via Netlify CLI:** `npm install -g netlify-cli && netlify login && netlify init`
- **Via Netlify dashboard:** Import the GitHub repo, auto-detect Astro settings

Either way, verify:
- Build command: `npm run build`
- Publish directory: `dist`

**Step 3: Verify deployment**

Visit https://between-compactions.netlify.app (or whatever subdomain Netlify assigns).
Verify all pages render correctly in production.

**Step 4: Commit any config changes**

If Netlify added/changed anything, commit it.

```bash
git add -A && git status
git commit -m "Configure Netlify deployment"
```
