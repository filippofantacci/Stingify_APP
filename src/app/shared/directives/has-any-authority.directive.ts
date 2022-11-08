import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *appHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[appHasAnyAuthority]',
})
export class HasAnyAuthorityDirective {
    private authorities: string[] = [];

    constructor(private userService: UserService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

    @Input()
    set jhiHasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        this.updateView();
    }

    private updateView(): void {
        const hasAnyAuthority = this.hasAnyAuthority();
        this.viewContainerRef.clear();
        if (hasAnyAuthority) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }

    private hasAnyAuthority(): boolean {
        return this.userService.hasAnyAuthority(this.authorities);
    } 
}
