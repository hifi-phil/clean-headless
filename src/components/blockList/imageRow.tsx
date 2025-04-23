import { TranslationModel } from "@/api-clean/model";
import { IApiElementModel, ImageRowPropertiesModel } from "@/api/model";
import { getSpacingClass } from "@/helpers/spacing";
import { ImagesToImageMap } from "@/helpers/image";
import Image from "next/image";

export const ImageRow = async (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content?.properties as ImageRowPropertiesModel;

    const image = ImagesToImageMap(content.image)
    const spacingClasses = getSpacingClass(props.settings);

    if(!image) return null;

    return (
        <div className={`image ${spacingClasses}`}>
            <Image src={image.src!} alt={image.alt!} width={800} height={600} />
            {content.caption && <p className="caption">{content.caption}</p>}
        </div>
    )
}