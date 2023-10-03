import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import "./App.css";
import { manifest } from "./assets/manifest.js";
import { IconPicker } from "./icon-picker.js";
import { PackagePicker } from "./package-picker.js";

function App() {
  const [iconPackage, setIconPackage] = useState<string>(manifest[0].package);
  const [iconName, setIconName] = useState<string>(manifest[0].icons[0]);
  const [color, setColor] = useState<string>("000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FF6600");
  const [zoom, setZoom] = useState<number>(80);
  const [size, setSize] = useState<number>(100);

  /** Change iconUrl with debounce */
  const iconUrl = useMemo(
    () =>
      import.meta.env.VITE_LAMBDA_URL +
      `?package=${iconPackage}&icon=${iconName}&color=${color}&background=${backgroundColor.replace(
        "#",
        ""
      )}&zoom=${(zoom / 100).toFixed(2)}`,
    [backgroundColor, color, iconName, iconPackage, zoom]
  );

  return (
    <>
      <Stack gap={1} sx={{ p: 1, maxWidth: 600 }}>
        <Box sx={{ p: 2, justifyItems: "center" }}>
          <Box>
            {iconName ? (
              <img
                src={iconUrl}
                className="preview-icon"
                width={size}
                height={size}
              />
            ) : (
              <Skeleton variant="rectangular" width={size} height={size} />
            )}
          </Box>
          {iconUrl}
          <Box>
            <Button href={iconUrl} target="_download_icon" variant="contained">
              Download
            </Button>
          </Box>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Stack gap={1}>
            <TextField
              type="color"
              id="outlined-basic"
              label="Background Color (Hex Code)"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <Box>
              <Typography variant="caption">Zoom</Typography>
              <Slider
                aria-label="zoom"
                value={zoom}
                onChange={(e, v) => setZoom(v as number)}
                min={50}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}%`}
              />
            </Box>
            <Box>
              <FormControl>
                <Typography variant="caption">Color</Typography>
                <RadioGroup
                  row
                  aria-label="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <FormControlLabel
                    value="000000"
                    label="Black"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="FFFFFF"
                    label="White"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <PackagePicker
              initValue={iconPackage}
              onChange={(value) => {
                setIconPackage(value);
                setIconName("");
              }}
            />
            <IconPicker packageName={iconPackage} onChange={setIconName} />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default App;
