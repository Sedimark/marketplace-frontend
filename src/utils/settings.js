/**
 * Configuration settings for the application.
 *
 * @typedef {Object} Settings
 * @property {number} batchSize - The total of items per page.
 * @property {URL} federatedCatalogueApi - The URL for the federated catalogue API.
 * @property {URL} federatedCatalogueProviders - The URL for the federated catalogue providers API.
 * @property {URL} federatedCatalogueFilters - The URL for the federated catalogue filters API.
 */

/**
 * Application settings.
 *
 * @type {Settings}
 */
const settings = {
  batchSize: 40,
  federatedCatalogueApi: new URL('/query_page', process.env.FEDERATED_CATALOGUE_API),
  federatedCatalogueProviders: new URL('/api/providers', process.env.FEDERATED_CATALOGUE_API),
  federatedCatalogueFilters: new URL('/api/filters-data', process.env.FEDERATED_CATALOGUE_API)
}
Object.freeze(settings)

export default settings
