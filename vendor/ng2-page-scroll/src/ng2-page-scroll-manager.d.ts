import { PageScroll } from './ng2-page-scroll.directive';
export declare class PageScrollManager {
    private static runningInstances;
    private static listener;
    static add(pageScroll: PageScroll): void;
    static stopAll(): boolean;
    static remove(pageScroll: PageScroll): boolean;
    static attachInterfereListeners(body: HTMLBodyElement): void;
    static detachInterfereListeners(body: HTMLBodyElement): void;
}
