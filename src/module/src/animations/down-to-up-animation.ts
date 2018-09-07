import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const downToUpAnimation: AnimationTriggerMetadata = trigger('downToUpAnimation', [
    state('*', style({
        transform: 'translateY(10%)',
        opacity: 0,
        visibility: 'hidden'
    })),
    state('false', style({
        transform: 'translateY(10%)',
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
