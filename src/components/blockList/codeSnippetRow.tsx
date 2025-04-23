"use client";
import { TranslationModel } from "@/api-clean/model";
import { CodeSnippetRowPropertiesModel, CodeSnippetRowSettingsPropertiesModel, IApiElementModel } from "@/api/model";
import { getSpacingClass } from "@/helpers/spacing";
import Highlight from 'react-highlight'

export const CodeSnippetRow = (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content?.properties as CodeSnippetRowPropertiesModel;
    const settings = props.settings?.properties as CodeSnippetRowSettingsPropertiesModel;

    if (settings?.hide ?? false) return null;

    const spacingClasses = getSpacingClass(props.settings);

    return (
        <div className={`row clearfix ${spacingClasses}`}>
            <div className="col-md-12 column">
                <Highlight className='vs2015t'>
                    {content.code}
                </Highlight>
                {content.title && <p className="caption">{content.title}</p>}
            </div>
        </div>
    )
}