import { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/partials/pageHeader';
import { getAuthors, getPage } from '@/umbraco';
import { getDictionaryItems } from "@/helpers/dictionary";
import { ImagesToImageMap } from "@/helpers/image";
import { AuthorContentResponseModel, IApiMediaWithCropsModel, SEocontrolsContentResponseModel } from '@/api/model';
import { GetComponent } from '@/umbraco/components/GetComponent';
import { notFound } from 'next/navigation';
import { getMeta } from '@/helpers/metaHelper';
import { AUTHORS_PAGESIZE, AUTHORS_ROOT_SEGENT_NAME } from '../constants';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) : Promise<Metadata> {

  const { slug } = await params;

  const metaContent = await getPage<SEocontrolsContentResponseModel>(`${AUTHORS_ROOT_SEGENT_NAME}/${slug}`);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export async function generateStaticParams() {

  const authors = await getAuthors();
  const allSegments = authors.map((author) => ({
    page: author.route?.path?.split('/').filter((segment) => segment !== '') || [],
  })) 

  for (let i = 1; i <= Math.ceil(authors.length / AUTHORS_PAGESIZE); i++) {
    allSegments.push({
      page: [AUTHORS_ROOT_SEGENT_NAME, i.toString()]
    });
  }

  return allSegments;
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {

  const dictionaryItems = await getDictionaryItems();
  const { slug } = await params;

  const author = await getPage<AuthorContentResponseModel>(`authors/${slug}`);

  return (<>
      {author && <PageHeader content={author} />}
      <article>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">

                    <div className="row clearfix">
                        <div className="col-md-4 column mx-auto">
                            {getImage(author?.properties?.mainImage)}
                            <p className="caption">{author?.name}</p>
                        </div>
                    </div>

                    {author?.properties?.contentRows?.items?.map((item, index) => {
                      return GetComponent(dictionaryItems, item, index);
                    })}
                </div>
            </div>
        </div>
    </article>
    </>
  );
}

const getImage = (image: IApiMediaWithCropsModel[] | undefined | null) => {
  var el = ImagesToImageMap(image);
  if (el?.src)
    return (
      <Image
        src={el?.src}
        alt={el?.alt!}
        width={400}
        height={300}
        className="w-100"
      />
    );
  return undefined;
};

const processSlugs = (slug: any) => {

  let pageNo = 1;
  let authorSlug = undefined
  
  if(!isNaN(slug)) {
    pageNo = Number(slug);
  }
  else {
    authorSlug = slug;
  }

  return {
    authorSlug : authorSlug,
    pageNoSlug: pageNo
  }
}
