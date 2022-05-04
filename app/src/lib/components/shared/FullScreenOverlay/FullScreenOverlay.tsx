import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { useShakeAnimation } from "../../../utils/animationUtils";
import { NoTransition } from "../NoTransition/NoTransition";

const centeredSx: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export interface FullScreenOverlayFunctionalProps {
  open?: boolean;
  onClose?: () => void;
  isDialogBlocked?: boolean;
}

interface FullScreenOverlayCommonProps extends FullScreenOverlayFunctionalProps {
  contentKey?: string;
  header?: React.ReactElement | null;
}

export interface FullScreenOverlayNoColumnsProps extends FullScreenOverlayCommonProps {
  centered?: boolean;
  children: React.ReactNode;
}

export interface FullScreenOverlayWithColumnsProps extends FullScreenOverlayCommonProps {
  leftColumn?: React.ReactElement;
  rightColumn?: React.ReactElement;
  children: never;
}

export type FullScreenOverlayProps = FullScreenOverlayNoColumnsProps | FullScreenOverlayWithColumnsProps;

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
  open = true,
  onClose,
  isDialogBlocked,
  contentKey,
  header,
  children,
  ...variantProps
}) => {
  const dialogRootRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // Scroll to top on step change:
  useEffect(() => {
    const dialogScrollable = dialogRootRef.current?.querySelector(SELECTOR_DIALOG_SCROLLABLE);

    if (contentKey && dialogScrollable) dialogScrollable.scrollTop = 0;
  }, [contentKey]);

  const [shakeSx, shake] = useShakeAnimation(paperRef.current);

  const dialogContentSx: SxProps<Theme> = {
    overflowX: 'hidden',
    px: {
      xs: 1.5,
      sm: 2.5,
    },
    py: 2.5,
    maxWidth: theme => theme.breakpoints.values.lg,
    mx: "auto",
  };

  return (
    <Dialog
      open={ isDialogBlocked ? true : open }
      onClose={ isDialogBlocked ? shake : onClose }
      // onBackdropClick={ isDialogBlocked ? shake : undefined }
      aria-labelledby="checkout-modal-header-title"
      scroll="body"
      ref={ dialogRootRef }
      PaperProps={{ sx: shakeSx, ref: paperRef }}
      TransitionComponent={ NoTransition }
      // Dialog only:
      // fullWidth
      // maxWidth="sm"
      fullScreen>

      <DialogContent sx={ dialogContentSx }>
        <>
          { header }

          { children ? (
            <Box sx={ "centered" in variantProps && variantProps.centered ? centeredSx : undefined }>
              { children }
            </Box>
          ) : (
            ("leftColumn" in variantProps || "rightColumn" in variantProps) && {
              /* Implement 2-column layout using leftColumn and rightColumn */
            }
          ) }

        </>
      </DialogContent>
    </Dialog>
  );
}
