import { TranslationModel } from "@/api-clean/model";
import { ApiBlockItemModel, HomeContentResponseModel, IconLinkRowElementModel } from "@/api/model"
import { getDictionValue } from "@/helpers/dictionary";
import { ImagesToImageMap } from "@/helpers/image";
import { LinksToLinkMap } from "@/helpers/links";
import Image from "next/image";

export const Footer = (props: { dictionary?: TranslationModel[], homePage?: HomeContentResponseModel }) => {

    const content = props.homePage?.properties;

    return (
        <footer>
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {content?.socialIconLinks && content.socialIconLinks.items && content.socialIconLinks.items?.length > 0 && 
                            <ul className="list-inline text-center">
                                {content.socialIconLinks.items.map((item : ApiBlockItemModel, index) => {
                                    var row = item.content as IconLinkRowElementModel;
                                    if(row.properties?.link && row.properties?.icon) {
                                        var link = LinksToLinkMap(row.properties?.link);
                                        var image = ImagesToImageMap(row.properties?.icon);
                                        return (
                                        <li key={index} className="list-inline-item">
                                            <a href={link?.href} target={link?.target} title={link?.label}>
                                                <Image src={image?.src!} alt={link?.label!} width={40} height={40} />
                                            </a>
                                        </li>
                                        )
                                    }
                                })}
                            </ul>
                        }
                        <p className="small text-center text-muted fst-italic">{getDictionValue(props.dictionary, "Footer.CopyrightTitle")} &copy; {new Date().getFullYear()} {getDictionValue(props.dictionary, "Footer.CopyrightStatement")}</p>
                        <p className="small text-center text-muted fst-italic">Theme by <a href="https://startbootstrap.com/" target="_blank" rel="noopener">Start Bootstrap</a>, implemented in Umbraco by Paul Seal from <a href="https://codeshare.co.uk" target="_blank" rel="noopener">codeshare.co.uk</a></p>
                    </div>
                </div>
            </div>
        </footer>     
    )
}