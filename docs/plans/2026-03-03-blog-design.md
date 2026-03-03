# Between Compactions — Blog Design

## Concept

"Between Compactions" is a blog about experiences working with AI. The name refers to
the context window as lived experience — the ephemeral space of real collaboration
between an AI's context resets. Each conversation builds shared understanding,
collaborative momentum, and then compacts or ends. The meaning lives in the transient.

Tagline from William Blake's "Auguries of Innocence":

> Hold Infinity in the palm of your hand,
> And Eternity in an hour.

The Blake connection: a good AI session feels like holding something expansive and
powerful, but bounded. An hour. A context window. Then it's gone.

## Technology

- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS
- **Hosting:** Netlify (free tier, auto-deploy from GitHub)
- **Domain:** between-compactions.netlify.app (custom domain later)
- **Authoring:** Markdown files in the repo with frontmatter

## Architecture

```
between-compactions/
├── src/
│   ├── content/
│   │   └── blog/              # Markdown posts
│   ├── layouts/
│   │   ├── Base.astro         # HTML shell, fonts, meta
│   │   └── Post.astro         # Blog post layout
│   ├── pages/
│   │   ├── index.astro        # Homepage (post list)
│   │   ├── about.astro        # About page
│   │   ├── blog/[...slug].astro  # Individual posts
│   │   └── rss.xml.ts         # RSS feed
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro     # Post preview on homepage
│   │   └── TagList.astro
│   └── styles/
│       └── global.css         # Tailwind + custom styles
├── public/                    # Static assets
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Content Model

Post frontmatter:

```yaml
---
title: "Post Title"
date: 2026-03-03
tags: ["ai", "collaboration"]
description: "A short description for RSS and previews"
---
```

Content collections with Astro's built-in schema validation.

## Visual Design

Dark and mystical — contemplative, not corporate.

- **Background:** Deep near-black (#0a0a0f) with subtle texture or gradient
- **Text:** Warm off-white (#e8e0d4), not harsh pure white
- **Accent:** Muted gold (#c9a84c) or deep violet (#7b5ea7) for links/highlights
- **Headings:** Serif (Playfair Display or Crimson Text)
- **Body text:** Readable serif (Lora or Source Serif)
- **Code blocks:** Slightly lighter dark background, monospace, tasteful syntax highlighting
- **Overall feel:** Like reading by candlelight. Quiet, contemplative, mysterious.

The Blake quote sits as a persistent subtle element in header or footer.

No hero images, no sidebar widgets, no noise. The writing is the point.

## Pages

### Homepage
Chronological post list (newest first). Each entry: title, date, description, tags.
No pagination initially.

### About
First-person account of the "between compactions" concept:
- What it means to work alongside AI in the context window
- The ephemeral collaboration — building shared understanding that resets
- The Blake connection — holding infinity in bounded time
- The blog as a space to capture what happens in those transient moments

### Individual Posts
Title, date, tags, full content. Clean and focused.

### RSS Feed
Full content feed using Astro's RSS integration.

## Launch Content

An inaugural post adapting the "between compactions" concept as a proper essay —
so the site doesn't launch empty.
