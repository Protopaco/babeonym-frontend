# [121] Light SEO

## Status

Backlog

## Summary

Enough for search engines to list the site sensibly once it's registered with
Google Search Console and Bing Webmaster Tools. Not a content strategy.

## Context

- `index.html` has a title and nothing else: no description, no link-preview
  tags.
- No `robots.txt` or `sitemap.xml` in `public/`.
- It's a single-page app, so every route serves the same head. Fine for a site
  this size.

## Requirements

- Meta description and Open Graph/Twitter tags (title, description, image) in
  `index.html`.
- `robots.txt` and `sitemap.xml` listing `/` and `/privacy`.
- Paul registers the site and verifies ownership (DNS or meta tag).

## Open

- Should `/theme` (the theme test page) be in production at all? At minimum keep
  it out of the sitemap.
- A link-preview image needs making.

## Acceptance Criteria

- Sharing the link shows a title, description and image.
- `robots.txt` and `sitemap.xml` are served from the site root.
