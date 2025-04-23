"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getDictionValue } from "@/helpers/dictionary";
import { useState } from "react";
import { SearchResultsModel, TranslationModel } from "@/api-clean/model";
import { getSearchResults } from './searchServerFetch';
import HTMLParser from 'html-react-parser';
import Link from 'next/link';

export default function SearchForm(props: { dictionaryItems: TranslationModel[] }) {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResultsModel>();

  const fetchResults = async () => {
    const response = await getSearchResults(searchQuery);
    if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setResults(response.data);
  }

  const formatString = (template: string | undefined, ...values: (string | number)[]): string => {
    if(!template) return "";
    return template.replace(/{(\d+)}/g, (match, index) => {
      const value = values[parseInt(index, 10)];
      return value !== undefined ? String(value) : match;
    });
  };


  return (
    <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
            <div className="form-group controls">
                <input required type="text" className="form-control col-xs-6" placeholder={getDictionValue(props.dictionaryItems, "Search.Placeholder")} name="q" onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
        </div>
        <div className="col-lg-8 col-md-10 mx-auto my-3">
            <div className="form-group">
                <button className="btn btn-primary search-button float-end" onClick={fetchResults}>{getDictionValue(props.dictionaryItems, "Search.SearchButton")} <FontAwesomeIcon icon={faSearch} /></button>
            </div>
        </div>
        <div className="col-lg-8 col-md-10 mx-auto">
            {
                results && results.count && results.count > 0 && (
                    <>
                        {HTMLParser(formatString(getDictionValue(props.dictionaryItems, "Search.Results"), results.count, searchQuery))}
                        {results.items?.map((item, index) => (
                            <>
                                <div className="post-preview">
                                    <Link href={item.url!} key={index}>
                                        <h2 className="post-title">
                                            {item.title ? item.title : item.contentName}
                                        </h2>
                                        {item.subtitle && <h3 className="post-subtitle">{item.subtitle}</h3>}
                                         <span className="post-meta">
                                            {item.articleDate && (
                                                <>
                                                    {getDictionValue(props.dictionaryItems, "Article.Posted")}
                                                    &nbsp;
                                                    {item.author && (
                                                        <>
                                                            {getDictionValue(props.dictionaryItems, "Article.By")}
                                                            &nbsp;
                                                            {item.author}
                                                        </>
                                                    )}
                                                    &nbsp;
                                                    {getDictionValue(props.dictionaryItems, "Article.On")}
                                                    &nbsp;
                                                    {item.articleDate && (item.articleDate)}
                                                </>
                                            )}
                                        </span>
                                    </Link>
                                </div>
                                <hr/>
                            </>
                        ))}
                    </>
                )
            }
        </div>
    </div>
  );
}