import { ArticleContentModel, ArticleListContentModel, SEocontrolsContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getArticles, getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/helpers/dictionary";
import { ARTICLES_PAGESIZE, ARTICLES_ROOT_SEGENT_NAME } from "../constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeta } from "@/helpers/metaHelper";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) : Promise<Metadata> {

  const { slug } = await params;
  const { articleSlug } = processSlugs(slug);

  const metaContent = articleSlug ? await getPage<SEocontrolsContentResponseModel>(`${ARTICLES_ROOT_SEGENT_NAME}/${articleSlug}`) : await getPage<SEocontrolsContentResponseModel>(`${ARTICLES_ROOT_SEGENT_NAME}`);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export async function generateStaticParams() {

  const articles = await getArticles();
  const allSegments = articles.map((article) => ({
    page: article.route?.path?.split('/').filter((segment) => segment !== '') || [],
  })) 

  for (let i = 1; i <= Math.ceil(articles.length / ARTICLES_PAGESIZE); i++) {
    allSegments.push({
      page: [ARTICLES_ROOT_SEGENT_NAME, i.toString()]
    });
  }

  return allSegments;
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {

  const dictionaryItems = await getDictionaryItems();
  const { slug } = await params;
  const { articleSlug, pageNoSlug } = processSlugs(slug);

  const page = articleSlug ? await getPage<ArticleContentModel>(`${ARTICLES_ROOT_SEGENT_NAME}/${articleSlug}`) : await getPage<ArticleListContentModel>(`${ARTICLES_ROOT_SEGENT_NAME}`);

  return (
    <>
      {page && <PageHeader content={page} isArticle />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {page?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index, pageNoSlug);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

const processSlugs = (slug: any) => {

  let pageNo = 1;
  let articleSlug = undefined
  
  if(!isNaN(slug)) {
    pageNo = Number(slug);
  }
  else {
    articleSlug = slug;
  }

  return {
    articleSlug : articleSlug,
    pageNoSlug: pageNo
  }
}