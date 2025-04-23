import { IApiElementModel, LatestArticlesRowElementModel, LatestArticlesRowSettingsElementModel } from "@/api/model";
import { getArticles } from "@/umbraco";
import { getSpacingClass } from "@/helpers/spacing";
import { LatestArticlesRow } from "./latestAriclesRow";
import { Pagination } from "../partials/pagination";
import { ARTICLES_PAGESIZE } from "@/app/blog/constants";
import { TranslationModel } from "@/api-clean/model";

export const LatestArticles = async (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const { dictionary } = props;
    const pageNo = props.pageNo ?? 1;
    const content = props.content as LatestArticlesRowElementModel;
    const settings = props.settings as LatestArticlesRowSettingsElementModel;

    if (settings.properties?.hide ?? false) { return; }

    const spacingClasses = getSpacingClass(settings);
    const pageSize = ARTICLES_PAGESIZE;

    //really we should do this sorting on the server
    const allArticles = (await getArticles())?.sort((a, b) => {
        const dateA = a.properties?.articleDate ? new Date(a.properties.articleDate).getTime() : 0;
        const dateB = b.properties?.articleDate ? new Date(b.properties.articleDate).getTime() : 0;
        
        return dateB - dateA;
    });

    const pageOfArticles = allArticles.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    const totalItemCount = allArticles.length;
    const pageCount = totalItemCount > 0 ? Math.ceil(totalItemCount / pageSize) : 1;

    return (
        <div className={`row clearfix ${spacingClasses}`}>
            <div className="col-md-12 column">
                {pageOfArticles.map((article, index) => (<LatestArticlesRow key={index} dictionary={dictionary} article={article}/>))}
            </div>
            {content.properties?.showPagination && <Pagination pageCount={pageCount} pageNumber={pageNo} />}
        </div>  
    )
}

