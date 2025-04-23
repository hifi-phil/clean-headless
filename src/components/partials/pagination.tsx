import { ARTICLES_ROOT_SEGENT_NAME } from "@/app/blog/constants";
import { getDictionaryItems, getDictionValue } from "@/helpers/dictionary";

export const Pagination = async (props: PaginationProps) => {
  const dictionary = await getDictionaryItems();

  const { pageCount, pageNumber, showFirst } = props;

  if (pageCount <= 1) return null;

  const pageNumbersEitherSide = 1;

  const pageNumberStart = () => {
    if (pageNumber - pageNumbersEitherSide <= 0) {
      return 1;
    }
    return pageNumber - pageNumbersEitherSide;
  };

  const pageNumberEnd = () => {
    if (pageNumber + pageNumbersEitherSide > pageCount) {
      return pageCount;
    }
    return pageNumber + pageNumbersEitherSide;
  };

  const createPageLink = (page: number): string => `/${ARTICLES_ROOT_SEGENT_NAME}/${page}`;

  const pageItems: React.ReactNode[] = [];

  for (let p = pageNumberStart(); p <= pageNumberEnd(); p++) {
    const isCurrentPage = p === pageNumber;

    pageItems.push(
      <li className="page-item" key={p}>
        {isCurrentPage ? (
          <strong>
            <a className="page-link text-primary" href={createPageLink(p)}>
              {p}
            </a>
          </strong>
        ) : (
          <a className="page-link" href={createPageLink(p)}>
            {p}
          </a>
        )}
      </li>
    );
  }

  return (
    <nav aria-label="Pagination controls">
      <ul className="pagination justify-content-center">
        {pageNumber > 1 && (
          <li className="page-item">
            <a
              className="page-link text-primary"
              href={createPageLink(pageNumber - 1)}
            >
              {getDictionValue(dictionary, "Paging.Previous") || "Previous"}
            </a>
          </li>
        )}

        {showFirst && (
          <>
            <li className="page-item">
              <a className="page-link" href={createPageLink(1)}>
                1
              </a>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}

        {pageItems}

        {pageNumber < pageCount && (
          <li className="page-item">
            <a
              className="page-link text-primary"
              href={createPageLink(pageNumber + 1)}
            >
              {getDictionValue(dictionary, "Paging.Next") || "Next"}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

interface PaginationProps {
  pageCount: number;
  pageNumber: number;
  showFirst?: boolean;
}
