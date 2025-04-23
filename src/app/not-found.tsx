import { ErrorContentResponseModel, SEocontrolsContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getMeta } from "@/helpers/metaHelper";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/helpers/dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const path = '/error/';

export async function generateMetadata() : Promise<Metadata> {

  const metaContent = await getPage<SEocontrolsContentResponseModel>(path);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function NotFound() {

  const dictionaryItems = await getDictionaryItems();
  const errorContent = await getPage<ErrorContentResponseModel>(path);

  if (!errorContent) return notFound();

  return (
    <>
      {errorContent && <PageHeader content={errorContent} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {errorContent?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}