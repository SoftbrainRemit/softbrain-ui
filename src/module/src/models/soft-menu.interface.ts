
export interface SoftMenuItem {
    label: string;
    index: string;
    icon?: string;
    path?: string;
    disabled?: boolean;
    active?: boolean;
    show?: boolean;
    children?: Array<SoftMenuItem>;
}
