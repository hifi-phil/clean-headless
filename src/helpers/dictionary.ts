import { TranslationModel } from "../api-clean/model";
import { getApiV1DictionaryGetdictionarytranslations } from "../api-clean/translation/translation";

export const getDictionValue = (
  dictionaryItems: TranslationModel[] | undefined,
  key: string
): string | undefined => {
  if (dictionaryItems === undefined) return undefined;
  const output = dictionaryItems.find((item) => item.key === key)?.value;
  return output === null ? undefined : output;
};

export const getDictionaryItems = async (): Promise<TranslationModel[]> => {
  try {
    const response = await getApiV1DictionaryGetdictionarytranslations();

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dictionaryItems = await response.data;
    return dictionaryItems;
  } catch (error) {
    console.error("Error fetching dictionary items:", error);
    return [];
  }
};
