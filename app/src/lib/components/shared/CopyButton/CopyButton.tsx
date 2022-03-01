import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'
import { SxProps, Theme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { useTimeout } from '@swyg/corre'
import { FunctionComponent, useCallback, useState } from 'react'
import { wait } from '../../../utils/promiseUtils'

type CopyButtonSize = "small" | "medium";

interface CopyButtonProps {
  label: string;
  value: string;
  size?: CopyButtonSize;
}

interface CopyButtonState {
  title: string;
  open: boolean;
}

const ICON_BUTTON_SX: Record<string, SxProps<Theme>> = {
  small: { p: 1, ml: 0.5, mr: -0.5},
  medium: { p: 1, ml: 0.5 },
};

const ICON_SX: Record<string, SxProps<Theme>> = {
  small: { fontSize: 16 },
  medium: { fontSize: 16 },
};

export const CopyButton: FunctionComponent<CopyButtonProps> = ({
  label,
  value,
  size = "medium",
}) => {
  const tooltipLabel = `Copy ${ label }`;
  const confirmationLabel = `${ label } Copied!`;

  const [{
    title,
    open,
  }, setState] = useState<CopyButtonState>({
    title: tooltipLabel,
    open: false,
  });

  const onTooltipClick = useCallback(() => {
    navigator.clipboard.writeText(value);

    setState({
      title: confirmationLabel,
      open: true,
    });
  }, [value, confirmationLabel]);

  const handleOpen = useCallback(() => {
    setState(({ title, open }) => ({ title, open: title === tooltipLabel ? true : open }));
  }, [tooltipLabel]);

  const handleClose = useCallback(() => {
    setState(({ title, open }) => ({ title, open: title === tooltipLabel ? false : open }));
  }, [tooltipLabel]);

  useTimeout(async () => {
    if (title !== confirmationLabel) return;

    console.log("RESET");

    setState({ title: confirmationLabel, open: false });

    await wait(250);

    setState(({ open }) => ({ title: tooltipLabel, open: open || false }));
  }, 3000, [title, open, tooltipLabel, confirmationLabel]);

  const buttonElement = (
    <IconButton sx={ ICON_BUTTON_SX[size] }>
      <ContentCopyIcon sx={ ICON_SX[size] } />
    </IconButton>
  );

  return (
    <Tooltip
      title={ title }
      open={ open }
      onOpen={ handleOpen }
      onClose={ handleClose }
      onClick={ onTooltipClick } >
      { buttonElement }
    </Tooltip>
  );
}
