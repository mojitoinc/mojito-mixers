import React from 'react';
import { HTMLRootTag } from '../../../domain/html/html.intefaces';
export interface BaseItemProps<T extends {} = any, A extends {} = any> {
    index?: number;
    id?: string;
    component?: HTMLRootTag;
    data: T;
    additionalProps?: A;
    children?: React.ReactNode;
}
export interface StackListProps<T extends {} = any, A extends {} = any> {
    data: T[];
    additionalProps?: A | ((itemData: T, index: number) => A);
    component: React.ComponentType<BaseItemProps<T, A>>;
    itemKey: (itemData: T, index: number) => React.ReactText;
    deps?: React.DependencyList;
}
export declare function StackList<T extends {} = any, A extends {} = any>({ data, additionalProps: additionalPropsFn, component: ItemComponent, itemKey: getItemKey, deps, }: StackListProps<T, A>): JSX.Element;
