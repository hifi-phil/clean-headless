import { SearchContentResponseModel, SEocontrolsContentModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { getDictionaryItems } from "@/helpers/dictionary";
import SearchForm from "./searchForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeta } from "@/helpers/metaHelper";

const path = '/search/';

export async function generateMetadata() : Promise<Metadata> {

  const metaContent = await getPage<SEocontrolsContentModel>(path);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function Page() {

  const dictionaryItems = await getDictionaryItems();
  const pageContent = await getPage<SearchContentResponseModel>(path);

  if (!pageContent) return notFound();

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <div className="container">
        <SearchForm dictionaryItems={dictionaryItems} />
      </div>
    </>
  );
}