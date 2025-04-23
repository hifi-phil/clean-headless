import { getArticles, getContentPages } from '@/umbraco';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const items : MetadataRoute.Sitemap = [];

  const domain = "http://localhost:23142";

  items.push({
    url: domain,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  const pages = await getContentPages(); 
  pages.forEach(item => {
    items.push({
      url: `${domain}${item.route?.path}`,
      lastModified: item.updateDate?.toString(),
      changeFrequency: 'weekly',
      priority: 1,
    })
  });

  items.push({
    url: `${domain}/contact/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  items.push({
    url: `${domain}/search/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  const articlePages = await getArticles();

  items.push({
    url: `${domain}/blog/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  if(articlePages.length > 0) {
    articlePages.forEach(item => {
      items.push({
        url: `${domain}${item?.route?.path}`,
        lastModified: item.updateDate?.toString(),
        changeFrequency: 'weekly',
        priority: 1,
      }) 
    });
  }

  return items;

}