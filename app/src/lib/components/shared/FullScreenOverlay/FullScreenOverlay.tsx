import { Box, Dialog, DialogContent, SxProps, Theme } from "@mui/material";
import React, { useRef } from "react";
import { useShakeAnimation } from "../../../utils/animationUtils";

const centeredSx: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export interface FullScreenOverlayNoColumnsProps {
  centered?: boolean;
  open?: boolean;
  onClose?: () => void;
  isDialogBlocked?: boolean;
  dialogRootRef?: React.RefObject<HTMLDivElement>;
  header?: React.ReactElement;
}

export interface FullScreenOverlayWithColumnsProps extends FullScreenOverlayNoColumnsProps {
  leftColumn?: React.ReactElement;
  rightColumn?: React.ReactElement;
  children: never;
}

export type FullScreenOverlayProps = FullScreenOverlayNoColumnsProps | FullScreenOverlayWithColumnsProps;

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
  centered,
  open = true,
  onClose,
  isDialogBlocked,
  dialogRootRef,
  header,
  children,
  ...columns
}) => {
  const paperRef = useRef<HTMLDivElement>(null);

  const [shakeSx, shake] = useShakeAnimation(paperRef.current);

  return (
    <Dialog
      open={ isDialogBlocked ? true : open }
      onClose={ isDialogBlocked ? shake : onClose }
      // onBackdropClick={ isDialogBlocked ? shake : undefined }
      aria-labelledby="checkout-modal-header-title"
      scroll="body"
      ref={ dialogRootRef }
      PaperProps={ { sx: shakeSx, ref: paperRef }}
      // Dialog only:
      // fullWidth
      // maxWidth="sm"
      fullScreen>

    <DialogContent
      sx={{
        overflowX: 'hidden',
        px: {
          xs: 1.5,
          sm: 2.5,
        },
        py: 2.5,
        maxWidth: theme => theme.breakpoints.values.lg,
        mx: "auto",
      }}>

      { header }

      { children ? (
        <Box sx={ centered ? centeredSx : undefined }>
          { children }
        </Box>
      ) : (
        ("leftColumn" in columns || "rightColumn" in columns) && {
          /* Implement 2-column layout using leftColumn and rightColumn */
        }
      ) }

    </DialogContent>
  </Dialog>
  );
}
