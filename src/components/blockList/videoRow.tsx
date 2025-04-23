import { TranslationModel } from "@/api-clean/model";
import { IApiElementModel, VideoRowPropertiesModel, VideoRowSettingsPropertiesModel } from "@/api/model";
import { getSpacingClass } from "@/helpers/spacing";
import { getYouTubeVideoId } from "@/helpers/youtube";

export const VideoRow = async (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content?.properties as VideoRowPropertiesModel;
    const settings = props.settings?.properties as VideoRowSettingsPropertiesModel;

    if (settings?.hide ?? false) { return; }
    if (!content.videoUrl) { return; }

    const spacingClasses = getSpacingClass(props.settings);

    var videoId = getYouTubeVideoId(content.videoUrl);

    return (
        <div className={`row clearfix ${spacingClasses}`}>
            <div className="col-md-12 column">
                <iframe 
                    width="100%" 
                    height="400" 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                {content.caption && <p className="caption video-caption">{content.caption}</p>}
            </div>
        </div>
    )
}