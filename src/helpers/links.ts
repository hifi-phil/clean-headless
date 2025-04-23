import { ApiLinkModel, LinkTypeModel, IApiMediaWithCropsModel, SpacingPropertiesPropertiesModel, IApiElementModel } from "../api/model";

export interface Link {
  href?: string,
  label?: string;
  target?: string;
  newTab?: boolean;
  linkType?: LinkTypeModel;
}

export const LinksToLinkMap = (source: ApiLinkModel[]): Link | undefined => {
  if (source == null || source.length === 0) {
    return undefined;
  }

  const links = source.map(item => LinkMap(item));

  return links[0] || undefined;
};

export const LinksMap = (source: ApiLinkModel[]) : Link[] => {
  if (source == null) return [];
  return source
    .filter(item => item !== undefined)
    .map(item => LinkMap(item)!)
}

export const LinkMap = (source: ApiLinkModel) : Link | undefined => {
  if (source == null) return undefined;
  let href = source.url;
  if (source.route) {
    href = source.queryString ? `${source.route.path}${source.queryString}` : source.route.path
  }

  return {
    href: href!,
    label: source.title!,
    target: source.target!,
    linkType: source.linkType,
  };
}