import { ContactContentResponseModel, SEocontrolsContentModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { getDictionaryItems } from "@/helpers/dictionary";
import ContactForm from "./contactForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeta } from "@/helpers/metaHelper";

const path = '/contact/';

export async function generateMetadata() : Promise<Metadata> {

  const metaContent = await getPage<SEocontrolsContentModel>(path);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function Page() {

  const dictionaryItems = await getDictionaryItems();
  const pageContent = await getPage<ContactContentResponseModel>(path);

  if (!pageContent) return notFound();

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <ContactForm dictionaryItems={dictionaryItems} pageContent={pageContent}/>
                </div>
            </div>
          </div>
      </main>
    </>
  );
}