import { Stack } from "@mui/material";
import React, { useMemo } from "react";
import { HTMLRootTag } from "../../../domain/html/html.intefaces";

// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseItemProps<T extends {} = any, A extends {} = any> {
  index?: number;
  id?: string;
  component?: HTMLRootTag;
  data: T;
  additionalProps?: A;
  children?: React.ReactNode;
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
export function StackList<T extends {} = any, A extends {} = any>({
  data,
  additionalProps: additionalPropsFn,
  // placeholderData,
  component: ItemComponent,
  itemKey: getItemKey,
  deps = [],
}: StackListProps<T, A>) {
  const renderedList = useMemo(() => (
    <Stack component="ol" spacing={ 2 } sx={{ m: 0, p: 0, listStyle: "none" }}>
      { data.map((itemData, index) => {
        const key = `${ getItemKey(itemData, index) }`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: This expression is not callable
        const additionalProps = typeof additionalPropsFn === "function" ? additionalPropsFn(itemData, index) : additionalPropsFn;

        return (
          <ItemComponent
            key={ key }
            // TODO: Do we need to set the id attribute?
            id={ key }
            index={ index }
            component="li"
            data={ itemData }
            additionalProps={ additionalProps } />
        );
      }) }
    </Stack>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [data, ItemComponent, ...deps]);

  return renderedList;
}
