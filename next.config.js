const withPlugins = require('next-compose-plugins');
const withOneOf = require('@moxy/next-webpack-oneof');
const withNextIntl = require('@moxy/next-intl/plugin');

module.exports = (phase, nextConfig) => withPlugins([withOneOf, withNextIntl()])(phase, nextConfig);
