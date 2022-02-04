import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { HTMLRootTag } from '../../../domain/html/html.intefaces';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseItemProps<T extends {} = any, A extends {} = any> {
  index?: number;
  id?: React.ReactText;
  tag?: HTMLRootTag;
  data: T;
  additionalProps?: A;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface StackListProps<T extends {} = any, A extends {} = any> {
  data: T[];
  additionalProps?: A | ((itemData: T, index: number) => A);
  // placeholderData?: T[];
  component: React.ComponentType<BaseItemProps<T, A>>;
  itemKey: (itemData: T, index: number) => React.ReactText;
  deps?: React.DependencyList;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function StackList<T extends {} = any, A extends {} = any> ({
  data,
  additionalProps: additionalPropsFn,
  // placeholderData,
  component: ItemComponent,
  itemKey: getItemKey,
  deps = [],
}: StackListProps<T, A>) {
  const renderedList = useMemo(() => {
    return (
      <Stack component="ol" spacing={1}>
        { data.map((itemData, index) => {
          const key = `${ getItemKey(itemData, index) }`;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: This expression is not callable
          const additionalProps = typeof additionalPropsFn === "function" ? additionalPropsFn(itemData, index) : additionalPropsFn;

          return (
            <ItemComponent
              key={ key }
              id={ key }
              index={ index }
              data={ itemData }
              additionalProps={ additionalProps } />
          );
        }) }
      </Stack>
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ItemComponent, ...deps]);

  return renderedList;
}
