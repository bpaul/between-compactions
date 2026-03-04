# Sidebar Layout + Post Images Design

## Summary

Redesign the blog layout from single-column with top nav to a Strata-inspired
two-column layout: fixed sidebar on the left, scrollable content on the right.
Add hero images to blog posts.

## Layout

- **Sidebar:** ~280px fixed, full viewport height, dark background
- **Content area:** fills remaining width, scrolls independently
- **Mobile (<768px):** sidebar content collapses to compact horizontal header

### Sidebar Content

1. Thematic image (mystical/abstract, not an avatar)
2. Site name "Between Compactions" in heading font
3. Blake quote ("Hold Infinity..."), subtle/muted
4. Navigation: Blog, About, RSS
5. Divider between quote and nav

### Content Area

- Homepage: post list with thumbnail images
- Post pages: hero image above title, then content
- About page: prose content (no hero image)
- Footer lives inside the content area, not the sidebar

## Post Images

- New optional `image` field in blog post frontmatter
- Path to image in `/public/images/`
- Hero banner at top of post page (full content-area width)
- Thumbnail on homepage post cards

### Schema Change

```yaml
---
title: "Post Title"
date: 2026-03-03
description: "Description"
tags: ["tag"]
image: "/images/post-image.jpg"  # optional
---
```

## Files to Change

- **Base.astro** — two-column layout (fixed sidebar + scrollable content), remove Header import
- **New: Sidebar.astro** — replaces Header.astro
- **Header.astro** — removed (replaced by Sidebar)
- **Footer.astro** — kept, moves inside content area
- **PostCard.astro** — add thumbnail image display
- **Post.astro** — add hero image above title
- **content.config.ts** — add optional `image` field to schema
- **global.css** — any layout-level CSS needed for fixed sidebar
- **Mobile breakpoint** — sidebar collapses to compact top section at <768px
