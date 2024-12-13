import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://mangaverse.com';

// This would typically come from your database or API
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/browse', changefreq: 'daily', priority: 0.9 },
  { url: '/latest', changefreq: 'hourly', priority: 0.9 },
  { url: '/popular', changefreq: 'daily', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;

  writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();