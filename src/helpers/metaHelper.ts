import { SEocontrolsContentResponseModel } from "@/api/model";

export const getMeta = (metaContent?: SEocontrolsContentResponseModel) => {
    const shouldIndex = metaContent?.properties?.isIndexable !== false;
    const shouldFollow = metaContent?.properties?.isFollowable !== false;
  
    return {
      title: metaContent?.properties?.metaName || metaContent?.name || '',
      description: metaContent?.properties?.metaDescription || '',
      keywords: metaContent?.properties?.metaKeywords || '',
      robots: {
        index: shouldIndex,
        follow: shouldFollow,
      },
    };
  }