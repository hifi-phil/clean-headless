import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionaryItems, getDictionValue } from "@/helpers/dictionary";
import { ImagesToImageMap } from "@/helpers/image";
import { getAuthors, getPage } from "@/umbraco";
import { PageHeader } from "@/components/partials/pageHeader";
import {
  AuthorListContentResponseModel,
  IApiMediaWithCropsModel,
} from "@/api/model";
import { notFound } from "next/navigation";

const path = "/authors/";

export const metadata: Metadata = {
  title: "Authors",
  description: "Meet our authors",
};

const getImage = (image: IApiMediaWithCropsModel[] | undefined | null) => {
  var el = ImagesToImageMap(image);
  if (el?.src)
    return (
      <Image
        src={el?.src}
        alt={el?.alt!}
        width={400}
        height={300}
        className="card-img-top"
      />
    );
  return undefined;
};

export default async function AuthorsPage() {
  const dictionaryItems = await getDictionaryItems();
  const authorsList = await getPage<AuthorListContentResponseModel>(path);

  if (!authorsList) return notFound();

  const authors = await getAuthors();

  return (
    <>
      {authorsList && <PageHeader content={authorsList} />}

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="container-fluid">
              <div className="row">
                {authors?.map((author) => (
                  <div key={author.id} className="col-4 mx-auto">
                    <div className="card">
                      <header>{getImage(author.properties?.mainImage)}</header>
                      <div className="card-body">
                        <div className="content-left text-start my-auto py-4">
                          <h2 className="card-title">{author.name}</h2>
                          <p className="card-description">
                            {author.properties?.metaDescription}
                          </p>
                          <Link href={author.route?.path!} className="text-primary">
                            {getDictionValue(
                              dictionaryItems,
                              "Author.ReadMore"
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
