import { ArticleListContentModel, SEocontrolsContentModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getMeta } from "@/helpers/metaHelper";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/helpers/dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const path = '/blog/';

export async function generateMetadata() : Promise<Metadata> {

  const metaContent = await getPage<SEocontrolsContentModel>(path);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function ArticleListing() {

  const dictionaryItems = await getDictionaryItems();
  const articleList = await getPage<ArticleListContentModel>(path);

  if (!articleList) return notFound();

  return (
    <>
      {articleList && <PageHeader content={articleList} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {articleList?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}