import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  const [iconUrl, setIconUrl] = useState<string>("");

  /** Change iconUrl with debounce */
  useEffect(() => {
    const timeout = setTimeout(() => {
      iconName &&
        setIconUrl(
          import.meta.env.VITE_LAMBDA_URL +
            `?package=${iconPackage}&icon=${iconName}&color=${color}&background=${backgroundColor.replace(
              "#",
              ""
            )}&zoom=${(zoom / 100).toFixed(2)}&size=${size}`
        );
    }, 500);
    return () => clearTimeout(timeout);
  }, [backgroundColor, color, iconName, iconPackage, size, zoom]);

  return (
    <Box
      sx={{
        justifyItems: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Stack gap={1} sx={{ p: 1, minWidth: 200, maxWidth: 600 }}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Box
            display={"inline-flex"}
            width={size}
            height={size}
            style={{ backgroundColor: backgroundColor }}
          >
            {iconUrl && <img src={iconUrl} width={size} height={size} />}
          </Box>
          <Box>
            <Button href={iconUrl} target="_download_icon" variant="contained">
              Download
            </Button>
          </Box>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Stack gap={1}>
            <TextField
              type="number"
              label="Size (px)"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
            <TextField
              type="color"
              label="Background (hex code)"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
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
            <Box>
              <Typography variant="caption">Zoom</Typography>
              <Slider
                aria-label="zoom"
                value={zoom}
                onChange={(_e, v) => setZoom(v as number)}
                min={50}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}%`}
              />
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
        <Typography variant="body1">
          &copy; Calvin C. Chan (
          <a href="https://calvincchan.com">calvincchan.com</a>) (
          <a href="https://github.com/calvincchan/icon-button-generator-frontend">
            Github
          </a>
          )
        </Typography>
      </Stack>
    </Box>
  );
}

export default App;
