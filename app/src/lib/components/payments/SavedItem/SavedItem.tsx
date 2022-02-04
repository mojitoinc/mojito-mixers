import Box, { BoxProps } from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SecondaryButton } from "../../shared/SecondaryButton/SecondaryButton";
import { Chip, Stack, Tooltip } from "@mui/material";
import React, { useCallback } from "react";
import { ThemeColors } from "../../../domain/mui/mui.interfaces";

export interface SavedItemLabels {
  active?: string;
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
  boxProps?: BoxProps;
}

const DEFAULT_SAVED_ITEM_LABELS: Required<SavedItemLabels> = {
  active: "Active",
  edit: "Edit Info",
  delete: "Delete",
  select: "Use Info",
};

export const SavedItem: React.FC<SavedItemProps> = ({
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
  boxProps,
}) => {
  const labels = { ...DEFAULT_SAVED_ITEM_LABELS, ...customLabels };
  const hasControls = active || onEdit || onDelete || onPick;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    const action = currentTarget.dataset.action;

    if (!action) return;

    const callback = {
      edit: onEdit,
      delete: onDelete,
      pick: onPick,
    }[action];

    if (callback) callback(id, e);
  }, [id, onEdit, onDelete, onPick]);

  const disabledSelect = !!disabled;
  const disabledOther = disabled === true;

  let mainControlElement: React.ReactElement = null;

  if (status) {
    mainControlElement = (
      <Tooltip title={ status.tooltip }>
        <Chip size="small" color={ status.color } label={ status.label } variant="outlined" />
      </Tooltip>
    );
  } else if (active) {
    mainControlElement = <Chip size="small" color="success" label="Active" variant="outlined" />;
  } else if (onPick) {
    mainControlElement = (
      <SecondaryButton onClick={ handleClick } disabled={ disabledSelect } data-action="pick">
        { labels.select }
      </SecondaryButton>
    );
  }

  return (
    <Box
      { ...boxProps }
      sx={{
        p: 2,
        border: 1,
        borderRadius: "2px",
        backgroundColor: theme => theme.palette.grey["50"],
        borderColor: theme => theme.palette.grey["100"],
        color: theme => theme.palette.grey["800"],
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        ...boxProps?.sx,
      }}>

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
            justifyContent: "space-between",
            alignItems: "flex-end",
            height: "auto",
          }}>

          { mainControlElement }

          <Stack direction="row" spacing={ 1 } sx={{ pt: variant === "stacked" ? { xs: 0, sm: 1 } : 0, mt: "auto" }}>
            { onEdit && (
              <SecondaryButton onClick={ handleClick } disabled={ disabledOther } startIcon={ <EditIcon /> } data-action="edit">
                { labels.edit }
              </SecondaryButton>
            ) }

            { onDelete && (
              <Tooltip title={ labels.delete }>
                <SecondaryButton onClick={ handleClick } disabled={ disabledOther } data-action="delete">
                  <DeleteIcon  />
                </SecondaryButton>
              </Tooltip>
            ) }
          </Stack>
        </Stack>
      ) }

    </Box>
  );
};
