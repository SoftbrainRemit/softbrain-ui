import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const dropAnimation: AnimationTriggerMetadata = trigger('dropAnimation', [
    state('*', style({
        opacity: 0,
        height: 0,
        visibility: 'hidden'
    })),
    state('false', style({
        opacity: 0,
        height: 0,
        visibility: 'hidden'
    })),
    state('true', style({
        opacity: 1,
        height: '*',
        visibility: 'inherit'
    })),
    transition('* => *', animate(`200ms ease-out`))
]);
