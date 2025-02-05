/**
 * Calculates the items to be displayed on the current page and updates the view.
 *
 * @param {number} currentPage - The current page number.
 * @param {Object} settings - The settings object containing the batch size.
 * @param {number} settings.batchSize - The number of items to display per page.
 * @param {Object} data - The data object containing the total number of items and the results array.
 * @param {number} data.total - The total number of items.
 * @param {Array} data.results - The array of items.
 * @param {Function} setVcs - The function to update the view with the items for the current page.
 */
export function calculateItemsPerPage (currentPage, settings, data, setVcs) {
  const startIndex = (currentPage - 1) * settings.batchSize
  const endIndex = (currentPage * settings.batchSize) > data.total ? data.total : currentPage * settings.batchSize
  setVcs(data.slice(startIndex, endIndex))
}

/**
   * Calculates the total number of pages based on the total number of VCs and the batch size.
   *
   * @param {number} totalVcs - The total number of VCs.
   * @param {number} batchSize - The batch size.
   * @returns {number} The total number of pages.
   */
export function calculateTotalPages (totalVcs, batchSize) {
  return Math.ceil((totalVcs || 0) / batchSize)
}
