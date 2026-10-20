import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import mdx from '@astrojs/mdx'

// Served under /skills/ on dunky.dev: the main site (dunky-dev/website) rewrites
// /skills/* to this deployment, the same way it does for /state-machine/*.
// BASE_PATH overrides it (e.g. '/' for an isolated local preview).
const base = process.env.BASE_PATH ?? '/skills/'
const basePrefix = base.replace(/\/$/, '')

// Astro does not prepend `base` to root-absolute markdown links, so they 404
// under a non-root base. Rewrite internal root-absolute hrefs to include it.
function rehypeBaseLinks() {
  type Node = { type: string; tagName?: string; properties?: { href?: unknown }; children?: Node[] }
  const walk = (node: Node) => {
    if (node.tagName === 'a') {
      const href = node.properties?.href
      if (
        typeof href === 'string' &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !(basePrefix && (href === basePrefix || href.startsWith(`${basePrefix}/`)))
      ) {
        node.properties!.href = `${basePrefix}${href}`
      }
    }
    if (node.children) for (const child of node.children) walk(child)
  }
  return (tree: Node) => walk(tree)
}

export default defineConfig({
  site: 'https://www.dunky.dev',
  base,
  trailingSlash: 'never',
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  integrations: [
    starlight({
      title: 'Dunky skills',
      favicon: '/logo/logo-symbol.svg',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/svg+xml',
            href: `${basePrefix}/logo/logo-symbol-white.svg`,
            media: '(prefers-color-scheme: dark)',
          },
        },
      ],
      logo: {
        light: './public/logo/logo.svg',
        dark: './public/logo/logo-white.png',
        replacesTitle: true,
      },
      customCss: ['./src/styles/starlight.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/dunky-dev/skills' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Install', link: 'install' },
            { label: 'The big picture', link: 'big-picture' },
          ],
        },
        {
          label: 'Skills',
          items: [
            { label: 'Scout', link: 'skills/scout' },
            { label: 'Dev', link: 'skills/dev' },
            { label: 'Rubber duck', link: 'skills/rubber-duck' },
            { label: 'Spike', link: 'skills/spike' },
            { label: 'Brawl', link: 'skills/brawl' },
            { label: 'Red vs Blue', link: 'skills/red-vs-blue' },
          ],
        },
        { label: 'Standards', items: [{ label: 'What a standard is', link: 'standards' }] },
      ],
    }),
    mdx(),
  ],
})
