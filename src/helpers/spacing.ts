import {
  SpacingPropertiesPropertiesModel,
  IApiElementModel,
} from "../api/model";

export function getSpacingClasses(
    paddingTop?: string | null,
    paddingBottom?: string | null,
    paddingLeft?: string | null,
    paddingRight?: string | null,
    marginTop?: string | null,
    marginBottom?: string | null,
    marginLeft?: string | null,
    marginRight?: string | null
  ): string {
    const classList: string[] = [
      getClassIfNotEmpty("pt-", paddingTop!),
      getClassIfNotEmpty("pb-", paddingBottom!),
      getClassIfNotEmpty("ps-", paddingLeft!),
      getClassIfNotEmpty("pe-", paddingRight!),
      getClassIfNotEmpty("mt-", marginTop!),
      getClassIfNotEmpty("mb-", marginBottom!),
      getClassIfNotEmpty("ms-", marginLeft!),
      getClassIfNotEmpty("me-", marginRight!),
    ];
  
    return classList.filter(Boolean).join(" ");
  }
  
  function getClassIfNotEmpty(prefix: string, value?: string): string {
    return value?.trim() ? `${prefix}${value}` : "";
  }

  export function getSpacingClass(settings?: IApiElementModel) {
    if (!settings) return "";
    let spacingClasses = "";
  
    if (settings.properties && "paddingTop" in settings.properties) {
      const spacing: SpacingPropertiesPropertiesModel =
        settings.properties as SpacingPropertiesPropertiesModel;
      spacingClasses = getSpacingClasses(
        spacing.paddingTop,
        spacing.paddingBottom,
        spacing.paddingLeft,
        spacing.paddingRight,
        spacing.marginTop,
        spacing.marginBottom,
        spacing.marginLeft,
        spacing.marginRight
      );
    }
  
    return spacingClasses;
  }