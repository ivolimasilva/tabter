const withPlugins = require('next-compose-plugins');
const withOneOf = require('@moxy/next-webpack-oneof');
const { withSVG, withFonts } = require('@moxy/next-common-files');
const withNextIntl = require('@moxy/next-intl/plugin');
const withCompileNodeModules = require('@moxy/next-compile-node-modules');
const webpack = require('webpack');

module.exports = (phase, nextConfig) =>
    withPlugins([
        withOneOf,
        withSVG(),
        withSVG({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withSVG({
            include: /\.inline\./,
            inline: true,
        }),
        withFonts(),
        withFonts({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withNextIntl(),
        withCompileNodeModules({
            exclude: [
                // Exclude next-intl related polyfills as they are huge but are already compiled down to ES5
                /[\\/]node_modules[\\/]@formatjs[\\/].+?[\\/]locales\.js$/,
            ],
        }),
        (nextConfig) => ({
            ...nextConfig,
            webpack: (config, options) => {
                config.plugins.push(new webpack.IgnorePlugin(/^encoding$/, /node-fetch/));

                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options);
                }

                return config;
            },
        }),
    ])(phase, nextConfig);
