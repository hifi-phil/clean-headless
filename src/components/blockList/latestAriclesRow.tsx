import { TranslationModel } from "@/api-clean/model";
import { ArticleContentResponseModel, AuthorContentResponseModel } from "@/api/model";
import { getDictionValue } from "@/helpers/dictionary";
import Link from "next/link";

export const LatestArticlesRow = (props : {dictionary: TranslationModel[], article: ArticleContentResponseModel}) => {

    const { article, dictionary } = props;

    if(!article || ! article.properties) return null;

    const author = Array.isArray(article.properties.author) 
        ? article.properties.author[0] as AuthorContentResponseModel 
        : undefined;
    const showFullArticleOnListPage = article.properties.showFullArticleOnListPage ?? false;

    const articleDate = new Date(article.properties.articleDate?.toString() ?? "");

    return (
        <div key={article.id} className="post-preview">
            <Link href={article.route?.path!}>
                <h2 className="post-title">{article.properties?.title ? article.properties.title : article.name}</h2>
                {article.properties?.subtitle && <h3 className="post-subtitle">{article.properties.subtitle}</h3>}
            </Link>
            <p className="post-meta">
                {getDictionValue(dictionary, "Article.Posted")}
                {getDictionValue(dictionary, "Article.By")} {author?.name}
                {getDictionValue(dictionary, "Article.On")} {articleDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </p>
            {showFullArticleOnListPage && article.properties.categories && article.properties.categories.length > 0 && (
                <>
                    <span className="mt-2 d-block"></span>
                    {article.properties.categories
                    .map(category => category.name)
                    .sort((a, b) => a!.localeCompare(b!))
                    .map((category, index) => (
                        <span key={index} className="badge rounded-pill bg-light text-dark border-dark border-5">
                            {category}
                        </span>
                    ))}
                </>
            )}

            <hr/>
        </div>
    )

}