import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const reversalAnimation: AnimationTriggerMetadata = trigger('reversalAnimation', [
    state('*', style({
        transform: 'rotate(0deg)'
    })),
    state('false', style({
        transform: 'rotate(0deg)'
    })),
    state('true', style({
        transform: 'rotate(180deg)'
    })),
    transition('* => *', animate(`200ms ease-out`))
]);
