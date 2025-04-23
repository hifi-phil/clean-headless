"use server";
import { getApiV1SearchGetSearchResults } from "@/api-clean/search/search";

export const getSearchResults = async (searchQuery : string) => {
    return getApiV1SearchGetSearchResults({
        searchQuery: searchQuery,
    })
}