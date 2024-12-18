/**
 * Configuration settings for the application.
 *
 * @typedef {Object} Settings
 * @property {number} batchSize - The total of items per page.
 */

/**
 * Application settings.
 *
 * @type {Settings}
 */
const settings = {
  batchSize: process.env.BATCH_SIZE ?? 40,
  contractsPageSize: process.env.CONTRACTS_PAGE_SIZE ?? 5,
  federatedCatalogueApi: new URL('/query_page', process.env.FEDERATED_CATALOGUE_API),
  federatedCatalogueProviders: new URL('/api/providers', process.env.FEDERATED_CATALOGUE_API),
  federatedCatalogueFilters: new URL('/api/filters-data', process.env.FEDERATED_CATALOGUE_API)
}
Object.freeze(settings)

export default settings
