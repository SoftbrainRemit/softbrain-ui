import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const slideUpDownAnimation: AnimationTriggerMetadata = trigger('slideUpDownAnimation', [
    state('*', style({
        transform: 'translateY(-50%)',
        opacity: 0,
        visibility: 'hidden'
    })),
    state('false', style({
        transform: 'translateY(-50%)',
        opacity: 0,
        visibility: 'hidden'
    })),
    state('true', style({
        transform: 'translateY(0)',
        opacity: 1,
        visibility: 'inherit'
    })),
    transition('* => *', animate(`200ms ease-out`))
]);
