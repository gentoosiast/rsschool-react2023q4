export function generatePageNumbers(
  curPage: number,
  totalPages: number,
  paginationItems = 10,
): number[] {
  const pageNumbers = [];
  let start = Math.max(1, curPage - Math.floor(paginationItems / 2));
  const end = Math.min(totalPages, start + paginationItems - 1);

  if (end - start + 1 < paginationItems) {
    start = Math.max(1, end - paginationItems + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}
