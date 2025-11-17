import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // List of message namespaces you want to load
    const namespaces = ['app', 'common', 'navigation','home',"metadata"];

    // Load all JSON files and merge them
    const messages = Object.assign(
        {},
        ...(await Promise.all(
            namespaces.map(async (ns) => {
                const mod = await import(`../../messages/${locale}/${ns}.json`);
                return mod.default;
            })
        ))
    );

    return {
        locale,
        messages
    };
});
