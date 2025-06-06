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
  batchSize: process.env.BATCH_SIZE ?? 10,
  catalogueUrl: process.env.CATALOGUE_URL,
  recommenderUrl: process.env.RECOMMENDER_URL,
  brokerUrl: process.env.BROKER_URL,
  dltBoothUrl: process.env.DLT_BOOTH_URL,
  keywordsSeparator: ';',
  numRecommendations: process.env.NUM_RECOMMENDATIONS ?? 5,
  contractsPageSize: 5,
  connectorUrl: process.env.CONNECTOR_URL
}
Object.freeze(settings)

export default settings
