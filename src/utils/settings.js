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
  catalogueUrl: process.env.CATALOGUE_URL,
  recommenderUrl: process.env.RECOMMENDER_URL,
  numRecommendations: process.env.NUM_RECOMMENDATIONS ?? 5,
  contractsPageSize: process.env.CONTRACTS_PAGE_SIZE ?? 5
}
Object.freeze(settings)

export default settings
