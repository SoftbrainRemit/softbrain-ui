export interface SoftDialogData {
    type?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    content?: string;
    buttons?: SoftButtonData[];
}

export interface SoftButtonData {
    key?: string;
    label?: string;
    css?: string;
}

export enum SoftDialogResult {
    Ok = 1,
    Cancel = 0
}
