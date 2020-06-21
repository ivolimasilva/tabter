import React, { Fragment, ReactNode } from 'react';
import NextDocument, { Html, Head, Main, NextScript, DocumentProps as NextDocumentProps } from 'next/document';
import { NextIntlScript } from '@moxy/next-intl';
import { ServerStyleSheets } from '@material-ui/styles';

type DocumentProps = NextDocumentProps & {
    styleTags: ReactNode;
};

export class Document extends NextDocument<DocumentProps> {
    render() {
        return (
            <Html>
                <Head>
                    { this.props.styleTags }
                </Head>
                <body>
                    <Main />
                    <NextIntlScript />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

Document.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App { ...props } />),
        });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
        ...initialProps,
        styleTags: (
            <Fragment>
                { initialProps.styles }
                { sheets.getStyleElement() }
            </Fragment>
        ),
    };
};

export default Document;
