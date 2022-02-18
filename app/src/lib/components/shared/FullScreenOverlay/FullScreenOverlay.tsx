import { Dialog, DialogContent } from "@mui/material";
import React, { useRef } from "react";
import { useShakeAnimation } from "../../../utils/animationUtils";

export interface FullScreenOverlayProps {
  open?: boolean;
  onClose?: () => void;
  isDialogBlocked?: boolean;
  dialogRootRef?: React.RefObject<HTMLDivElement>;
}

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
  open = true,
  onClose,
  isDialogBlocked,
  dialogRootRef,
  children,
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

      { children }

    </DialogContent>
  </Dialog>
  );
}
