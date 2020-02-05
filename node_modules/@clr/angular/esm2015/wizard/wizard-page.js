/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPageButtons } from './wizard-page-buttons';
import { ClrWizardPageHeaderActions } from './wizard-page-header-actions';
import { ClrWizardPageNavTitle } from './wizard-page-navtitle';
import { ClrWizardPageTitle } from './wizard-page-title';
let wizardPageIndex = 0;
/**
 * The ClrWizardPage component is responsible for displaying the content of each step
 * in the wizard workflow.
 *
 * ClrWizardPage component has hooks into the navigation service (ClrWizardPage.navService),
 * page collection (ClrWizardPage.pageCollection), and button service
 * (ClrWizardPage.buttonService). These three providers are shared across the components
 * within each instance of a Wizard.
 *
 */
let ClrWizardPage = class ClrWizardPage {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * @memberof WizardPage
     */
    constructor(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._nextStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.nextStepDisabled changes.
         * Should emit the new value of nextStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.nextStepDisabledChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._previousStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.previousStepDisabled changes.
         * Should emit the new value of previousStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.previousStepDisabledChange = new EventEmitter();
        /**
         * Overrides all actions from the page level, so you can use an alternate function for
         * validation or data-munging with a ClrWizardPage.onCommit (clrWizardPageOnCommit output),
         * ClrWizardPage.onCancel (clrWizardPageOnCancel output), or one
         * of the granular page-level button click event emitters.
         *
         * @memberof WizardPage
         *
         */
        this.preventDefault = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopCancel = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this.stopCancelChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopNext = false;
        /**
         * An event emitter carried over from a legacy version of ClrWizardPage.
         * Fires an event on ClrWizardPage whenever the next or finish buttons
         * are clicked and the page is the current page of the Wizard.
         *
         * Note that this does not automatically emit an event when a custom
         * button is used in place of a next or finish button.
         *
         * @memberof WizardPage
         *
         */
        this.onCommit = new EventEmitter(false);
        /**
         * Emits an event when ClrWizardPage becomes the current page of the
         * Wizard.
         *
         * @memberof WizardPage
         *
         */
        this.onLoad = new EventEmitter();
        /**
         * Emits an event when the ClrWizardPage invokes the cancel routine for the wizard.
         *
         * Can be used in conjunction with the ClrWizardPage.stopCancel
         * (clrWizardPagePreventDefaultCancel) or ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before cancelling the wizard.
         *
         * Note that this requires you to call Wizard.close() from the host component.
         * This constitues a full replacement of the cancel functionality.
         *
         * @memberof WizardPage
         *
         */
        this.pageOnCancel = new EventEmitter();
        /**
         * Emits an event when the finish button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom finish
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to complete
         * the wizard.
         *
         * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
         * from the host component. This combination creates a full replacement of
         * the finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.finishButtonClicked = new EventEmitter();
        /**
         * Emits an event when the previous button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom backwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * backwards in the wizard.
         *
         * Note that this requires you to call Wizard.previous()
         * from the host component. This combination creates a full replacement of
         * the backwards navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.previousButtonClicked = new EventEmitter();
        /**
         * Emits an event when the next button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * to the next page in the wizard.
         *
         * Note that this requires you to call Wizard.forceNext() or Wizard.next()
         * from the host component. This combination creates a full replacement of
         * the forward navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.nextButtonClicked = new EventEmitter();
        /**
         * Emits an event when a danger button is clicked and the ClrWizardPage is
         * the wizard's current page. By default, a danger button will act as
         * either a "next" or "finish" button depending on if the ClrWizardPage is the
         * last page or not.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level when the danger button is clicked.
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.dangerButtonClicked = new EventEmitter();
        /**
         * Emits an event when a next, finish, or danger button is clicked and the
         * ClrWizardPage is the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level, regardless of the type of
         * primary button.
         *
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.primaryButtonClicked = new EventEmitter();
        this.customButtonClicked = new EventEmitter();
        /**
         * An input value that is used internally to generate the ClrWizardPage ID as
         * well as the step nav item ID.
         *
         * Typed as any because it should be able to accept numbers as well as
         * strings. Passing an index for wizard whose pages are created with an
         * ngFor loop is a common use case.
         *
         * @memberof WizardPage
         *
         */
        this._id = (wizardPageIndex++).toString();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._complete = false;
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the next page.
     *
     * Useful for in-page validation because it prevents forward navigation
     * and visibly disables the next button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPage
     *
     */
    get nextStepDisabled() {
        return this._nextStepDisabled;
    }
    /**
     * Sets whether the page should allow forward navigation.
     *
     * @memberof WizardPage
     *
     */
    set nextStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            this.nextStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the previous page.
     *
     * Useful for in-page validation because it prevents backward navigation
     * and visibly disables the previous button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPage
     *
     */
    get previousStepDisabled() {
        return this._previousStepDisabled;
    }
    /**
     * Sets whether the page should allow backward navigation.
     *
     * @memberof WizardPage
     *
     */
    set previousStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * @memberof WizardPage
     *
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Overrides the cancel action from the page level. Allows you to use an
     * alternate function for validation or data-munging before cancelling the
     * wizard when combined with the ClrWizardPage.onCancel
     * (the clrWizardPageOnCancel output).
     *
     * Requires that you manually close the wizard from your host component,
     * usually with a call to Wizard.forceNext() or wizard.next();
     *
     * @memberof ClrWizardPage
     */
    set stopCancel(val) {
        const valBool = !!val;
        if (valBool !== this._stopCancel) {
            this._stopCancel = valBool;
            this.stopCancelChange.emit(valBool);
        }
    }
    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * @memberof WizardPage
     *
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Overrides forward navigation from the page level. Allows you to use an
     * alternate function for validation or data-munging before moving the
     * wizard to the next pagewhen combined with the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) or ClrWizardPage.nextButtonClicked
     * (clrWizardPageNext) outputs.
     *
     * Requires that you manually tell the wizard to navigate forward from
     * the hostComponent, usually with a call to Wizard.forceNext() or
     * wizard.next();
     *
     * @memberof ClrWizardPage
     */
    set stopNext(val) {
        const valBool = !!val;
        if (valBool !== this._stopNext) {
            this._stopNext = valBool;
        }
    }
    /**
     * A read-only getter that generates an ID string for the wizard page from
     * either the value passed to the ClrWizardPage "id" input or a wizard page
     * counter shared across all wizard pages in the application.
     *
     * Note that the value passed into the ID input Will be prefixed with
     * "clr-wizard-page-".
     *
     * @readonly
     *
     * @memberof ClrWizardPage
     */
    get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        const idIsNonZeroFalsy = !this._id && this._id !== 0;
        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `clr-wizard-page-${this._id}`;
    }
    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
     * ClrWizardPage.readyToComplete is more logical and declarative.
     *
     * @memberof WizardPage
     *
     */
    get readyToComplete() {
        return !this.nextStepDisabled;
    }
    /**
     * A page is marked as completed if it is both readyToComplete and completed,
     * as in the next or finish action has been executed while this page was current.
     *
     * Note there is and open question about how to handle pages that are marked
     * complete but who are no longer readyToComplete. This might indicate an error
     * state for the ClrWizardPage. Currently, the wizard does not acknowledge this state
     * and only returns that the page is incomplete.
     *
     * @memberof WizardPage
     *
     */
    get completed() {
        return this._complete && this.readyToComplete;
        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }
    /**
     * A ClrWizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * @memberof ClrWizardPage
     */
    set completed(value) {
        this._complete = value;
    }
    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * @memberof WizardPage
     *
     */
    get current() {
        return this.navService.currentPage === this;
    }
    get disabled() {
        return !this.enabled;
    }
    /**
     * A read-only getter that returns whether or not the page is navigable
     * in the wizard. A wizard page can be navigated to if it is completed
     * or the page before it is completed.
     *
     * This getter handles the logic for enabling or disabling the links in
     * the step nav on the left Side of the wizard.
     *
     * @memberof WizardPage
     *
     */
    get enabled() {
        return this.current || this.completed || this.previousCompleted;
    }
    /**
     * A read-only getter that returns whether or not the page before this
     * ClrWizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * @memberof WizardPage
     *
     */
    get previousCompleted() {
        const previousPage = this.pageCollection.getPreviousPage(this);
        if (!previousPage) {
            return true;
        }
        return previousPage.completed;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get title() {
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get navTitle() {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get headerActions() {
        if (!this._headerActions) {
            return;
        }
        return this._headerActions.pageHeaderActionsTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get hasHeaderActions() {
        return !!this._headerActions;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get buttons() {
        if (!this._buttons) {
            return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }
    /**
     * A read-only getter that returns a boolean that says whether or
     * not the ClrWizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * @memberof WizardPage
     *
     */
    get hasButtons() {
        return !!this._buttons;
    }
    /**
     * Uses the nav service to make the ClrWizardPage the current page in the
     * wizard. Bypasses all checks but still emits the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * @memberof WizardPage
     *
     */
    makeCurrent() {
        this.navService.currentPage = this;
    }
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    ngOnInit() {
        const navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    }
    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * ClrWizardPage needs this ID string for aria information.
     *
     * @memberof WizardPage
     *
     */
    get stepItemId() {
        return this.pageCollection.getStepItemIdForPage(this);
    }
};
tslib_1.__decorate([
    ContentChild(ClrWizardPageTitle, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageTitle)
], ClrWizardPage.prototype, "pageTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageNavTitle, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageNavTitle)
], ClrWizardPage.prototype, "pageNavTitle", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageButtons, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageButtons)
], ClrWizardPage.prototype, "_buttons", void 0);
tslib_1.__decorate([
    ContentChild(ClrWizardPageHeaderActions, { static: true }),
    tslib_1.__metadata("design:type", ClrWizardPageHeaderActions)
], ClrWizardPage.prototype, "_headerActions", void 0);
tslib_1.__decorate([
    Input('clrWizardPageNextDisabled'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "nextStepDisabled", null);
tslib_1.__decorate([
    Output('clrWizardPageNextDisabledChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextStepDisabledChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreviousDisabled'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "previousStepDisabled", null);
tslib_1.__decorate([
    Output('clrWizardPagePreviousDisabledChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousStepDisabledChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefault'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizardPage.prototype, "preventDefault", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefaultCancel'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopCancel", null);
tslib_1.__decorate([
    Output('clrWizardPagePreventDefaultCancelChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "stopCancelChange", void 0);
tslib_1.__decorate([
    Input('clrWizardPagePreventDefaultNext'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopNext", null);
tslib_1.__decorate([
    Output('clrWizardPageOnCommit'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onCommit", void 0);
tslib_1.__decorate([
    Output('clrWizardPageOnLoad'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onLoad", void 0);
tslib_1.__decorate([
    Output('clrWizardPageOnCancel'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "pageOnCancel", void 0);
tslib_1.__decorate([
    Output('clrWizardPageFinish'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "finishButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPagePrevious'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageNext'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageDanger'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "dangerButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPagePrimary'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "primaryButtonClicked", void 0);
tslib_1.__decorate([
    Output('clrWizardPageCustomButton'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "customButtonClicked", void 0);
tslib_1.__decorate([
    Input('id'),
    tslib_1.__metadata("design:type", Object)
], ClrWizardPage.prototype, "_id", void 0);
ClrWizardPage = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard-page',
        template: '<ng-content></ng-content>',
        host: {
            '[id]': 'id',
            '[attr.aria-hidden]': '!current',
            '[attr.aria-labelledby]': 'stepItemId',
            '[class.active]': 'current',
            '[class.clr-wizard-page]': 'true',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [WizardNavigationService,
        PageCollectionService,
        ButtonHubService])
], ClrWizardPage);
export { ClrWizardPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUUxRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV6RCxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFFeEI7Ozs7Ozs7OztHQVNHO0FBWUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4Qjs7OztPQUlHO0lBQ0gsWUFDVSxVQUFtQyxFQUNwQyxjQUFxQyxFQUNyQyxhQUErQjtRQUY5QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBZ0R4Qzs7OztXQUlHO1FBQ0ssc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBbUNsQzs7Ozs7O1dBTUc7UUFDd0MsMkJBQXNCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUc7Ozs7V0FJRztRQUNLLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQW1D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QXNCLFlBQVk7MERBQXFDO0FBdUJyRTtJQUEvQixNQUFNLENBQUMsc0JBQXNCLENBQUM7c0NBQXVCLFlBQVk7MkRBQThCO0FBRTNEO0lBQXBDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztzQ0FBc0IsWUFBWTswREFBOEI7QUFhdkY7SUFBWixLQUFLLENBQUMsSUFBSSxDQUFDOzswQ0FBMkM7QUFwWjVDLGFBQWE7SUFYekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1lBQ1osb0JBQW9CLEVBQUUsVUFBVTtZQUNoQyx3QkFBd0IsRUFBRSxZQUFZO1lBQ3RDLGdCQUFnQixFQUFFLFNBQVM7WUFDM0IseUJBQXlCLEVBQUUsTUFBTTtTQUNsQztLQUNGLENBQUM7NkNBUXNCLHVCQUF1QjtRQUNwQixxQkFBcUI7UUFDdEIsZ0JBQWdCO0dBVDdCLGFBQWEsQ0E4bkJ6QjtTQTluQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYnV0dG9uLWh1Yi5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlQnV0dG9ucyB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtYnV0dG9ucyc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucyB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtaGVhZGVyLWFjdGlvbnMnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZU5hdlRpdGxlIH0gZnJvbSAnLi93aXphcmQtcGFnZS1uYXZ0aXRsZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlVGl0bGUgfSBmcm9tICcuL3dpemFyZC1wYWdlLXRpdGxlJztcblxubGV0IHdpemFyZFBhZ2VJbmRleCA9IDA7XG5cbi8qKlxuICogVGhlIENscldpemFyZFBhZ2UgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBjb250ZW50IG9mIGVhY2ggc3RlcFxuICogaW4gdGhlIHdpemFyZCB3b3JrZmxvdy5cbiAqXG4gKiBDbHJXaXphcmRQYWdlIGNvbXBvbmVudCBoYXMgaG9va3MgaW50byB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIChDbHJXaXphcmRQYWdlLm5hdlNlcnZpY2UpLFxuICogcGFnZSBjb2xsZWN0aW9uIChDbHJXaXphcmRQYWdlLnBhZ2VDb2xsZWN0aW9uKSwgYW5kIGJ1dHRvbiBzZXJ2aWNlXG4gKiAoQ2xyV2l6YXJkUGFnZS5idXR0b25TZXJ2aWNlKS4gVGhlc2UgdGhyZWUgcHJvdmlkZXJzIGFyZSBzaGFyZWQgYWNyb3NzIHRoZSBjb21wb25lbnRzXG4gKiB3aXRoaW4gZWFjaCBpbnN0YW5jZSBvZiBhIFdpemFyZC5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtcGFnZScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchY3VycmVudCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnc3RlcEl0ZW1JZCcsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2N1cnJlbnQnLFxuICAgICdbY2xhc3MuY2xyLXdpemFyZC1wYWdlXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENscldpemFyZFBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHBhZ2UgdGl0bGUgd2hpY2ggaXMgdXNlZCBmb3IgYSBudW1iZXJcbiAgICogb2YgZGlmZmVyZW50IHRhc2tzIGZvciBkaXNwbGF5IGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VUaXRsZSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIHBhZ2VUaXRsZTogQ2xyV2l6YXJkUGFnZVRpdGxlO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgZGVzaXJlZCB0aXRsZSBmb3IgdGhlIHBhZ2UncyBzdGVwIGluIHRoZVxuICAgKiBuYXZpZ2F0aW9uIG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHdpemFyZC4gQ2FuIGJlIHByb2plY3RlZCB0byBjaGFuZ2UgdGhlXG4gICAqIG5hdmlnYXRpb24gbGluaydzIHRleHQuXG4gICAqXG4gICAqIElmIG5vdCBkZWZpbmVkLCB0aGVuIENscldpemFyZFBhZ2UucGFnZVRpdGxlIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBzdGVwbmF2LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlTmF2VGl0bGUsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBwYWdlTmF2VGl0bGU6IENscldpemFyZFBhZ2VOYXZUaXRsZTtcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGJ1dHRvbnMgZGVmaW5lZCB3aXRoaW4gdGhlIHBhZ2UuIElmIG5vdCBkZWZpbmVkLFxuICAgKiB0aGUgd2l6YXJkIGRlZmF1bHRzIHRvIHRoZSBzZXQgb2YgYnV0dG9ucyBkZWZpbmVkIGFzIGEgZGlyZWN0IGNoaWxkIG9mIHRoZVxuICAgKiB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VCdXR0b25zLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgX2J1dHRvbnM6IENscldpemFyZFBhZ2VCdXR0b25zO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgaGVhZGVyIGFjdGlvbnMgZGVmaW5lZCB3aXRoaW4gdGhlIHBhZ2UuIElmIG5vdCBkZWZpbmVkLFxuICAgKiB0aGUgd2l6YXJkIGRlZmF1bHRzIHRvIHRoZSBzZXQgb2YgaGVhZGVyIGFjdGlvbnMgZGVmaW5lZCBhcyBhIGRpcmVjdCBjaGlsZCBvZiB0aGVcbiAgICogd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIF9oZWFkZXJBY3Rpb25zOiBDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucztcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25leHRTdGVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB3aGV0aGVyIG9yIG5vdCB0aGUgd2l6YXJkIHNob3VsZCBiZSBhbGxvd2VkXG4gICAqIHRvIG1vdmUgdG8gdGhlIG5leHQgcGFnZS5cbiAgICpcbiAgICogVXNlZnVsIGZvciBpbi1wYWdlIHZhbGlkYXRpb24gYmVjYXVzZSBpdCBwcmV2ZW50cyBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICogYW5kIHZpc2libHkgZGlzYWJsZXMgdGhlIG5leHQgYnV0dG9uLlxuICAgKlxuICAgKiBEb2VzIG5vdCByZXF1aXJlIHRoYXQgeW91IHJlLWltcGxlbWVudCBuYXZpZ2F0aW9uIHJvdXRpbmVzIGxpa2UgeW91XG4gICAqIHdvdWxkIGlmIHlvdSB3ZXJlIHVzaW5nIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHQgb3JcbiAgICogV2l6YXJkLnByZXZlbnREZWZhdWx0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBuZXh0U3RlcERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uZXh0U3RlcERpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgcGFnZSBzaG91bGQgYWxsb3cgZm9yd2FyZCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlTmV4dERpc2FibGVkJylcbiAgcHVibGljIHNldCBuZXh0U3RlcERpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbEJvb2wgPSAhIXZhbDtcbiAgICBpZiAodmFsQm9vbCAhPT0gdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZCA9IHZhbEJvb2w7XG4gICAgICB0aGlzLm5leHRTdGVwRGlzYWJsZWRDaGFuZ2UuZW1pdCh2YWxCb29sKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdmFsdWUgb2YgQ2xyV2l6YXJkUGFnZS5uZXh0U3RlcERpc2FibGVkIGNoYW5nZXMuXG4gICAqIFNob3VsZCBlbWl0IHRoZSBuZXcgdmFsdWUgb2YgbmV4dFN0ZXBEaXNhYmxlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VOZXh0RGlzYWJsZWRDaGFuZ2UnKSBuZXh0U3RlcERpc2FibGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9wcmV2aW91c1N0ZXBEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHRlbGxzIHdoZXRoZXIgb3Igbm90IHRoZSB3aXphcmQgc2hvdWxkIGJlIGFsbG93ZWRcbiAgICogdG8gbW92ZSB0byB0aGUgcHJldmlvdXMgcGFnZS5cbiAgICpcbiAgICogVXNlZnVsIGZvciBpbi1wYWdlIHZhbGlkYXRpb24gYmVjYXVzZSBpdCBwcmV2ZW50cyBiYWNrd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGFuZCB2aXNpYmx5IGRpc2FibGVzIHRoZSBwcmV2aW91cyBidXR0b24uXG4gICAqXG4gICAqIERvZXMgbm90IHJlcXVpcmUgdGhhdCB5b3UgcmUtaW1wbGVtZW50IG5hdmlnYXRpb24gcm91dGluZXMgbGlrZSB5b3VcbiAgICogd291bGQgaWYgeW91IHdlcmUgdXNpbmcgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdCBvclxuICAgKiBXaXphcmQucHJldmVudERlZmF1bHQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByZXZpb3VzU3RlcERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBhZ2Ugc2hvdWxkIGFsbG93IGJhY2t3YXJkIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2aW91c0Rpc2FibGVkJylcbiAgcHVibGljIHNldCBwcmV2aW91c1N0ZXBEaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3ByZXZpb3VzU3RlcERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZCA9IHZhbEJvb2w7XG4gICAgICB0aGlzLnByZXZpb3VzU3RlcERpc2FibGVkQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIG9mIENscldpemFyZFBhZ2UucHJldmlvdXNTdGVwRGlzYWJsZWQgY2hhbmdlcy5cbiAgICogU2hvdWxkIGVtaXQgdGhlIG5ldyB2YWx1ZSBvZiBwcmV2aW91c1N0ZXBEaXNhYmxlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VQcmV2aW91c0Rpc2FibGVkQ2hhbmdlJylcbiAgcHVibGljIHByZXZpb3VzU3RlcERpc2FibGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBhbGwgYWN0aW9ucyBmcm9tIHRoZSBwYWdlIGxldmVsLCBzbyB5b3UgY2FuIHVzZSBhbiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yXG4gICAqIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIHdpdGggYSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0IChjbHJXaXphcmRQYWdlT25Db21taXQgb3V0cHV0KSxcbiAgICogQ2xyV2l6YXJkUGFnZS5vbkNhbmNlbCAoY2xyV2l6YXJkUGFnZU9uQ2FuY2VsIG91dHB1dCksIG9yIG9uZVxuICAgKiBvZiB0aGUgZ3JhbnVsYXIgcGFnZS1sZXZlbCBidXR0b24gY2xpY2sgZXZlbnQgZW1pdHRlcnMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdCcpIHB1YmxpYyBwcmV2ZW50RGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RvcENhbmNlbCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHJldHJpZXZlcyB3aGV0aGVyIHRoZSBwYWdlIGlzIHByZXZlbnRpbmcgdGhlIGNhbmNlbCBhY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0b3BDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BDYW5jZWw7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBjYW5jZWwgYWN0aW9uIGZyb20gdGhlIHBhZ2UgbGV2ZWwuIEFsbG93cyB5b3UgdG8gdXNlIGFuXG4gICAqIGFsdGVybmF0ZSBmdW5jdGlvbiBmb3IgdmFsaWRhdGlvbiBvciBkYXRhLW11bmdpbmcgYmVmb3JlIGNhbmNlbGxpbmcgdGhlXG4gICAqIHdpemFyZCB3aGVuIGNvbWJpbmVkIHdpdGggdGhlIENscldpemFyZFBhZ2Uub25DYW5jZWxcbiAgICogKHRoZSBjbHJXaXphcmRQYWdlT25DYW5jZWwgb3V0cHV0KS5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhhdCB5b3UgbWFudWFsbHkgY2xvc2UgdGhlIHdpemFyZCBmcm9tIHlvdXIgaG9zdCBjb21wb25lbnQsXG4gICAqIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gV2l6YXJkLmZvcmNlTmV4dCgpIG9yIHdpemFyZC5uZXh0KCk7XG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdENhbmNlbCcpXG4gIHB1YmxpYyBzZXQgc3RvcENhbmNlbCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3N0b3BDYW5jZWwpIHtcbiAgICAgIHRoaXMuX3N0b3BDYW5jZWwgPSB2YWxCb29sO1xuICAgICAgdGhpcy5zdG9wQ2FuY2VsQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRDYW5jZWxDaGFuZ2UnKSBzdG9wQ2FuY2VsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9zdG9wTmV4dCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHRlbGxzIHlvdSB3aGV0aGVyIHRoZSBwYWdlIGlzIHByZXZlbnRpbmcgdGhlIG5leHQgYWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdG9wTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE5leHQ7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIGZvcndhcmQgbmF2aWdhdGlvbiBmcm9tIHRoZSBwYWdlIGxldmVsLiBBbGxvd3MgeW91IHRvIHVzZSBhblxuICAgKiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIGJlZm9yZSBtb3ZpbmcgdGhlXG4gICAqIHdpemFyZCB0byB0aGUgbmV4dCBwYWdld2hlbiBjb21iaW5lZCB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0XG4gICAqIChjbHJXaXphcmRQYWdlT25Db21taXQpIG9yIENscldpemFyZFBhZ2UubmV4dEJ1dHRvbkNsaWNrZWRcbiAgICogKGNscldpemFyZFBhZ2VOZXh0KSBvdXRwdXRzLlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGF0IHlvdSBtYW51YWxseSB0ZWxsIHRoZSB3aXphcmQgdG8gbmF2aWdhdGUgZm9yd2FyZCBmcm9tXG4gICAqIHRoZSBob3N0Q29tcG9uZW50LCB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIFdpemFyZC5mb3JjZU5leHQoKSBvclxuICAgKiB3aXphcmQubmV4dCgpO1xuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHROZXh0JylcbiAgcHVibGljIHNldCBzdG9wTmV4dCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3N0b3BOZXh0KSB7XG4gICAgICB0aGlzLl9zdG9wTmV4dCA9IHZhbEJvb2w7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZXIgY2FycmllZCBvdmVyIGZyb20gYSBsZWdhY3kgdmVyc2lvbiBvZiBDbHJXaXphcmRQYWdlLlxuICAgKiBGaXJlcyBhbiBldmVudCBvbiBDbHJXaXphcmRQYWdlIHdoZW5ldmVyIHRoZSBuZXh0IG9yIGZpbmlzaCBidXR0b25zXG4gICAqIGFyZSBjbGlja2VkIGFuZCB0aGUgcGFnZSBpcyB0aGUgY3VycmVudCBwYWdlIG9mIHRoZSBXaXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgZW1pdCBhbiBldmVudCB3aGVuIGEgY3VzdG9tXG4gICAqIGJ1dHRvbiBpcyB1c2VkIGluIHBsYWNlIG9mIGEgbmV4dCBvciBmaW5pc2ggYnV0dG9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU9uQ29tbWl0Jykgb25Db21taXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBDbHJXaXphcmRQYWdlIGJlY29tZXMgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGVcbiAgICogV2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU9uTG9hZCcpIG9uTG9hZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIENscldpemFyZFBhZ2UgaW52b2tlcyB0aGUgY2FuY2VsIHJvdXRpbmUgZm9yIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2Uuc3RvcENhbmNlbFxuICAgKiAoY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0Q2FuY2VsKSBvciBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dHMgdG8gaW1wbGVtZW50IGN1c3RvbSBjYW5jZWxcbiAgICogZnVuY3Rpb25hbGl0eSBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBjYW5jZWxsaW5nIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5jbG9zZSgpIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LlxuICAgKiBUaGlzIGNvbnN0aXR1ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mIHRoZSBjYW5jZWwgZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkNhbmNlbCcpIHBhZ2VPbkNhbmNlbDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZmluaXNoXG4gICAqIGZ1bmN0aW9uYWxpdHkgYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBjb21wbGV0ZVxuICAgKiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZmluaXNoKCkgb3IgV2l6YXJkLmZvcmNlRmluaXNoKClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGZpbmlzaCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZUZpbmlzaCcpIGZpbmlzaEJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gYmFja3dhcmRzXG4gICAqIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnb1xuICAgKiBiYWNrd2FyZHMgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLnByZXZpb3VzKClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGJhY2t3YXJkcyBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXMnKSBwcmV2aW91c0J1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgbmV4dCBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIENscldpemFyZFBhZ2UgaXNcbiAgICogdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmb3J3YXJkc1xuICAgKiBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ29cbiAgICogdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZm9yY2VOZXh0KCkgb3IgV2l6YXJkLm5leHQoKVxuICAgKiBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpcyBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZlxuICAgKiB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlTmV4dCcpIG5leHRCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSBkYW5nZXIgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuIEJ5IGRlZmF1bHQsIGEgZGFuZ2VyIGJ1dHRvbiB3aWxsIGFjdCBhc1xuICAgKiBlaXRoZXIgYSBcIm5leHRcIiBvciBcImZpbmlzaFwiIGJ1dHRvbiBkZXBlbmRpbmcgb24gaWYgdGhlIENscldpemFyZFBhZ2UgaXMgdGhlXG4gICAqIGxhc3QgcGFnZSBvciBub3QuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogb3IgZmluaXNoIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwgd2hlbiB0aGUgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkbyB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm5cbiAgICogdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ28gdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgd2l6YXJkIG9yXG4gICAqIGZpbmlzaCB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZmluaXNoKCksIFdpemFyZC5mb3JjZUZpbmlzaCgpLFxuICAgKiBXaXphcmQuZm9yY2VOZXh0KCkgb3IgV2l6YXJkLm5leHQoKSBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpc1xuICAgKiBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZiB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGFuZFxuICAgKiBmaW5pc2ggZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VEYW5nZXInKSBkYW5nZXJCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSBuZXh0LCBmaW5pc2gsIG9yIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlXG4gICAqIENscldpemFyZFBhZ2UgaXMgdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmb3J3YXJkc1xuICAgKiBvciBmaW5pc2ggbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbCwgcmVnYXJkbGVzcyBvZiB0aGUgdHlwZSBvZlxuICAgKiBwcmltYXJ5IGJ1dHRvbi5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG8gdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuXG4gICAqIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZCBvclxuICAgKiBmaW5pc2ggdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpLCBXaXphcmQuZm9yY2VGaW5pc2goKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KCkgZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXNcbiAgICogY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2YgdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBhbmRcbiAgICogZmluaXNoIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJpbWFyeScpIHByaW1hcnlCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlQ3VzdG9tQnV0dG9uJykgY3VzdG9tQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGlucHV0IHZhbHVlIHRoYXQgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIGdlbmVyYXRlIHRoZSBDbHJXaXphcmRQYWdlIElEIGFzXG4gICAqIHdlbGwgYXMgdGhlIHN0ZXAgbmF2IGl0ZW0gSUQuXG4gICAqXG4gICAqIFR5cGVkIGFzIGFueSBiZWNhdXNlIGl0IHNob3VsZCBiZSBhYmxlIHRvIGFjY2VwdCBudW1iZXJzIGFzIHdlbGwgYXNcbiAgICogc3RyaW5ncy4gUGFzc2luZyBhbiBpbmRleCBmb3Igd2l6YXJkIHdob3NlIHBhZ2VzIGFyZSBjcmVhdGVkIHdpdGggYW5cbiAgICogbmdGb3IgbG9vcCBpcyBhIGNvbW1vbiB1c2UgY2FzZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnaWQnKSBfaWQ6IGFueSA9ICh3aXphcmRQYWdlSW5kZXgrKykudG9TdHJpbmcoKTtcblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgZ2VuZXJhdGVzIGFuIElEIHN0cmluZyBmb3IgdGhlIHdpemFyZCBwYWdlIGZyb21cbiAgICogZWl0aGVyIHRoZSB2YWx1ZSBwYXNzZWQgdG8gdGhlIENscldpemFyZFBhZ2UgXCJpZFwiIGlucHV0IG9yIGEgd2l6YXJkIHBhZ2VcbiAgICogY291bnRlciBzaGFyZWQgYWNyb3NzIGFsbCB3aXphcmQgcGFnZXMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBJRCBpbnB1dCBXaWxsIGJlIHByZWZpeGVkIHdpdGhcbiAgICogXCJjbHItd2l6YXJkLXBhZ2UtXCIuXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBpZCgpIHtcbiAgICAvLyBjb3ZlcnMgdGhpbmdzIGxpa2UgbnVsbCwgdW5kZWZpbmVkLCBmYWxzZSwgYW5kIGVtcHR5IHN0cmluZ1xuICAgIC8vIHdoaWxlIGFsbG93aW5nIHplcm8gdG8gcGFzc1xuICAgIGNvbnN0IGlkSXNOb25aZXJvRmFsc3kgPSAhdGhpcy5faWQgJiYgdGhpcy5faWQgIT09IDA7XG5cbiAgICAvLyBpbiBhZGRpdGlvbiB0byBub24temVybyBmYWxzeSB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIF9pZCBpcyBub3QgYSBuZWdhdGl2ZVxuICAgIC8vIG51bWJlci5cbiAgICBpZiAoaWRJc05vblplcm9GYWxzeSB8fCB0aGlzLl9pZCA8IDApIHtcbiAgICAgIC8vIGd1YXJkIGhlcmUgaW4gdGhlIGV2ZW50IHRoYXQgaW5wdXQgYmVjb21lcyB1bmRlZmluZWQgb3IgbnVsbCBieSBhY2NpZGVudFxuICAgICAgdGhpcy5faWQgPSAod2l6YXJkUGFnZUluZGV4KyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBgY2xyLXdpemFyZC1wYWdlLSR7dGhpcy5faWR9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCBzZXJ2ZXMgYXMgYSBjb252ZW5pZW5jZSBmb3IgdGhvc2Ugd2hvIHdvdWxkIHJhdGhlclxuICAgKiBub3QgdGhpbmsgaW4gdGhlIHRlcm1zIG9mICFDbHJXaXphcmRQYWdlLm5leHRTdGVwRGlzYWJsZWQuIEZvciBzb21lIHVzZSBjYXNlcyxcbiAgICogQ2xyV2l6YXJkUGFnZS5yZWFkeVRvQ29tcGxldGUgaXMgbW9yZSBsb2dpY2FsIGFuZCBkZWNsYXJhdGl2ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVhZHlUb0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5uZXh0U3RlcERpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIHBhZ2UgaXMgbWFya2VkIGFzIGNvbXBsZXRlZCBpZiBpdCBpcyBib3RoIHJlYWR5VG9Db21wbGV0ZSBhbmQgY29tcGxldGVkLFxuICAgKiBhcyBpbiB0aGUgbmV4dCBvciBmaW5pc2ggYWN0aW9uIGhhcyBiZWVuIGV4ZWN1dGVkIHdoaWxlIHRoaXMgcGFnZSB3YXMgY3VycmVudC5cbiAgICpcbiAgICogTm90ZSB0aGVyZSBpcyBhbmQgb3BlbiBxdWVzdGlvbiBhYm91dCBob3cgdG8gaGFuZGxlIHBhZ2VzIHRoYXQgYXJlIG1hcmtlZFxuICAgKiBjb21wbGV0ZSBidXQgd2hvIGFyZSBubyBsb25nZXIgcmVhZHlUb0NvbXBsZXRlLiBUaGlzIG1pZ2h0IGluZGljYXRlIGFuIGVycm9yXG4gICAqIHN0YXRlIGZvciB0aGUgQ2xyV2l6YXJkUGFnZS4gQ3VycmVudGx5LCB0aGUgd2l6YXJkIGRvZXMgbm90IGFja25vd2xlZGdlIHRoaXMgc3RhdGVcbiAgICogYW5kIG9ubHkgcmV0dXJucyB0aGF0IHRoZSBwYWdlIGlzIGluY29tcGxldGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGxldGUgJiYgdGhpcy5yZWFkeVRvQ29tcGxldGU7XG5cbiAgICAvLyBGT1IgVjI6IFVOV0lORCBDT01QTEVURUQsIFJFQURZVE9DT01QTEVURSwgQU5EIEVSUk9SU1xuICAgIC8vIFNVQ0ggVEhBVCBFUlJPUlMgSVMgSVRTIE9XTiBJTlBVVC4gSUYgQSBTVEVQIElTXG4gICAgLy8gSU5DT01QTEVURSBBTkQgRVJST1JFRCwgRVJST1JFRCBXSUxMIE5PVCBTSE9XLlxuICAgIC8vIEZJUlNUIFFVRVNUSU9OOiBBTSBJIEdSRVkgT1IgQ09MT1JFRD9cbiAgICAvLyBTRUNPTkQgUVVFU1RJT046IEFNIEkgR1JFRU4gT1IgUkVEP1xuICB9XG5cbiAgLyoqXG4gICAqIEEgQ2xyV2l6YXJkUGFnZSBjYW4gYmUgbWFudWFsbHkgc2V0IHRvIGNvbXBsZXRlZCB1c2luZyB0aGlzIGJvb2xlYW4gc2V0dGVyLlxuICAgKiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHVzZXJzIHJlbHkgb24gdGhlIGNvbnZlbmllbmNlIGZ1bmN0aW9ucyBpbiB0aGUgd2l6YXJkXG4gICAqIGFuZCBuYXZpZ2F0aW9uIHNlcnZpY2UgaW5zdGVhZCBvZiBtYW51YWxseSBzZXR0aW5nIHBhZ2Vz4oCZIGNvbXBsZXRpb24gc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBwdWJsaWMgc2V0IGNvbXBsZXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbXBsZXRlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdpdGggdGhlIG5hdmlnYXRpb24gc2VydmljZSB0byBzZWUgaWYgaXQgaXMgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlID09PSB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwYWdlIGlzIG5hdmlnYWJsZVxuICAgKiBpbiB0aGUgd2l6YXJkLiBBIHdpemFyZCBwYWdlIGNhbiBiZSBuYXZpZ2F0ZWQgdG8gaWYgaXQgaXMgY29tcGxldGVkXG4gICAqIG9yIHRoZSBwYWdlIGJlZm9yZSBpdCBpcyBjb21wbGV0ZWQuXG4gICAqXG4gICAqIFRoaXMgZ2V0dGVyIGhhbmRsZXMgdGhlIGxvZ2ljIGZvciBlbmFibGluZyBvciBkaXNhYmxpbmcgdGhlIGxpbmtzIGluXG4gICAqIHRoZSBzdGVwIG5hdiBvbiB0aGUgbGVmdCBTaWRlIG9mIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudCB8fCB0aGlzLmNvbXBsZXRlZCB8fCB0aGlzLnByZXZpb3VzQ29tcGxldGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBhZ2UgYmVmb3JlIHRoaXNcbiAgICogQ2xyV2l6YXJkUGFnZSBpcyBjb21wbGV0ZWQuIFRoaXMgaXMgdXNlZnVsIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIG9yIG5vdFxuICAgKiBhIHBhZ2UgaXMgbmF2aWdhYmxlIGlmIGl0IGlzIG5vdCBjdXJyZW50IG9yIGFscmVhZHkgY29tcGxldGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBwcmV2aW91c0NvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSh0aGlzKTtcblxuICAgIGlmICghcHJldmlvdXNQYWdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNQYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCB0aXRsZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdlVGl0bGUucGFnZVRpdGxlVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgbmF2VGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKHRoaXMucGFnZU5hdlRpdGxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlTmF2VGl0bGUucGFnZU5hdlRpdGxlVGVtcGxhdGVSZWY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhZ2VUaXRsZS5wYWdlVGl0bGVUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoZWFkZXJBY3Rpb25zKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICghdGhpcy5faGVhZGVyQWN0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faGVhZGVyQWN0aW9ucy5wYWdlSGVhZGVyQWN0aW9uc1RlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhhc0hlYWRlckFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5faGVhZGVyQWN0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBidXR0b25zKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICghdGhpcy5fYnV0dG9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYnV0dG9ucy5wYWdlQnV0dG9uc1RlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgYSBib29sZWFuIHRoYXQgc2F5cyB3aGV0aGVyIG9yXG4gICAqIG5vdCB0aGUgQ2xyV2l6YXJkUGFnZSBpbmNsdWRlcyBidXR0b25zLiBVc2VkIHRvIGRldGVybWluZSBpZiB0aGVcbiAgICogV2l6YXJkIHNob3VsZCBvdmVycmlkZSB0aGUgZGVmYXVsdCBidXR0b24gc2V0IGRlZmluZWQgYXNcbiAgICogaXRzIGRpcmVjdCBjaGlsZHJlbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGFzQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9idXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgdGhlIG5hdiBzZXJ2aWNlIHRvIG1ha2UgdGhlIENscldpemFyZFBhZ2UgdGhlIGN1cnJlbnQgcGFnZSBpbiB0aGVcbiAgICogd2l6YXJkLiBCeXBhc3NlcyBhbGwgY2hlY2tzIGJ1dCBzdGlsbCBlbWl0cyB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWRcbiAgICogKGNscldpemFyZFBhZ2VPbkxvYWQpIG91dHB1dC5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgaXQgaXMgYmV0dGVyIHRvIHVzZSB0aGUgZGVmYXVsdCBuYXZpZ2F0aW9uIGZ1bmN0aW9uc1xuICAgKiBpbiBXaXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgbWFrZUN1cnJlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlID0gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rcyB0aGUgbmF2IHNlcnZpY2UgYW5kIGVzdGFibGlzaGVzIHRoZSBjdXJyZW50IHBhZ2UgaWYgb25lIGlzIG5vdCBkZWZpbmVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdlNlcnZpY2UgPSB0aGlzLm5hdlNlcnZpY2U7XG4gICAgaWYgKCFuYXZTZXJ2aWNlLmN1cnJlbnRQYWdlICYmICFuYXZTZXJ2aWNlLm5hdlNlcnZpY2VMb2FkZWQpIHtcbiAgICAgIHRoaXMubWFrZUN1cnJlbnQoKTtcbiAgICAgIHRoaXMubmF2U2VydmljZS5uYXZTZXJ2aWNlTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgaWQgdXNlZCBieSB0aGUgc3RlcCBuYXYgaXRlbSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhZ2UuXG4gICAqXG4gICAqIENscldpemFyZFBhZ2UgbmVlZHMgdGhpcyBJRCBzdHJpbmcgZm9yIGFyaWEgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0ZXBJdGVtSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRTdGVwSXRlbUlkRm9yUGFnZSh0aGlzKTtcbiAgfVxufVxuIl19