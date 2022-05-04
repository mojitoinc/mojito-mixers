import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, Stack, Tooltip, Box, BoxProps } from "@mui/material";
import React, { useCallback } from "react";
import { Theme, SxProps } from "@mui/material/styles";
import { SecondaryButton } from "../../shared/SecondaryButton/SecondaryButton";
import { ThemeColors } from "../../../domain/mui/mui.interfaces";
import { DisplayBox } from "../DisplayBox/DisplayBox";
import { InlineField } from "../../shared/InlineField/InlineField";

export interface SavedItemLabels {
  active?: string;
  cvv?: string;
  edit?: string;
  delete?: string;
  select?: string;
}

export interface SavedItemStatus {
  label: string;
  tooltip: string;
  color: ThemeColors;
}

export type SavedItemActionEventHandler = (id: string, event?: React.MouseEvent<HTMLButtonElement>) => void;

export interface SavedItemProps {
  id?: string;
  variant?: "stacked" | "row";
  labels?: SavedItemLabels;
  disabled?: boolean | "selectOnly";
  active?: boolean;
  status?: SavedItemStatus;
  onEdit?: SavedItemActionEventHandler;
  onDelete?: SavedItemActionEventHandler;
  onPick?: SavedItemActionEventHandler;
  cvvLabel?: string;
  cvvError?: boolean;
  onCvvChange?: React.ChangeEventHandler<HTMLInputElement>;
  boxProps?: BoxProps;
}

const DEFAULT_SAVED_ITEM_LABELS: Required<SavedItemLabels> = {
  active: "Active",
  cvv: "CVV",
  edit: "Edit Info",
  delete: "Delete",
  select: "Use Info",
};

const DISPLAY_BOX_SX: SxProps<Theme> = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  },
};

export const SavedItem: React.FC<SavedItemProps & { children: React.ReactNode }> = ({
  children,
  id,
  variant = "stacked",
  labels: customLabels = {},
  disabled,
  active,
  status,
  onEdit,
  onDelete,
  onPick,
  cvvLabel,
  cvvError,
  onCvvChange,
  boxProps,
}) => {
  const labels = { ...DEFAULT_SAVED_ITEM_LABELS, ...customLabels };
  const hasControls = active || onEdit || onDelete || onPick;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    const { action } = currentTarget.dataset;

    if (!action) return;

    const callback = {
      edit: onEdit,
      delete: onDelete,
      pick: onPick,
    }[action];

    if (callback) callback(id || "", e);
  }, [id, onEdit, onDelete, onPick]);

  const disabledSelect = !!disabled;
  const disabledOther = disabled === true;

  let mainControlElement: React.ReactElement | null = null;

  if (status) {
    mainControlElement = (
      <Tooltip title={ status.tooltip }>
        <Chip size="small" color={ status.color } label={ status.label } variant="outlined" />
      </Tooltip>
    );
  } else if (active) {
    mainControlElement = (
      <>
        <Chip size="small" color="success" label="Active" variant="outlined" />

        { onCvvChange && <InlineField onChange={ onCvvChange } placeholder={ cvvLabel } error={ cvvError } sx={{ width: "52px" }} /> }
      </>
    );
  } else if (onPick) {
    mainControlElement = (
      <SecondaryButton onClick={ handleClick } disabled={ disabledSelect } data-action="pick">
        { labels.select }
      </SecondaryButton>
    );
  }

  return (
    <DisplayBox { ...boxProps } sx={{ ...DISPLAY_BOX_SX, ...boxProps?.sx }}>

      { variant === "stacked" ? (
        <Box sx={{ flex: 1, pb: 2 }}>
          { children }
        </Box>
      ) : (
        <Stack direction="row" spacing={ 2 } sx={{ flex: 1, pb: { xs: 2, sm: 0 }, alignItems: "center" }}>
          { children }
        </Stack>
      ) }

      { hasControls && (
        <Stack
          direction={ variant === "stacked" ? { xs: "row", sm: "column" } : "row" }
          spacing={ 1 }
          sx={{
            // display: "flex",
            // flexDirection: {
            //   xs: "column",
            //   sm: "column"
            // },
            justifyContent: "flex-start",
            alignItems: "flex-end",
            height: "auto",
          }}>

          { mainControlElement }

          <Box sx={{ mr: "auto !important", mb: "auto !important", display: { sm: variant === "row" ? "none" : "block" } }} />

          <Stack direction="row" spacing={ 1 } sx={{ pt: variant === "stacked" ? { xs: 0, sm: 1 } : 0 }}>
            { onEdit && (
              <SecondaryButton onClick={ handleClick } disabled={ disabledOther } startIcon={ <EditIcon /> } data-action="edit">
                { labels.edit }
              </SecondaryButton>
            ) }

            { onDelete && (
              <Tooltip title={ labels.delete }>
                <SecondaryButton onClick={ handleClick } disabled={ disabledOther } data-action="delete">
                  <DeleteIcon />
                </SecondaryButton>
              </Tooltip>
            ) }
          </Stack>
        </Stack>
      ) }

    </DisplayBox>
  );
};
