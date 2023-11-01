import { Close, Download, GitHub, Language } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import "./App.css";
import { manifest } from "./assets/manifest.js";
import { IconPicker } from "./icon-picker.js";
import { PackagePicker } from "./package-picker.js";

const defaultTheme = createTheme();

const meta = {
  title: "Icon Image Generator · iconimg.com",
  description:
    "Simply generate a URL of PNG image with open source icons for placeholder or testing purpose.",
  image: "https://iconimg.com/assets/iconimg.png",
};

function App() {
  const [iconPackage, setIconPackage] = useState<string>(manifest[0].package);
  const [iconName, setIconName] = useState<string>("");
  const [color, setColor] = useState<string>("FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState<string>(blue[500]);
  const [zoom, setZoom] = useState<number>(80);
  const [size, setSize] = useState<number>(100);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {meta.title}
          </Typography>
          <Typography variant="body1" color="inherit" noWrap>
            <IconButton
              color="inherit"
              href="https://calvincchan.com"
              target="_blank"
              title="Calvin C Chan Website"
            >
              <Language />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/calvincchan/icon-button-generator-frontend"
              target="_blank"
              title="GitHub"
            >
              <GitHub />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Stack padding={1}>
          <Toolbar />
          <List component="nav" sx={{ width: 240 }}>
            <ListItem>
              <PackagePicker
                initValue={iconPackage}
                onChange={(value) => {
                  setIconPackage(value);
                  setIconName("");
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                type="number"
                label="Size (px)"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                type="color"
                label="Background (hex code)"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
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
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
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
              </FormControl>
            </ListItem>
          </List>
          <Divider />
          <Typography variant="body2" mt={2}>
            {meta.description}
          </Typography>
          <Typography variant="body2" mt={2}>
            &copy; Calvin C. Chan
          </Typography>
          <Typography variant="body2" mt={2}>
            <a href="https://calvincchan.com" target="_blank">
              Web
            </a>
            {" · "}
            <a
              href="https://github.com/calvincchan/icon-button-generator-frontend"
              target="_blank"
            >
              GitHub
            </a>
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Stack gap={1} sx={{ p: 1 }}>
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Box></Box>
            </Box>
            <Stack gap={1}>
              <IconPicker
                packageName={iconPackage}
                onChange={(v) => {
                  setIconName(v);
                  setDrawerVisible(true);
                }}
              />
            </Stack>
          </Stack>
        </Box>
        <Drawer variant="persistent" anchor="right" open={drawerVisible}>
          <Toolbar>
            <IconButton onClick={() => setDrawerVisible(false)}>
              <Close />
            </IconButton>
          </Toolbar>
          <Stack sx={{ width: 300, p: 2 }}>
            {iconUrl && (
              <>
                <Box textAlign="center">
                  <Box
                    display={"inline-flex"}
                    width={size}
                    height={size}
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <img src={iconUrl} width={size} height={size} />
                  </Box>
                </Box>
                <Box my={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Icon URL"
                    value={iconUrl}
                  />
                </Box>
                <Button
                  href={iconUrl}
                  target="_download_icon"
                  variant="contained"
                  startIcon={<Download />}
                >
                  Download
                </Button>
              </>
            )}
          </Stack>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
