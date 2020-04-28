import { cookiePolicy, acceptLanguagePolicy, defaultPolicy } from '@moxy/next-intl';

export default {
    locales: [
        {
            id: 'en-US',
            name: 'English',
            loadMessages: async () => {
                const module = await import(/* webpackChunkName: "intl-messages/en-US" */ './messages/en-US.json');

                return module.default;
            },
        },
        {
            id: 'pt-PT',
            name: 'Português',
            loadMessages: async () => {
                const module = await import(/* webpackChunkName: "intl-messages/pt-PT" */ './messages/pt-PT.json');

                return module.default;
            },
        },
    ],
    policies: [cookiePolicy(), acceptLanguagePolicy(), defaultPolicy('en-US')],
};
