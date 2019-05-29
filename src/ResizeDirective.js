import ResizeObserver from "resize-observer-polyfill"

export default {
    inserted(el, { value, arg, modifiers }) {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                value(entry.contentRect);
            }
        });

        observer.observe(el);

        el.__resizeObserver = observer;
    },
    unbind(el) {
        if (el.__resizeObserver) {
            el.__resizeObserver.unobserve(el);
        }
    }
}
