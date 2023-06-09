const ENVIRONMENT = process.env.NODE_ENV || 'development';
const BEHAVE_LIKE_PROD =
  ENVIRONMENT === 'production' ||
  ENVIRONMENT === 'sandbox' ||
  ENVIRONMENT === 'staging';

if (!BEHAVE_LIKE_PROD) {
  require('dotenv').load();
}

const API_HOST = process.env.API_HOST;
const EXAMPLE_BROKERAGE_ID = process.env.EXAMPLE_BROKERAGE_ID || 1002;
const EXAMPLE_BROKERAGE_OFFICE_ID =
  process.env.EXAMPLE_BROKERAGE_OFFICE_ID || 1003;
const EXAMPLE_BROKERAGE_LOGO =
  process.env.EXAMPLE_BROKERAGE_LOGO || 'example-brokerage-logo.jpg';
const EXAMPLE_BROKERAGE_API_TOKEN =
  process.env.EXAMPLE_BROKERAGE_API_TOKEN || 'example-brokerage-token';
const EXAMPLE_BROKERAGE_API_SECRET =
  process.env.EXAMPLE_BROKERAGE_API_SECRET || 'example-brokerage-secret';
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const NPM_PACKAGE_NAME = process.env.npm_package_name;
const NPM_PACKAGE_VERSION = process.env.npm_package_version;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_TEST_DATABASE =
  process.env.PG_TEST_DATABASE || process.env.DATABASE_NAME_TEST;
const PG_TEST_USERNAME =
  process.env.PG_TEST_USERNAME || process.env.DATABASE_USERNAME;
const PG_TEST_PASSWORD =
  process.env.PG_TEST_PASSWORD || process.env.DATABASE_PASSWORD;

const SESSION_SECRET = process.env.SESSION_SECRET;

const SEATMAPS_URL = process.env.SEATMAPS_URL;

const PORT = process.env.PORT || '9999';
const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_PORT = process.env.PG_PORT || 5432;
const PG_SSL = process.env.PG_SSL || 'false';
const SSL_QUERY = PG_SSL === 'true' ? '?ssl=true' : '';
const PG_URL = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}${SSL_QUERY}`;
const PG_SYNC_TABLES = !!(
  process.env.PG_SYNC_TABLES && JSON.parse(process.env.PG_SYNC_TABLES)
);
const PG_WIPE_TABLES = !!(
  process.env.PG_WIPE_TABLES && JSON.parse(process.env.PG_WIPE_TABLES)
);

const STRIPE_KEY =
  process.env.STRIPE_ENV === 'production'
    ? process.env.STRIPE_PROD_KEY
    : process.env.STRIPE_TEST_KEY;

const DREAMTIX_ENTITY_ID = process.env.DREAMTIX_ENTITY_ID;
const STAGEFRONT_ENTITY_ID = process.env.STAGEFRONT_ENTITY_ID;

/* eslint-disable no-console */
if (!process.env.API_HOST) {
  console.error('API_HOST environment variable is required.');
}
if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error('GOOGLE_MAPS_API_KEY environment variable is required.');
}
if (!process.env.PG_TEST_DATABASE) {
  console.error('PG_TEST_DATABASE environment variable is required.');
}
if (!process.env.PG_TEST_PASSWORD) {
  console.error('PG_TEST_PASSWORD environment variable is required.');
}
if (!process.env.PG_TEST_USERNAME) {
  console.error('PG_TEST_USERNAME environment variable is required.');
}
if (!process.env.PG_DATABASE) {
  console.error('PG_DATABASE environment variable is required.');
}
if (!process.env.PG_PASSWORD) {
  console.error('PG_PASSWORD environment variable is required.');
}
if (!process.env.PG_USERNAME) {
  console.error('PG_USERNAME environment variable is required.');
}
if (!process.env.SESSION_SECRET) {
  console.error('SESSION_SECRET environment variable is required.');
}
if (!process.env.STRIPE_ENV) {
  console.error('STRIPE_ENV environment variable is required.');
}
if (!process.env.STRIPE_PROD_KEY) {
  console.error('STRIPE_PROD_KEY environment variable is required.');
}
if (!process.env.STRIPE_TEST_KEY) {
  console.error('STRIPE_TEST_KEY environment variable is required.');
}
if (!process.env.DREAMTIX_ENTITY_ID) {
  console.error('DREAMTIX_ENTITY_ID environment variable is required.');
}
if (!process.env.STAGEFRONT_ENTITY_ID) {
  console.error('STAGEFRONT_ENTITY_ID environment variable is required.');
}

/* eslint-enable no-console */

module.exports = {
  API_HOST,
  BEHAVE_LIKE_PROD,
  BROWSER_SENTRY_ENABLED: process.env.BROWSER_SENTRY_ENABLED || 'false',
  DEBUG_ROUTES_ENABLED: process.env.DEBUG_ROUTES_ENABLED || 'false',
  DREAMTIX_ENTITY_ID,
  ENVIRONMENT,
  EXAMPLE_BROKERAGE_API_SECRET,
  EXAMPLE_BROKERAGE_API_TOKEN,
  EXAMPLE_BROKERAGE_ID,
  EXAMPLE_BROKERAGE_LOGO,
  EXAMPLE_BROKERAGE_OFFICE_ID,
  GOOGLE_MAPS_API_KEY,
  KOA_EJS_DEBUG: process.env.KOA_EJS_DEBUG || false,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_VERSION,
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_SSL,
  PG_SYNC_TABLES,
  PG_TEST_DATABASE,
  PG_TEST_PASSWORD,
  PG_TEST_USERNAME,
  PG_URL,
  PG_USERNAME,
  PG_WIPE_TABLES,
  PORT,
  SEATMAPS_URL,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  SENTRY_DEBUG: process.env.SENTRY_DEBUG,
  SENTRY_ENABLED: process.env.SENTRY_ENABLED || 'true',
  SESSION_SECRET,
  STAGEFRONT_ENTITY_ID,
  STRIPE_KEY,
  TEVO_BROKERAGE_ID: process.env.TEVO_BROKERAGE_ID,
  TEVO_LOGO: process.env.TEVO_LOGO,
  TEVO_NAME: process.env.TEVO_NAME,
  TEVO_OFFICE_ID: process.env.TEVO_OFFICE_ID,
  TEVO_SECRET: process.env.TEVO_SECRET,
  TEVO_TOKEN: process.env.TEVO_TOKEN,
};
