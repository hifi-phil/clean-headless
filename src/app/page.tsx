import { HomeContentResponseModel, SEocontrolsContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getMeta } from "@/helpers/metaHelper";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/helpers/dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata() : Promise<Metadata> {

  const metaContent = await getPage<SEocontrolsContentResponseModel>('');

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function Home() {

  const dictionaryItems = await getDictionaryItems();
  const homePage = await getPage<HomeContentResponseModel>("");

  if (!homePage) return notFound();

  return (
    <>
      {homePage && <PageHeader content={homePage} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {homePage?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
