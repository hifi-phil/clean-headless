import { getContent20, getContentItemByPath20 } from "@/api/content/content";
import { ArticleContentResponseModel, AuthorContentResponseModel, ContentContentResponseModel, PagedIApiContentResponseModel, VisibilityControlsContentResponseModel } from "@/api/model";

export async function getPage<T>(handle: string): Promise<T | undefined> {

  const response = await getContentItemByPath20(handle, {}, {});

  if(response.status === 200) {

    const page : T = response.data as T;
    return page;

  }
  else {
    console.error("Error loading page");
    console.error("Error handle", handle);
    console.error("Error status", response.status);
    console.error("Error fetching page content", response.data);
  }
}

export async function getContentPages(): Promise<ContentContentResponseModel[]> {

  const response = await getContent20({
    filter: [`contentType:content`],
  }, {
    cache: 'no-store'
  });

  if(response.status === 200) {

    const data : PagedIApiContentResponseModel = response.data as PagedIApiContentResponseModel;
    return data.items.map((item) => item as ContentContentResponseModel);

  }
  else {
    console.error("Error status", response.status);
    console.error("Error fetching page content", response.data);
    return [];
  }
}

export async function getArticles(): Promise<ArticleContentResponseModel[]> {

    const response = await getContent20({
      filter: [`contentType:article`],
    }, {
      next: {
        tags: ['articles'],
        revalidate: false
      }
    });

    if(response.status === 200) {

      const data : PagedIApiContentResponseModel = response.data as PagedIApiContentResponseModel;
      return data.items.map((item) => item as ArticleContentResponseModel);
  
    }
    else {
      console.error("Error status", response.status);
      console.error("Error fetching page content", response.data);
      return [];
    }
}

export async function getAuthors(): Promise<AuthorContentResponseModel[]> {

  const response = await getContent20({
    filter: [`contentType:author`],
  }, {
    next: {
      tags: ['authors'],
      revalidate: false
    }
  });

  if(response.status === 200) {

    const data : PagedIApiContentResponseModel = response.data as PagedIApiContentResponseModel;
    return data.items.map((item) => item as AuthorContentResponseModel);

  }
  else {
    console.error("Error status", response.status);
    console.error("Error fetching page content", response.data);
    return [];
  }
}
  
export async function getNavigation(): Promise<VisibilityControlsContentResponseModel[]> {

    const response = await getContent20({
        fetch: "children:/",
        sort: ["sortOrder:asc"]
    }, {
      next: {
        tags: ['navigation'],
      }
    });

    if(response.status === 200) {
      const data : PagedIApiContentResponseModel = response.data as PagedIApiContentResponseModel;
      return data.items.map((item) => item as VisibilityControlsContentResponseModel).filter(item => item.properties?.hideFromTopNavigation === false) as VisibilityControlsContentResponseModel[];
    }
    else {
      console.error("Error status", response.status);
      console.error("Error fetching page content", response.data);
      return [];
    }
}
