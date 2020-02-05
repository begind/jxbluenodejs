/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Directive, Input, TemplateRef } from '@angular/core';
import { TreeFeaturesService } from './tree-features.service';
import { RecursiveTreeNodeModel } from './models/recursive-tree-node.model';
let ClrRecursiveForOf = class ClrRecursiveForOf {
    constructor(template, featuresService, cdr) {
        this.template = template;
        this.featuresService = featuresService;
        this.cdr = cdr;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    ngOnChanges() {
        let wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map(node => new RecursiveTreeNodeModel(node, null, this.getChildren, this.featuresService));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren, this.featuresService)];
        }
        if (!this.childrenFetchSubscription) {
            this.childrenFetchSubscription = this.featuresService.childrenFetched.subscribe(() => {
                this.cdr.detectChanges();
            });
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    }
    ngOnDestroy() {
        if (this.childrenFetchSubscription) {
            this.childrenFetchSubscription.unsubscribe();
        }
    }
};
tslib_1.__decorate([
    Input('clrRecursiveForOf'),
    tslib_1.__metadata("design:type", Object)
], ClrRecursiveForOf.prototype, "nodes", void 0);
tslib_1.__decorate([
    Input('clrRecursiveForGetChildren'),
    tslib_1.__metadata("design:type", Function)
], ClrRecursiveForOf.prototype, "getChildren", void 0);
ClrRecursiveForOf = tslib_1.__decorate([
    Directive({ selector: '[clrRecursiveFor][clrRecursiveForOf]' }),
    tslib_1.__metadata("design:paramtypes", [TemplateRef,
        TreeFeaturesService,
        ChangeDetectorRef])
], ClrRecursiveForOf);
export { ClrRecursiveForOf };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWZvci1vZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3JlY3Vyc2l2ZS1mb3Itb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBd0IsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBVzVFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLFlBQ1UsUUFBa0QsRUFDbEQsZUFBdUMsRUFDdkMsR0FBc0I7UUFGdEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEM7UUFDbEQsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQzdCLENBQUM7SUFVSiwrR0FBK0c7SUFDL0csV0FBVztRQUNULElBQUksT0FBb0MsQ0FBQztRQUN6QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQ2xIO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDbEc7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ25DLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNuRixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDOUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWhDNkI7SUFBM0IsS0FBSyxDQUFDLG1CQUFtQixDQUFDOztnREFBZ0I7QUFHTjtJQUFwQyxLQUFLLENBQUMsNEJBQTRCLENBQUM7O3NEQUF5QztBQVhsRSxpQkFBaUI7SUFEN0IsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHNDQUFzQyxFQUFFLENBQUM7NkNBRzFDLFdBQVc7UUFDSixtQkFBbUI7UUFDL0IsaUJBQWlCO0dBSnJCLGlCQUFpQixDQXdDN0I7U0F4Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZlYXR1cmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3JlY3Vyc2l2ZS10cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBBc3luY0FycmF5IH0gZnJvbSAnLi9tb2RlbHMvYXN5bmMtYXJyYXknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xyUmVjdXJzaXZlRm9yT2ZDb250ZXh0PFQ+IHtcbiAgJGltcGxpY2l0OiBUO1xuICBjbHJNb2RlbDogVHJlZU5vZGVNb2RlbDxUPjtcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclJlY3Vyc2l2ZUZvcl1bY2xyUmVjdXJzaXZlRm9yT2ZdJyB9KVxuZXhwb3J0IGNsYXNzIENsclJlY3Vyc2l2ZUZvck9mPFQ+IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQ8VD4+LFxuICAgIHByaXZhdGUgZmVhdHVyZXNTZXJ2aWNlOiBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgLy8gVE9ETzogYWNjZXB0IE5nSXRlcmFibGU8VD5cbiAgQElucHV0KCdjbHJSZWN1cnNpdmVGb3JPZicpIG5vZGVzOiBUIHwgVFtdO1xuXG4gIC8vIFRPRE86IGFjY2VwdCBOZ0l0ZXJhYmxlPFQ+IHJldHVybiB0eXBlXG4gIEBJbnB1dCgnY2xyUmVjdXJzaXZlRm9yR2V0Q2hpbGRyZW4nKSBnZXRDaGlsZHJlbjogKG5vZGU6IFQpID0+IEFzeW5jQXJyYXk8VD47XG5cbiAgcHJpdmF0ZSBjaGlsZHJlbkZldGNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLy8gSSdtIHVzaW5nIE9uQ2hhbmdlcyBpbnN0ZWFkIG9mIE9uSW5pdCB0byBlYXNpbHkga2VlcCB1cCB0byBkYXRlIHdpdGggZHluYW1pYyB0cmVlcy4gTWF5YmUgb3B0aW1pemFibGUgbGF0ZXIuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGxldCB3cmFwcGVkOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5ub2RlcykpIHtcbiAgICAgIHdyYXBwZWQgPSB0aGlzLm5vZGVzLm1hcChub2RlID0+IG5ldyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsKG5vZGUsIG51bGwsIHRoaXMuZ2V0Q2hpbGRyZW4sIHRoaXMuZmVhdHVyZXNTZXJ2aWNlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZWQgPSBbbmV3IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwodGhpcy5ub2RlcywgbnVsbCwgdGhpcy5nZXRDaGlsZHJlbiwgdGhpcy5mZWF0dXJlc1NlcnZpY2UpXTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuRmV0Y2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2hpbGRyZW5GZXRjaFN1YnNjcmlwdGlvbiA9IHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmNoaWxkcmVuRmV0Y2hlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24gPSB7XG4gICAgICB0ZW1wbGF0ZTogdGhpcy50ZW1wbGF0ZSxcbiAgICAgIHJvb3Q6IHdyYXBwZWQsXG4gICAgfTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuRmV0Y2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2hpbGRyZW5GZXRjaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19