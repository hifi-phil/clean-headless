import { TranslationModel } from "@/api-clean/model";
import { IApiElementModel, RichTextRowElementModel } from "@/api/model";
import { getSpacingClass } from "@/helpers/spacing";
import HTMLParser from 'html-react-parser';

export const RichTextRow = async (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content as RichTextRowElementModel;

    
    if(!content || !content.properties || !content.properties.content) return null;
    const spacingClasses = getSpacingClass(props.settings);

    return (
        <div className={`richtext ${spacingClasses}`}>
            {HTMLParser(content.properties.content.markup)}
        </div>
    )
}