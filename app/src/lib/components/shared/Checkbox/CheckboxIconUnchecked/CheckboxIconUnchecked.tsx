import { SvgIcon, useTheme } from "@mui/material";

export interface CheckboxIconUncheckedProps {
  error?: boolean;
}

export const CheckboxIconUnchecked: React.FC<CheckboxIconUncheckedProps> = ({
  error,
}) => {
  const { palette } = useTheme();

  return (
    <SvgIcon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke={ error ? palette.warning.dark : palette.grey[200] } />
      </svg>
    </SvgIcon>
  );
};
