'use client'
 
export default function UmbracoMediaLoader({ src, width , quality } : { src: string, width: string, quality: string }) {
  return `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}${src}?w=${width}&q=${quality || 75}`
}