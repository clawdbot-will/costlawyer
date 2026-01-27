import { SitemapStream, streamToPromise } from 'sitemap';
import { Case, Service, News, TeamMember } from '@shared/schema';
import { Request, Response } from 'express';
import { IStorage } from './storage';

/**
 * Generates and serves an XML sitemap for search engines
 */
export async function generateSitemap(req: Request, res: Response, storage: IStorage) {
  try {
    const [cases, services, news, teamMembers] = await Promise.all([
      storage.getCases(),
      storage.getServices(),
      storage.getNews(),
      storage.getTeamMembers()
    ]);

    const hostname = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
    
    // Create a sitemap stream
    const smStream = new SitemapStream({ hostname });
    
    // Add static pages
    smStream.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
    smStream.write({ url: '/cases', changefreq: 'daily', priority: 0.9 });
    smStream.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });
    smStream.write({ url: '/community', changefreq: 'weekly', priority: 0.7 });
    smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });
    smStream.write({ url: '/team', changefreq: 'monthly', priority: 0.7 });
    
    // Add dynamic case law pages
    for (const caseItem of cases) {
      smStream.write({
        url: `/cases/${caseItem.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date(caseItem.date).toISOString()
      });
    }
    
    // Add dynamic service pages
    for (const service of services) {
      smStream.write({
        url: `/services/${service.slug}`,
        changefreq: 'monthly',
        priority: 0.7
      });
    }
    
    // Add news/blog pages
    for (const newsItem of news) {
      smStream.write({
        url: `/news/${newsItem.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: newsItem.date ? new Date(newsItem.date).toISOString() : undefined
      });
    }
    
    // Add team member pages
    for (const member of teamMembers) {
      smStream.write({
        url: `/team/${member.id}`,
        changefreq: 'monthly',
        priority: 0.6
      });
    }
    
    // End the stream
    smStream.end();
    
    // Stream the response as XML
    const sitemap = await streamToPromise(smStream);
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toString());
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}