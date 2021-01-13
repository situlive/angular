export class MenuItem {
    label: string;
    path: string;
    filterChildren?: string;
    open?: boolean;
    children?: MenuItem[];
    childrenCount?: number;
}
