import { ArticleControlsPropertiesModel, HeaderControlsPropertiesModel, IApiContentResponseModel, MainImageControlsPropertiesModel } from "@/api/model"
import { getDictionaryItems, getDictionValue } from "@/helpers/dictionary";
import { ImagesToImageMap } from "@/helpers/image";
import React from "react";

export const PageHeader = async (props: { content: IApiContentResponseModel, isArticle?: boolean }) => {

    const dictionary = await getDictionaryItems();
    
    const mainImageControls : MainImageControlsPropertiesModel  = props.content.properties as MainImageControlsPropertiesModel;
    const mainBackgroundImage = mainImageControls?.mainImage ? ImagesToImageMap(mainImageControls.mainImage)?.src : "";

    const headerControls = props.content.properties as HeaderControlsPropertiesModel;
    const articleControls = props.content.properties as ArticleControlsPropertiesModel;

    return (<header className="masthead" style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}${mainBackgroundImage}')` }}>
        <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className={articleControls?.articleDate ? "post-heading" : "site-heading"}>
                        <h1>{headerControls.title ? headerControls.title : props.content.name}</h1>
                        {
                            props.isArticle ? (
                                <>
                                    {headerControls && headerControls.subtitle && <h2 className="subheading mb-4">{headerControls.subtitle}</h2>}
                                    <span className="meta">
                                        {articleControls.articleDate && (
                                            <>
                                                {getDictionValue(dictionary, "Article.Posted")}
                                                &nbsp;
                                                {articleControls.author && articleControls.author.length > 0 && (
                                                    <>
                                                        {getDictionValue(dictionary, "Article.By")}
                                                        &nbsp;
                                                        {articleControls.author[0].name}
                                                    </>
                                                )}
                                                &nbsp;
                                                {getDictionValue(dictionary, "Article.On")}
                                                &nbsp;
                                                {articleControls.articleDate && new Date(articleControls.articleDate).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
                                            </>
                                        )}
                                    </span>
                                    {articleControls.categories && articleControls.categories.length > 0 && (
                                        <>
                                            <span className="mt-4 d-block"></span>
                                            {articleControls.categories?.map((category, index) => (
                                                <React.Fragment key={index}>
                                                    <span className="badge rounded-pill bg-light text-dark border-dark border-5">{category.name}</span>
                                                    &nbsp;
                                                </React.Fragment>
                                            ))}

                                        </>
                                    )}
                                </>
                            ) : (headerControls && headerControls.subtitle && <h2 className="subheading mb-4">{headerControls.subtitle}</h2>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </header>)
}