import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import type { ComponentType } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<{
            default: ComponentType<Record<string, unknown>>;
        }>("./modules/**/pages/**/*.tsx", { eager: true });

        const [module, page] = name.split("/");
        const pagePath = `./modules/${module}/pages/${page}.tsx`;
        const resolvedPage = pages[pagePath];

        if (!resolvedPage) {
            throw new Error(`Pagina nao encontrada: ${pagePath}`);
        }

        return resolvedPage.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
