import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IEasingFunction } from './ng2-page-scroll-config';
export declare class PageScroll implements OnDestroy {
    private el;
    private router;
    routerLink: any;
    href: string;
    pageScrollOffset: number;
    pageScrollDuration: number;
    pageScrollEasing: IEasingFunction;
    pageScrollInterruptible: boolean;
    pageScrollFinish: EventEmitter<boolean>;
    private document;
    private body;
    private scrollTopSources;
    private timer;
    private interruptListenersAttached;
    private static isUndefinedOrNull(variable);
    constructor(el: ElementRef, router: Router);
    ngOnDestroy(): any;
    stop(): boolean;
    private handleClick(clickEvent);
    private scrollView(anchor);
    private stopInternal(interrupted);
}
