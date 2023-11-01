import { Box, IconButton, Stack, Typography } from "@mui/material";
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
      <Stack direction="row" flexWrap="wrap">
        {icons?.map((icon) => (
          <Box
            sx={{
              width: 140,
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack sx={{ alignItems: "center" }}>
              <Box>
                <IconButton
                  key={icon}
                  aria-label={icon}
                  onClick={() => {
                    onChange(icon);
                  }}
                >
                  <img
                    src={`/assets/${packageName}.svg#${icon}`}
                    alt={icon}
                    className="picker-icon"
                  />
                </IconButton>
              </Box>
              <Typography variant="caption">{icon}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
};
