import { IApiMediaWithCropsModel } from "../api/model";

export interface Image {
    src?: string;
    alt?: string;
  }

export const ImageMap = (source?: IApiMediaWithCropsModel | null): Image | undefined => {
    if (!source) return undefined;
    return {
      src: source.url,
    }
  }

export const ImagesToImageMap = (source?: IApiMediaWithCropsModel[] | null): Image | undefined => {
    if (source == null || source.length === 0 || source === undefined) {
      return undefined;
    }
  
    const links = source.map(item => ImageMap(item));
  
    return links[0] || undefined;
  };

export const ImagesToImagesMap = (source?: IApiMediaWithCropsModel[] | null): Image[] => {
    if (source == null || source.length === 0 || source === undefined) {
      return [];
    }
  
    const links = source.map(item => ImageMap(item)).filter(item => item !== undefined);
  
    return links || [];
  };