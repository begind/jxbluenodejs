/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonHubService } from './button-hub.service';
import { PageCollectionService } from './page-collection.service';
/**
 * Performs navigation functions for a wizard and manages the current page. Presented as a
 * separate service to encapsulate the behavior of navigating and completing the wizard so
 * that it can be shared across the wizard and its sub-components.
 *
 * The easiest way to access the navigation service is there a reference on your wizard. The
 * Following example would allow you to access your instance of the wizard from your host
 * component and thereby access the navigation service via YourHostComponent.wizard.navService.
 *
 * @example
 * <clr-wizard #wizard ...>
 *
 * @example
 * export class YourHostComponent {
 *   @ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 */
var WizardNavigationService = /** @class */ (function () {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * @memberof WizardNavigationService
     */
    function WizardNavigationService(pageCollection, buttonService) {
        var _this = this;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardNavigationService
         */
        this._currentChanged = new Subject();
        /**
         * A Boolean flag used by the ClrWizardPage to avoid a race condition when pages are
         * loading and there is no current page defined.
         *
         * @memberof WizardNavigationService
         */
        this.navServiceLoaded = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
         * navigating backwards in the stepnav menu will reset any skipped pages' completed
         * state to false.
         *
         * This is useful when a wizard executes validation on a page-by-page basis when
         * the next button is clicked.
         *
         * @memberof WizardNavigationService
         */
        this.forceForwardNavigation = false;
        /**
         * @memberof WizardNavigationService
         */
        this._movedToNextPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._wizardFinished = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._cancelWizard = new Subject();
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
         * routine is subverted and must be reinstated in the host component calling Wizard.close()
         * at some point.
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltCancel = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
         * routines are subverted and must be reinstated in the host component calling Wizard.next(),
         * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltNext = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
         * navigational elements in the wizard are disabled.
         *
         * This is intended to freeze the wizard in place. Events are not fired so this is
         * not a way to implement alternate functionality for navigation.
         *
         * @memberof WizardNavigationService
         */
        this.wizardStopNavigation = false;
        /**
         * A boolean flag shared with the stepnav items that prevents user clicks on
         * stepnav items from navigating the wizard.
         *
         * @memberof WizardNavigationService
         */
        this.wizardDisableStepnav = false;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(function () {
            var currentPage = _this.currentPage;
            if (_this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                _this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe(function (type) {
            if (!_this.wizardStopNavigation) {
                _this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(function () {
            if (_this.wizardStopNavigation) {
                return;
            }
            if (_this.currentPage.preventDefault) {
                _this.currentPage.pageOnCancel.emit(_this.currentPage);
            }
            else {
                _this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(function () {
            _this.setFirstPageCurrent();
        });
    }
    /**
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.ngOnDestroy = function () {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    };
    Object.defineProperty(WizardNavigationService.prototype, "currentPageChanged", {
        /**
         * An Observable that is predominantly used amongst the subcomponents and services
         * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
         * (clrWizardPageOnLoad) output instead of this Observable.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
            // A BREAKING CHANGE SO AWAITING MINOR RELEASE
            return this._currentChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageTitle", {
        /**
         * @memberof WizardNavigationService
         */
        get: function () {
            // when the querylist of pages is empty. this is the first place it fails...
            if (!this.currentPage) {
                return null;
            }
            return this.currentPage.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsFirst", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the first
         * page in the Wizard.
         *
         * This is helpful for determining whether a page is navigable.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this.pageCollection.firstPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsLast", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the
         * last page in the Wizard.
         *
         * This is used to determine which buttons should display in the wizard footer.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this.pageCollection.lastPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPage", {
        /**
         * Returns the ClrWizardPage object of the current page or null.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            if (!this._currentPage) {
                return null;
            }
            return this._currentPage;
        },
        /**
         * Accepts a ClrWizardPage object, since that object to be the current/active
         * page in the wizard, and emits the ClrWizardPage.onLoad (clrWizardPageOnLoad)
         * event for that page.
         *
         * Note that all of this work is bypassed if the ClrWizardPage object is already
         * the current page.
         *
         * @memberof WizardNavigationService
         */
        set: function (page) {
            if (this._currentPage !== page && !this.wizardStopNavigation) {
                this._currentPage = page;
                page.onLoad.emit(page.id);
                this._currentChanged.next(page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "movedToNextPage", {
        /**
         * An observable used internally to alert the wizard that forward navigation
         * has occurred. It is recommended that you use the Wizard.onMoveNext
         * (clrWizardOnNext) output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._movedToNextPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "wizardFinished", {
        /**
         * An observable used internally to alert the wizard that the nav service
         * has approved completion of the wizard.
         *
         * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
         * output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._wizardFinished.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This is a public function that can be used to programmatically advance
     * the user to the next page.
     *
     * When invoked, this method will move the wizard to the next page after
     * successful validation. Note that this method goes through all checks
     * and event emissions as if Wizard.next(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.next(false).
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.next = function () {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
        }
        else {
            this.checkAndCommitCurrentPage('next');
        }
    };
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.forceNext = function () {
        var currentPage = this.currentPage;
        var nextPage = this.pageCollection.getNextPage(currentPage);
        // catch errant null or undefineds that creep in
        if (!nextPage) {
            throw new Error('The wizard has no next page to go to.');
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            // this is a state that alt next flows can get themselves in...
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    };
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.checkAndCommitCurrentPage = function (buttonType) {
        var currentPage = this.currentPage;
        var iAmTheLastPage;
        var isNext;
        var isDanger;
        var isDangerNext;
        var isDangerFinish;
        var isFinish;
        if (!currentPage.readyToComplete || this.wizardStopNavigation) {
            return;
        }
        iAmTheLastPage = this.currentPageIsLast;
        isNext = buttonType === 'next';
        isDanger = buttonType === 'danger';
        isDangerNext = isDanger && !iAmTheLastPage;
        isDangerFinish = isDanger && iAmTheLastPage;
        isFinish = buttonType === 'finish' || isDangerFinish;
        if (isFinish && !iAmTheLastPage) {
            return;
        }
        currentPage.primaryButtonClicked.emit(buttonType);
        if (isFinish) {
            currentPage.finishButtonClicked.emit(currentPage);
        }
        else if (isDanger) {
            currentPage.dangerButtonClicked.emit();
        }
        else if (isNext) {
            currentPage.nextButtonClicked.emit();
        }
        if (currentPage.stopNext || currentPage.preventDefault) {
            currentPage.onCommit.emit(currentPage.id);
            return;
        }
        // order is very important with these emitters!
        if (isFinish) {
            // mark page as complete
            if (!this.wizardHasAltNext) {
                this.pageCollection.commitPage(currentPage);
            }
            this._wizardFinished.next();
        }
        if (this.wizardHasAltNext) {
            this.pageCollection.commitPage(currentPage);
            if (isNext || isDangerNext) {
                this._movedToNextPage.next(true);
            }
            // jump out here, no matter what type we're looking at
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    };
    /**
     * This is a public function that can be used to programmatically conclude
     * the wizard.
     *
     * When invoked, this method will  initiate the work involved with finalizing
     * and finishing the wizard workflow. Note that this method goes through all
     * checks and event emissions as if Wizard.finish(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.finish(false).
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.finish = function () {
        this.checkAndCommitCurrentPage('finish');
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToPreviousPage", {
        /**
         * Notifies the wizard when backwards navigation has occurred via the
         * previous button.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._movedToPreviousPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.previous = function () {
        var previousPage;
        if (this.currentPageIsFirst || this.wizardStopNavigation) {
            return;
        }
        previousPage = this.pageCollection.getPreviousPage(this.currentPage);
        if (!previousPage) {
            return;
        }
        this._movedToPreviousPage.next(true);
        if (this.forceForwardNavigation) {
            this.currentPage.completed = false;
        }
        this.currentPage = previousPage;
    };
    Object.defineProperty(WizardNavigationService.prototype, "notifyWizardCancel", {
        /**
         * Notifies the wizard that a user is trying to cancel it.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._cancelWizard.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Allows a hook into the cancel workflow of the wizard from the nav service. Note that
     * this route goes through all checks and event emissions as if a cancel button had
     * been clicked.
     *
     * In most cases, users looking for a hook into the cancel routine are actually looking
     * for a way to close the wizard from their host component because they have prevented
     * the default cancel action.
     *
     * In this instance, it is recommended that you use Wizard.close() to avoid any event
     * emission loop resulting from an event handler calling back into routine that will
     * again evoke the events it handles.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.cancel = function () {
        this._cancelWizard.next();
    };
    /**
     * Performs all required checks to determine if a user can navigate to a page. Checking at each
     * point if a page is navigable -- completed where the page immediately after the last completed
     * page.
     *
     * Takes two parameters. The first one must be either the ClrWizardPage object or the ID of the
     * ClrWizardPage object that you want to make the current page.
     *
     * The second parameter is optional and is a Boolean flag for "lazy completion". What this means
     * is the Wizard will mark all pages between the current page and the page you want to navigate
     * to as completed. This is useful for informational wizards that do not require user action,
     * allowing an easy means for users to jump ahead.
     *
     * To avoid checks on navigation, use ClrWizardPage.makeCurrent() instead.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.goTo = function (pageToGoToOrId, lazyComplete) {
        if (lazyComplete === void 0) { lazyComplete = false; }
        var pageToGoTo;
        var currentPage;
        var myPages;
        var pagesToCheck;
        var okayToMove;
        var goingForward;
        var currentPageIndex;
        var goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = typeof pageToGoToOrId === 'string' ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
        // no point in going to the current page. you're there already!
        // also hard block on any navigation when stopNavigation is true
        if (pageToGoTo === currentPage || this.wizardStopNavigation) {
            return;
        }
        currentPageIndex = myPages.getPageIndex(currentPage);
        goToPageIndex = myPages.getPageIndex(pageToGoTo);
        goingForward = goToPageIndex > currentPageIndex;
        pagesToCheck = myPages.getPageRangeFromPages(this.currentPage, pageToGoTo);
        okayToMove = lazyComplete || this.canGoTo(pagesToCheck);
        if (!okayToMove) {
            return;
        }
        if (goingForward && lazyComplete) {
            pagesToCheck.forEach(function (page) {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach(function (page) {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    };
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.canGoTo = function (pagesToCheck) {
        var okayToMove = true;
        var myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        var previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach(function (page) {
            var previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                // default is true. just jump out instead of complicating it.
                return;
            }
            // so we know our page is not completed...
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = previousPage === null || previousPage.completed === true;
            // we are false if not the current page AND previous page is not completed
            // (but must have a previous page)
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
            // falls through to true as default
        });
        return okayToMove;
    };
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.setLastEnabledPageCurrent = function () {
        var allPages = this.pageCollection.pagesAsArray;
        var lastCompletedPageIndex = null;
        allPages.forEach(function (page, index) {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
        if (lastCompletedPageIndex === null) {
            // always is at least the first item...
            lastCompletedPageIndex = 0;
        }
        else if (lastCompletedPageIndex + 1 < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    };
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.setFirstPageCurrent = function () {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    };
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.updateNavigation = function () {
        var toSetCurrent;
        var currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    };
    WizardNavigationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [PageCollectionService, ButtonHubService])
    ], WizardNavigationService);
    return WizardNavigationService;
}());
export { WizardNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVIO0lBd0RFOzs7Ozs7O09BT0c7SUFDSCxpQ0FBbUIsY0FBcUMsRUFBUyxhQUErQjtRQUFoRyxpQkE2Q0M7UUE3Q2tCLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQTZEaEc7OztXQUdHO1FBQ0ssb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztRQWV2RDs7Ozs7V0FLRztRQUNJLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVoQzs7Ozs7Ozs7OztXQVVHO1FBQ0ksMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBd0V0Qzs7V0FFRztRQUNLLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFhbEQ7O1dBRUc7UUFDSyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUEySmpEOztXQUVHO1FBQ0sseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQTBDdEQ7O1dBRUc7UUFDSyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUE4QjNDOzs7Ozs7O1dBT0c7UUFDSSx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFM0M7Ozs7Ozs7V0FP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O1NBanJCWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi4vd2l6YXJkLXBhZ2UnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24taHViLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5cbi8qKlxuICogUGVyZm9ybXMgbmF2aWdhdGlvbiBmdW5jdGlvbnMgZm9yIGEgd2l6YXJkIGFuZCBtYW5hZ2VzIHRoZSBjdXJyZW50IHBhZ2UuIFByZXNlbnRlZCBhcyBhXG4gKiBzZXBhcmF0ZSBzZXJ2aWNlIHRvIGVuY2Fwc3VsYXRlIHRoZSBiZWhhdmlvciBvZiBuYXZpZ2F0aW5nIGFuZCBjb21wbGV0aW5nIHRoZSB3aXphcmQgc29cbiAqIHRoYXQgaXQgY2FuIGJlIHNoYXJlZCBhY3Jvc3MgdGhlIHdpemFyZCBhbmQgaXRzIHN1Yi1jb21wb25lbnRzLlxuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBhY2Nlc3MgdGhlIG5hdmlnYXRpb24gc2VydmljZSBpcyB0aGVyZSBhIHJlZmVyZW5jZSBvbiB5b3VyIHdpemFyZC4gVGhlXG4gKiBGb2xsb3dpbmcgZXhhbXBsZSB3b3VsZCBhbGxvdyB5b3UgdG8gYWNjZXNzIHlvdXIgaW5zdGFuY2Ugb2YgdGhlIHdpemFyZCBmcm9tIHlvdXIgaG9zdFxuICogY29tcG9uZW50IGFuZCB0aGVyZWJ5IGFjY2VzcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIHZpYSBZb3VySG9zdENvbXBvbmVudC53aXphcmQubmF2U2VydmljZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGNsci13aXphcmQgI3dpemFyZCAuLi4+XG4gKlxuICogQGV4YW1wbGVcbiAqIGV4cG9ydCBjbGFzcyBZb3VySG9zdENvbXBvbmVudCB7XG4gKiAgIEBWaWV3Q2hpbGQoXCJ3aXphcmRcIikgd2l6YXJkOiBXaXphcmQ7XG4gKiAgIC4uLlxuICogfVxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLiBQZXJmb3JtcyBjaGVja3NcbiAgICogYmVmb3JlIGFsZXJ0aW5nIHRoZSBjdXJyZW50IHBhZ2Ugb2YgdGhlIGJ1dHRvbiBjbGljay4gRW5hY3RzIG5hdmlnYXRpb24gdG9cbiAgICogdGhlIHByZXZpb3VzIHBhZ2UgaWYgbm90IG92ZXJyaWRkZW4gYXQgdGhlIHBhZ2UgbGV2ZWwuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBOZXh0IGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIG5leHRCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBkYW5nZXJCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhICBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZmluaXNoQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBDdXN0b20gYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBDYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC4gTm90aWZpZXMgdGhlIHdpemFyZCxcbiAgICogd2hpY2ggaGFuZGxlcyBhbGwgY2FuY2VsIGZ1bmN0aW9uYWxpdHksIGlmIGNhbmNlbCBpcyBub3Qgb3ZlcnJpZGRlbiBhdCB0aGUgcGFnZVxuICAgKiBsZXZlbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBuYXZpZ2F0aW9uIHRvIG1ha2UgdGhlIGZpcnN0IHBhZ2UgY3VycmVudCB3aGVuIHRoZSBwYWdlIGNvbGxlY3Rpb24gc2VydmljZVxuICAgKiBlbWl0cyBhbiBldmVudCBub3RpZnlpbmcgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgdGhhdCBpdCBoYXMgcmVzZXQgYWxsIHBhZ2VzXG4gICAqIHRvIHRoZWlyIHByaXN0aW5lLCBpbmNvbXBsZXRlIHN0YXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlc1Jlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UuIEFsc28gc2V0cyB1cCBzdWJzY3JpcHRpb25zXG4gICAqIHRoYXQgbGlzdGVuIHRvIHRoZSBidXR0b24gc2VydmljZSB0byBkZXRlcm1pbmUgd2hlbiBhIGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkXG4gICAqIGluIHRoZSB3aXphcmQuIElzIGFsc28gcmVzcG9uc2libGUgZm9yIHRha2luZyBhY3Rpb24gd2hlbiB0aGUgcGFnZSBjb2xsZWN0aW9uXG4gICAqIHJlcXVlc3RzIHRoYXQgbmF2aWdhdGlvbiBiZSByZXNldCB0byBpdHMgcHJpc3RpbmUgc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UsIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlKSB7XG4gICAgdGhpcy5wcmV2aW91c0J1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5wcmV2aW91c0J0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlSXNGaXJzdCB8fCBjdXJyZW50UGFnZS5wcmV2aW91c1N0ZXBEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjdXJyZW50UGFnZS5wcmV2aW91c0J1dHRvbkNsaWNrZWQuZW1pdChjdXJyZW50UGFnZSk7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubmV4dEJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5uZXh0QnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCduZXh0Jyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRhbmdlckJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5kYW5nZXJCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2RhbmdlcicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maW5pc2hCdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuZmluaXNoQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCdmaW5pc2gnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmN1c3RvbUJ0bkNsaWNrZWQuc3Vic2NyaWJlKCh0eXBlOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLmN1c3RvbUJ1dHRvbkNsaWNrZWQuZW1pdCh0eXBlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmNhbmNlbEJ0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZS5wYWdlT25DYW5jZWwuZW1pdCh0aGlzLmN1cnJlbnRQYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhZ2VzUmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzUmVzZXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Rmlyc3RQYWdlQ3VycmVudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wcmV2aW91c0J1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubmV4dEJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZGFuZ2VyQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5maW5pc2hCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmN1c3RvbUJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5wYWdlc1Jlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50Q2hhbmdlZCA9IG5ldyBTdWJqZWN0PENscldpemFyZFBhZ2U+KCk7XG5cbiAgLyoqXG4gICAqIEFuIE9ic2VydmFibGUgdGhhdCBpcyBwcmVkb21pbmFudGx5IHVzZWQgYW1vbmdzdCB0aGUgc3ViY29tcG9uZW50cyBhbmQgc2VydmljZXNcbiAgICogb2YgdGhlIHdpemFyZC4gSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB1c2VycyBsaXN0ZW4gdG8gdGhlIENscldpemFyZFBhZ2Uub25Mb2FkXG4gICAqIChjbHJXaXphcmRQYWdlT25Mb2FkKSBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIE9ic2VydmFibGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUNoYW5nZWQoKTogT2JzZXJ2YWJsZTxDbHJXaXphcmRQYWdlPiB7XG4gICAgLy8gVE9ETzogTUFLRSBTVVJFIEVYVEVSTkFMIE9VVFBVVFMgU0FZICdDSEFOR0UnIE5PVCAnQ0hBTkdFRCdcbiAgICAvLyBBIEJSRUFLSU5HIENIQU5HRSBTTyBBV0FJVElORyBNSU5PUiBSRUxFQVNFXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgQm9vbGVhbiBmbGFnIHVzZWQgYnkgdGhlIENscldpemFyZFBhZ2UgdG8gYXZvaWQgYSByYWNlIGNvbmRpdGlvbiB3aGVuIHBhZ2VzIGFyZVxuICAgKiBsb2FkaW5nIGFuZCB0aGVyZSBpcyBubyBjdXJyZW50IHBhZ2UgZGVmaW5lZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmF2U2VydmljZUxvYWRlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuZm9yY2VGb3J3YXJkIChjbHJXaXphcmRGb3JjZUZvcndhcmROYXZpZ2F0aW9uKSBpbnB1dC4gV2hlbiB0cnVlLFxuICAgKiBuYXZpZ2F0aW5nIGJhY2t3YXJkcyBpbiB0aGUgc3RlcG5hdiBtZW51IHdpbGwgcmVzZXQgYW55IHNraXBwZWQgcGFnZXMnIGNvbXBsZXRlZFxuICAgKiBzdGF0ZSB0byBmYWxzZS5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgd2hlbiBhIHdpemFyZCBleGVjdXRlcyB2YWxpZGF0aW9uIG9uIGEgcGFnZS1ieS1wYWdlIGJhc2lzIHdoZW5cbiAgICogdGhlIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZvcmNlRm9yd2FyZE5hdmlnYXRpb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlVGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgLy8gd2hlbiB0aGUgcXVlcnlsaXN0IG9mIHBhZ2VzIGlzIGVtcHR5LiB0aGlzIGlzIHRoZSBmaXJzdCBwbGFjZSBpdCBmYWlscy4uLlxuICAgIGlmICghdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlLnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBCb29sZWFuIHRoYXQgdGVsbHMgeW91IHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGZpcnN0XG4gICAqIHBhZ2UgaW4gdGhlIFdpemFyZC5cbiAgICpcbiAgICogVGhpcyBpcyBoZWxwZnVsIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIGEgcGFnZSBpcyBuYXZpZ2FibGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUlzRmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24uZmlyc3RQYWdlID09PSB0aGlzLmN1cnJlbnRQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBCb29sZWFuIHRoYXQgdGVsbHMgeW91IHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlXG4gICAqIGxhc3QgcGFnZSBpbiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIGJ1dHRvbnMgc2hvdWxkIGRpc3BsYXkgaW4gdGhlIHdpemFyZCBmb290ZXIuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUlzTGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5sYXN0UGFnZSA9PT0gdGhpcy5jdXJyZW50UGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBDbHJXaXphcmRQYWdlIG9iamVjdCBvZiB0aGUgY3VycmVudCBwYWdlIG9yIG51bGwuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGlmICghdGhpcy5fY3VycmVudFBhZ2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIENscldpemFyZFBhZ2Ugb2JqZWN0LCBzaW5jZSB0aGF0IG9iamVjdCB0byBiZSB0aGUgY3VycmVudC9hY3RpdmVcbiAgICogcGFnZSBpbiB0aGUgd2l6YXJkLCBhbmQgZW1pdHMgdGhlIENscldpemFyZFBhZ2Uub25Mb2FkIChjbHJXaXphcmRQYWdlT25Mb2FkKVxuICAgKiBldmVudCBmb3IgdGhhdCBwYWdlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgYWxsIG9mIHRoaXMgd29yayBpcyBieXBhc3NlZCBpZiB0aGUgQ2xyV2l6YXJkUGFnZSBvYmplY3QgaXMgYWxyZWFkeVxuICAgKiB0aGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHNldCBjdXJyZW50UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlICE9PSBwYWdlICYmICF0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICBwYWdlLm9uTG9hZC5lbWl0KHBhZ2UuaWQpO1xuICAgICAgdGhpcy5fY3VycmVudENoYW5nZWQubmV4dChwYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlZFRvTmV4dFBhZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHVzZWQgaW50ZXJuYWxseSB0byBhbGVydCB0aGUgd2l6YXJkIHRoYXQgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGhhcyBvY2N1cnJlZC4gSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIHRoZSBXaXphcmQub25Nb3ZlTmV4dFxuICAgKiAoY2xyV2l6YXJkT25OZXh0KSBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIG9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vdmVkVG9OZXh0UGFnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fbW92ZWRUb05leHRQYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfd2l6YXJkRmluaXNoZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHVzZWQgaW50ZXJuYWxseSB0byBhbGVydCB0aGUgd2l6YXJkIHRoYXQgdGhlIG5hdiBzZXJ2aWNlXG4gICAqIGhhcyBhcHByb3ZlZCBjb21wbGV0aW9uIG9mIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEl0IGlzIHJlY29tbWVuZGVkIHRoYXQgeW91IHVzZSB0aGUgV2l6YXJkLndpemFyZEZpbmlzaGVkIChjbHJXaXphcmRPbkZpbmlzaClcbiAgICogb3V0cHV0IGluc3RlYWQgb2YgdGhpcyBvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCB3aXphcmRGaW5pc2hlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fd2l6YXJkRmluaXNoZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBhIHB1YmxpYyBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgYWR2YW5jZVxuICAgKiB0aGUgdXNlciB0byB0aGUgbmV4dCBwYWdlLlxuICAgKlxuICAgKiBXaGVuIGludm9rZWQsIHRoaXMgbWV0aG9kIHdpbGwgbW92ZSB0aGUgd2l6YXJkIHRvIHRoZSBuZXh0IHBhZ2UgYWZ0ZXJcbiAgICogc3VjY2Vzc2Z1bCB2YWxpZGF0aW9uLiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgZ29lcyB0aHJvdWdoIGFsbCBjaGVja3NcbiAgICogYW5kIGV2ZW50IGVtaXNzaW9ucyBhcyBpZiBXaXphcmQubmV4dChmYWxzZSkgaGFkIGJlZW4gY2FsbGVkLlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCBpdCBtYWtlcyBtb3JlIHNlbnNlIHRvIHVzZSBXaXphcmQubmV4dChmYWxzZSkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0xhc3QpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnZmluaXNoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnbmV4dCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCeXBhc3NlcyBjaGVja3MgYW5kIG1vc3QgZXZlbnQgZW1pc3Npb25zIHRvIGZvcmNlIGEgcGFnZSB0byBuYXZpZ2F0ZSBmb3J3YXJkLlxuICAgKlxuICAgKiBDb21wYXJhYmxlIHRvIGNhbGxpbmcgV2l6YXJkLm5leHQoKSBvciBXaXphcmQuZm9yY2VOZXh0KCkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZvcmNlTmV4dCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UGFnZTogQ2xyV2l6YXJkUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XG4gICAgY29uc3QgbmV4dFBhZ2U6IENscldpemFyZFBhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldE5leHRQYWdlKGN1cnJlbnRQYWdlKTtcblxuICAgIC8vIGNhdGNoIGVycmFudCBudWxsIG9yIHVuZGVmaW5lZHMgdGhhdCBjcmVlcCBpblxuICAgIGlmICghbmV4dFBhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHdpemFyZCBoYXMgbm8gbmV4dCBwYWdlIHRvIGdvIHRvLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyZW50UGFnZS5jb21wbGV0ZWQpIHtcbiAgICAgIC8vIHRoaXMgaXMgYSBzdGF0ZSB0aGF0IGFsdCBuZXh0IGZsb3dzIGNhbiBnZXQgdGhlbXNlbHZlcyBpbi4uLlxuICAgICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5jb21taXRQYWdlKGN1cnJlbnRQYWdlKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5leHRQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYSBidXR0b24vYWN0aW9uIHR5cGUgYXMgYSBwYXJhbWV0ZXIuIEVuY2Fwc3VsYXRlcyBhbGwgbG9naWMgZm9yXG4gICAqIGV2ZW50IGVtaXNzaW9ucywgc3RhdGUgb2YgdGhlIGN1cnJlbnQgcGFnZSwgYW5kIHdpemFyZCBhbmQgcGFnZSBsZXZlbCBvdmVycmlkZXMuXG4gICAqXG4gICAqIEF2b2lkIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiBkaXJlY3RseSB1bmxlc3MgeW91IHJlYWxseSBrbm93IHdoYXQgeW91J3JlIGRvaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKGJ1dHRvblR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICBsZXQgaUFtVGhlTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgICBsZXQgaXNOZXh0OiBib29sZWFuO1xuICAgIGxldCBpc0RhbmdlcjogYm9vbGVhbjtcbiAgICBsZXQgaXNEYW5nZXJOZXh0OiBib29sZWFuO1xuICAgIGxldCBpc0RhbmdlckZpbmlzaDogYm9vbGVhbjtcbiAgICBsZXQgaXNGaW5pc2g6IGJvb2xlYW47XG5cbiAgICBpZiAoIWN1cnJlbnRQYWdlLnJlYWR5VG9Db21wbGV0ZSB8fCB0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaUFtVGhlTGFzdFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlSXNMYXN0O1xuXG4gICAgaXNOZXh0ID0gYnV0dG9uVHlwZSA9PT0gJ25leHQnO1xuICAgIGlzRGFuZ2VyID0gYnV0dG9uVHlwZSA9PT0gJ2Rhbmdlcic7XG4gICAgaXNEYW5nZXJOZXh0ID0gaXNEYW5nZXIgJiYgIWlBbVRoZUxhc3RQYWdlO1xuICAgIGlzRGFuZ2VyRmluaXNoID0gaXNEYW5nZXIgJiYgaUFtVGhlTGFzdFBhZ2U7XG4gICAgaXNGaW5pc2ggPSBidXR0b25UeXBlID09PSAnZmluaXNoJyB8fCBpc0RhbmdlckZpbmlzaDtcblxuICAgIGlmIChpc0ZpbmlzaCAmJiAhaUFtVGhlTGFzdFBhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZS5wcmltYXJ5QnV0dG9uQ2xpY2tlZC5lbWl0KGJ1dHRvblR5cGUpO1xuXG4gICAgaWYgKGlzRmluaXNoKSB7XG4gICAgICBjdXJyZW50UGFnZS5maW5pc2hCdXR0b25DbGlja2VkLmVtaXQoY3VycmVudFBhZ2UpO1xuICAgIH0gZWxzZSBpZiAoaXNEYW5nZXIpIHtcbiAgICAgIGN1cnJlbnRQYWdlLmRhbmdlckJ1dHRvbkNsaWNrZWQuZW1pdCgpO1xuICAgIH0gZWxzZSBpZiAoaXNOZXh0KSB7XG4gICAgICBjdXJyZW50UGFnZS5uZXh0QnV0dG9uQ2xpY2tlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRQYWdlLnN0b3BOZXh0IHx8IGN1cnJlbnRQYWdlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBjdXJyZW50UGFnZS5vbkNvbW1pdC5lbWl0KGN1cnJlbnRQYWdlLmlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvcmRlciBpcyB2ZXJ5IGltcG9ydGFudCB3aXRoIHRoZXNlIGVtaXR0ZXJzIVxuICAgIGlmIChpc0ZpbmlzaCkge1xuICAgICAgLy8gbWFyayBwYWdlIGFzIGNvbXBsZXRlXG4gICAgICBpZiAoIXRoaXMud2l6YXJkSGFzQWx0TmV4dCkge1xuICAgICAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLmNvbW1pdFBhZ2UoY3VycmVudFBhZ2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fd2l6YXJkRmluaXNoZWQubmV4dCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpemFyZEhhc0FsdE5leHQpIHtcbiAgICAgIHRoaXMucGFnZUNvbGxlY3Rpb24uY29tbWl0UGFnZShjdXJyZW50UGFnZSk7XG5cbiAgICAgIGlmIChpc05leHQgfHwgaXNEYW5nZXJOZXh0KSB7XG4gICAgICAgIHRoaXMuX21vdmVkVG9OZXh0UGFnZS5uZXh0KHRydWUpO1xuICAgICAgfVxuICAgICAgLy8ganVtcCBvdXQgaGVyZSwgbm8gbWF0dGVyIHdoYXQgdHlwZSB3ZSdyZSBsb29raW5nIGF0XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzTmV4dCB8fCBpc0Rhbmdlck5leHQpIHtcbiAgICAgIHRoaXMuZm9yY2VOZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndpemFyZEhhc0FsdE5leHQgJiYgIXRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuX21vdmVkVG9OZXh0UGFnZS5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgcHVibGljIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBjb25jbHVkZVxuICAgKiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBXaGVuIGludm9rZWQsIHRoaXMgbWV0aG9kIHdpbGwgIGluaXRpYXRlIHRoZSB3b3JrIGludm9sdmVkIHdpdGggZmluYWxpemluZ1xuICAgKiBhbmQgZmluaXNoaW5nIHRoZSB3aXphcmQgd29ya2Zsb3cuIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBnb2VzIHRocm91Z2ggYWxsXG4gICAqIGNoZWNrcyBhbmQgZXZlbnQgZW1pc3Npb25zIGFzIGlmIFdpemFyZC5maW5pc2goZmFsc2UpIGhhZCBiZWVuIGNhbGxlZC5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byB1c2UgV2l6YXJkLmZpbmlzaChmYWxzZSkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZpbmlzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2ZpbmlzaCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZWRUb1ByZXZpb3VzUGFnZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSB3aXphcmQgd2hlbiBiYWNrd2FyZHMgbmF2aWdhdGlvbiBoYXMgb2NjdXJyZWQgdmlhIHRoZVxuICAgKiBwcmV2aW91cyBidXR0b24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBtb3ZlZFRvUHJldmlvdXNQYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlZFRvUHJldmlvdXNQYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2dyYW1tYXRpY2FsbHkgbW92ZXMgdGhlIHdpemFyZCB0byB0aGUgcGFnZSBiZWZvcmUgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogSW4gbW9zdCBpbnN0YW5jZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gY2FsbCBXaXphcmQucHJldmlvdXMoKVxuICAgKiB3aGljaCBkb2VzIHRoZSBzYW1lIHRoaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICBsZXQgcHJldmlvdXNQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0ZpcnN0IHx8IHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSh0aGlzLmN1cnJlbnRQYWdlKTtcblxuICAgIGlmICghcHJldmlvdXNQYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbW92ZWRUb1ByZXZpb3VzUGFnZS5uZXh0KHRydWUpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VGb3J3YXJkTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gcHJldmlvdXNQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY2FuY2VsV2l6YXJkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGUgd2l6YXJkIHRoYXQgYSB1c2VyIGlzIHRyeWluZyB0byBjYW5jZWwgaXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBub3RpZnlXaXphcmRDYW5jZWwoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FuY2VsV2l6YXJkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBhIGhvb2sgaW50byB0aGUgY2FuY2VsIHdvcmtmbG93IG9mIHRoZSB3aXphcmQgZnJvbSB0aGUgbmF2IHNlcnZpY2UuIE5vdGUgdGhhdFxuICAgKiB0aGlzIHJvdXRlIGdvZXMgdGhyb3VnaCBhbGwgY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMgYXMgaWYgYSBjYW5jZWwgYnV0dG9uIGhhZFxuICAgKiBiZWVuIGNsaWNrZWQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIHVzZXJzIGxvb2tpbmcgZm9yIGEgaG9vayBpbnRvIHRoZSBjYW5jZWwgcm91dGluZSBhcmUgYWN0dWFsbHkgbG9va2luZ1xuICAgKiBmb3IgYSB3YXkgdG8gY2xvc2UgdGhlIHdpemFyZCBmcm9tIHRoZWlyIGhvc3QgY29tcG9uZW50IGJlY2F1c2UgdGhleSBoYXZlIHByZXZlbnRlZFxuICAgKiB0aGUgZGVmYXVsdCBjYW5jZWwgYWN0aW9uLlxuICAgKlxuICAgKiBJbiB0aGlzIGluc3RhbmNlLCBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgV2l6YXJkLmNsb3NlKCkgdG8gYXZvaWQgYW55IGV2ZW50XG4gICAqIGVtaXNzaW9uIGxvb3AgcmVzdWx0aW5nIGZyb20gYW4gZXZlbnQgaGFuZGxlciBjYWxsaW5nIGJhY2sgaW50byByb3V0aW5lIHRoYXQgd2lsbFxuICAgKiBhZ2FpbiBldm9rZSB0aGUgZXZlbnRzIGl0IGhhbmRsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW5jZWxXaXphcmQubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5zdG9wQ2FuY2VsIChjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCkgaW5wdXQuIFdoZW4gdHJ1ZSwgdGhlIGNhbmNlbFxuICAgKiByb3V0aW5lIGlzIHN1YnZlcnRlZCBhbmQgbXVzdCBiZSByZWluc3RhdGVkIGluIHRoZSBob3N0IGNvbXBvbmVudCBjYWxsaW5nIFdpemFyZC5jbG9zZSgpXG4gICAqIGF0IHNvbWUgcG9pbnQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHdpemFyZEhhc0FsdENhbmNlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuc3RvcE5leHQgKGNscldpemFyZFByZXZlbnREZWZhdWx0TmV4dCkgaW5wdXQuIFdoZW4gdHJ1ZSwgdGhlIG5leHQgYW5kIGZpbmlzaFxuICAgKiByb3V0aW5lcyBhcmUgc3VidmVydGVkIGFuZCBtdXN0IGJlIHJlaW5zdGF0ZWQgaW4gdGhlIGhvc3QgY29tcG9uZW50IGNhbGxpbmcgV2l6YXJkLm5leHQoKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpLCBXaXphcmQuZmluaXNoKCksIG9yIFdpemFyZC5mb3JjZUZpbmlzaCgpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmRIYXNBbHROZXh0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5zdG9wTmF2aWdhdGlvbiAoY2xyV2l6YXJkUHJldmVudE5hdmlnYXRpb24pIGlucHV0LiBXaGVuIHRydWUsIGFsbFxuICAgKiBuYXZpZ2F0aW9uYWwgZWxlbWVudHMgaW4gdGhlIHdpemFyZCBhcmUgZGlzYWJsZWQuXG4gICAqXG4gICAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gZnJlZXplIHRoZSB3aXphcmQgaW4gcGxhY2UuIEV2ZW50cyBhcmUgbm90IGZpcmVkIHNvIHRoaXMgaXNcbiAgICogbm90IGEgd2F5IHRvIGltcGxlbWVudCBhbHRlcm5hdGUgZnVuY3Rpb25hbGl0eSBmb3IgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgd2l6YXJkU3RvcE5hdmlnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBib29sZWFuIGZsYWcgc2hhcmVkIHdpdGggdGhlIHN0ZXBuYXYgaXRlbXMgdGhhdCBwcmV2ZW50cyB1c2VyIGNsaWNrcyBvblxuICAgKiBzdGVwbmF2IGl0ZW1zIGZyb20gbmF2aWdhdGluZyB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmREaXNhYmxlU3RlcG5hdjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbGwgcmVxdWlyZWQgY2hlY2tzIHRvIGRldGVybWluZSBpZiBhIHVzZXIgY2FuIG5hdmlnYXRlIHRvIGEgcGFnZS4gQ2hlY2tpbmcgYXQgZWFjaFxuICAgKiBwb2ludCBpZiBhIHBhZ2UgaXMgbmF2aWdhYmxlIC0tIGNvbXBsZXRlZCB3aGVyZSB0aGUgcGFnZSBpbW1lZGlhdGVseSBhZnRlciB0aGUgbGFzdCBjb21wbGV0ZWRcbiAgICogcGFnZS5cbiAgICpcbiAgICogVGFrZXMgdHdvIHBhcmFtZXRlcnMuIFRoZSBmaXJzdCBvbmUgbXVzdCBiZSBlaXRoZXIgdGhlIENscldpemFyZFBhZ2Ugb2JqZWN0IG9yIHRoZSBJRCBvZiB0aGVcbiAgICogQ2xyV2l6YXJkUGFnZSBvYmplY3QgdGhhdCB5b3Ugd2FudCB0byBtYWtlIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGFuZCBpcyBhIEJvb2xlYW4gZmxhZyBmb3IgXCJsYXp5IGNvbXBsZXRpb25cIi4gV2hhdCB0aGlzIG1lYW5zXG4gICAqIGlzIHRoZSBXaXphcmQgd2lsbCBtYXJrIGFsbCBwYWdlcyBiZXR3ZWVuIHRoZSBjdXJyZW50IHBhZ2UgYW5kIHRoZSBwYWdlIHlvdSB3YW50IHRvIG5hdmlnYXRlXG4gICAqIHRvIGFzIGNvbXBsZXRlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIGluZm9ybWF0aW9uYWwgd2l6YXJkcyB0aGF0IGRvIG5vdCByZXF1aXJlIHVzZXIgYWN0aW9uLFxuICAgKiBhbGxvd2luZyBhbiBlYXN5IG1lYW5zIGZvciB1c2VycyB0byBqdW1wIGFoZWFkLlxuICAgKlxuICAgKiBUbyBhdm9pZCBjaGVja3Mgb24gbmF2aWdhdGlvbiwgdXNlIENscldpemFyZFBhZ2UubWFrZUN1cnJlbnQoKSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnb1RvKHBhZ2VUb0dvVG9PcklkOiBhbnksIGxhenlDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgbGV0IHBhZ2VUb0dvVG86IENscldpemFyZFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlO1xuICAgIGxldCBteVBhZ2VzOiBQYWdlQ29sbGVjdGlvblNlcnZpY2U7XG4gICAgbGV0IHBhZ2VzVG9DaGVjazogQ2xyV2l6YXJkUGFnZVtdO1xuICAgIGxldCBva2F5VG9Nb3ZlOiBib29sZWFuO1xuICAgIGxldCBnb2luZ0ZvcndhcmQ6IGJvb2xlYW47XG4gICAgbGV0IGN1cnJlbnRQYWdlSW5kZXg6IG51bWJlcjtcbiAgICBsZXQgZ29Ub1BhZ2VJbmRleDogbnVtYmVyO1xuXG4gICAgbXlQYWdlcyA9IHRoaXMucGFnZUNvbGxlY3Rpb247XG4gICAgcGFnZVRvR29UbyA9IHR5cGVvZiBwYWdlVG9Hb1RvT3JJZCA9PT0gJ3N0cmluZycgPyBteVBhZ2VzLmdldFBhZ2VCeUlkKHBhZ2VUb0dvVG9PcklkKSA6IHBhZ2VUb0dvVG9PcklkO1xuICAgIGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcblxuICAgIC8vIG5vIHBvaW50IGluIGdvaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UuIHlvdSdyZSB0aGVyZSBhbHJlYWR5IVxuICAgIC8vIGFsc28gaGFyZCBibG9jayBvbiBhbnkgbmF2aWdhdGlvbiB3aGVuIHN0b3BOYXZpZ2F0aW9uIGlzIHRydWVcbiAgICBpZiAocGFnZVRvR29UbyA9PT0gY3VycmVudFBhZ2UgfHwgdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlSW5kZXggPSBteVBhZ2VzLmdldFBhZ2VJbmRleChjdXJyZW50UGFnZSk7XG4gICAgZ29Ub1BhZ2VJbmRleCA9IG15UGFnZXMuZ2V0UGFnZUluZGV4KHBhZ2VUb0dvVG8pO1xuICAgIGdvaW5nRm9yd2FyZCA9IGdvVG9QYWdlSW5kZXggPiBjdXJyZW50UGFnZUluZGV4O1xuICAgIHBhZ2VzVG9DaGVjayA9IG15UGFnZXMuZ2V0UGFnZVJhbmdlRnJvbVBhZ2VzKHRoaXMuY3VycmVudFBhZ2UsIHBhZ2VUb0dvVG8pO1xuXG4gICAgb2theVRvTW92ZSA9IGxhenlDb21wbGV0ZSB8fCB0aGlzLmNhbkdvVG8ocGFnZXNUb0NoZWNrKTtcblxuICAgIGlmICghb2theVRvTW92ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChnb2luZ0ZvcndhcmQgJiYgbGF6eUNvbXBsZXRlKSB7XG4gICAgICBwYWdlc1RvQ2hlY2suZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgICBpZiAocGFnZSAhPT0gcGFnZVRvR29Ubykge1xuICAgICAgICAgIHBhZ2UuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghZ29pbmdGb3J3YXJkICYmIHRoaXMuZm9yY2VGb3J3YXJkTmF2aWdhdGlvbikge1xuICAgICAgcGFnZXNUb0NoZWNrLmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgICAgcGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlVG9Hb1RvO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYSByYW5nZSBvZiBDbHJXaXphcmRQYWdlIG9iamVjdHMgYXMgYSBwYXJhbWV0ZXIuIFBlcmZvcm1zIHRoZSB3b3JrIG9mIGNoZWNraW5nXG4gICAqIHRob3NlIG9iamVjdHMgdG8gZGV0ZXJtaW5lIGlmIG5hdmlnYXRpb24gY2FuIGJlIGFjY29tcGxpc2hlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2FuR29UbyhwYWdlc1RvQ2hlY2s6IENscldpemFyZFBhZ2VbXSk6IGJvb2xlYW4ge1xuICAgIGxldCBva2F5VG9Nb3ZlID0gdHJ1ZTtcbiAgICBjb25zdCBteVBhZ2VzID0gdGhpcy5wYWdlQ29sbGVjdGlvbjtcblxuICAgIC8vIHByZXZpb3VzIHBhZ2UgY2FuIGJlIGltcG9ydGFudCB3aGVuIG1vdmluZyBiZWNhdXNlIGlmIGl0J3MgY29tcGxldGVkIGl0XG4gICAgLy8gYWxsb3dzIHVzIHRvIG1vdmUgdG8gdGhlIHBhZ2UgZXZlbiBpZiBpdCdzIGluY29tcGxldGUuLi5cbiAgICBsZXQgcHJldmlvdXNQYWdlUGFzc2VzOiBib29sZWFuO1xuXG4gICAgaWYgKCFwYWdlc1RvQ2hlY2sgfHwgcGFnZXNUb0NoZWNrLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYWdlc1RvQ2hlY2suZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgbGV0IHByZXZpb3VzUGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICAgICAgaWYgKCFva2F5VG9Nb3ZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgaXMgdHJ1ZS4ganVzdCBqdW1wIG91dCBpbnN0ZWFkIG9mIGNvbXBsaWNhdGluZyBpdC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzbyB3ZSBrbm93IG91ciBwYWdlIGlzIG5vdCBjb21wbGV0ZWQuLi5cbiAgICAgIHByZXZpb3VzUGFnZSA9IG15UGFnZXMuZ2V0UGFnZUluZGV4KHBhZ2UpID4gMCA/IG15UGFnZXMuZ2V0UHJldmlvdXNQYWdlKHBhZ2UpIDogbnVsbDtcbiAgICAgIHByZXZpb3VzUGFnZVBhc3NlcyA9IHByZXZpb3VzUGFnZSA9PT0gbnVsbCB8fCBwcmV2aW91c1BhZ2UuY29tcGxldGVkID09PSB0cnVlO1xuXG4gICAgICAvLyB3ZSBhcmUgZmFsc2UgaWYgbm90IHRoZSBjdXJyZW50IHBhZ2UgQU5EIHByZXZpb3VzIHBhZ2UgaXMgbm90IGNvbXBsZXRlZFxuICAgICAgLy8gKGJ1dCBtdXN0IGhhdmUgYSBwcmV2aW91cyBwYWdlKVxuICAgICAgaWYgKCFwYWdlLmN1cnJlbnQgJiYgIXByZXZpb3VzUGFnZVBhc3Nlcykge1xuICAgICAgICBva2F5VG9Nb3ZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBmYWxscyB0aHJvdWdoIHRvIHRydWUgYXMgZGVmYXVsdFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9rYXlUb01vdmU7XG4gIH1cblxuICAvKipcbiAgICogTG9va3MgdGhyb3VnaCB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcyB0byBmaW5kIHRoZSBmaXJzdCBvbmUgdGhhdCBpcyBpbmNvbXBsZXRlXG4gICAqIGFuZCBtYWtlcyB0aGF0IHBhZ2UgdGhlIGN1cnJlbnQvYWN0aXZlIHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHNldExhc3RFbmFibGVkUGFnZUN1cnJlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgYWxsUGFnZXM6IENscldpemFyZFBhZ2VbXSA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNBc0FycmF5O1xuICAgIGxldCBsYXN0Q29tcGxldGVkUGFnZUluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgYWxsUGFnZXMuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChsYXN0Q29tcGxldGVkUGFnZUluZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyBhbHdheXMgaXMgYXQgbGVhc3QgdGhlIGZpcnN0IGl0ZW0uLi5cbiAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAobGFzdENvbXBsZXRlZFBhZ2VJbmRleCArIDEgPCBhbGxQYWdlcy5sZW5ndGgpIHtcbiAgICAgIGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPSBsYXN0Q29tcGxldGVkUGFnZUluZGV4ICsgMTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gYWxsUGFnZXNbbGFzdENvbXBsZXRlZFBhZ2VJbmRleF07XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMgYW5kIG1ha2VzIHRoYXQgcGFnZSB0aGVcbiAgICogY3VycmVudC9hY3RpdmUgcGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgc2V0Rmlyc3RQYWdlQ3VycmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5wYWdlc0FzQXJyYXlbMF07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc3RlcG5hdiBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aXphcmQgd2hlbiBwYWdlcyBhcmUgZHluYW1pY2FsbHlcbiAgICogYWRkZWQgb3IgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVOYXZpZ2F0aW9uKCk6IHZvaWQge1xuICAgIGxldCB0b1NldEN1cnJlbnQ6IENscldpemFyZFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRQYWdlUmVtb3ZlZDogYm9vbGVhbjtcblxuICAgIHRoaXMucGFnZUNvbGxlY3Rpb24udXBkYXRlQ29tcGxldGVkU3RhdGVzKCk7XG5cbiAgICBjdXJyZW50UGFnZVJlbW92ZWQgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzQXNBcnJheS5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpIDwgMDtcbiAgICBpZiAoY3VycmVudFBhZ2VSZW1vdmVkKSB7XG4gICAgICB0b1NldEN1cnJlbnQgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmZpbmRGaXJzdEluY29tcGxldGVQYWdlKCk7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdG9TZXRDdXJyZW50O1xuICAgIH1cbiAgfVxufVxuIl19