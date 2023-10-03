import { IconButton, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { manifest } from "./assets/manifest";

interface Props {
  packageName: string;
  onChange: (iconName: string) => void;
}

export const IconPicker: FC<Props> = ({ packageName, onChange }) => {
  const icons = useMemo(() => {
    return manifest.find((iconPackage) => iconPackage.package === packageName)
      ?.icons;
  }, [packageName]);

  return (
    <>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        sx={{ maxHeight: 300, overflowY: "scroll" }}
      >
        {icons?.map((icon) => (
          <IconButton
            key={icon}
            aria-label={icon}
            onClick={() => {
              onChange(icon);
            }}
          >
            <img
              src={`${
                import.meta.env.BASE_URL
              }/assets/${packageName}.svg#${icon}`}
              alt={icon}
              className="picker-icon"
            />
          </IconButton>
        ))}
      </Stack>
    </>
  );
};
