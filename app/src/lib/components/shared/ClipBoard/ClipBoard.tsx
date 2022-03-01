import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { FunctionComponent, useState } from 'react'

interface ClipboardProps {
    tooltip: string
    resultTooltip: string
    value: string
}

const Clipboard: FunctionComponent<ClipboardProps> = ({
    tooltip,
    value,
    resultTooltip,
}) => {
    const [title, setTitle] = useState<string>(tooltip)
    const onTooltipClick = () => {
        navigator.clipboard.writeText(value)
        setTitle(resultTooltip)
    }
    return (
        <Tooltip
            title={title}
            onClick={onTooltipClick}
            onClose={() => setTitle(tooltip)}
        >
            <IconButton>
                <ContentCopyIcon />
            </IconButton>
        </Tooltip>
    )
}

export default Clipboard
