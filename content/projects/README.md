# Projects

Each `.mdx` file in this folder is one project page. The file name must match `slug`.

## Add a project

1. Copy an existing file and rename it, for example `my-project.mdx`.
2. Edit the front matter (the block between the `---` lines). The fields are defined and checked in `src/lib/projects.ts`.
3. Put images in `public/projects/<slug>/` and reference them as `/projects/<slug>/image.png`.
4. Run `npm run build`. A missing or wrong field stops the build and names the file and the field.

## Status

- `planned` and `in-progress`: the page shows the summary, status and spec. No body is needed.
- `live`: the build also requires `date`, `headlineResult`, at least one link, and these two sections in the body:

```md
## How I tested it

## What broke and what I learned
```

Other sections (Problem, Data, Approach, Results, Limitations and next steps) are written as `##` headings in the same way.

## Other fields

- `tier`: `flagship`, `gap` or `coursework`. Coursework projects also need `course`.
- `draft: true` hides a project from the production build.
- `order` sets the position within its tier.
