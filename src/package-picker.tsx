import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";
import { manifest } from "./assets/manifest.js";

interface Props {
  initValue: string;
  onChange: (iconPackage: string) => void;
}
export const PackagePicker: FC<Props> = ({ initValue, onChange }) => {
  const [iconPackage, setIconPackage] = useState<string>(initValue);
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setIconPackage(value);
    onChange(value);
  };

  return (
    <FormControl>
      <InputLabel id="select-icon-package">Icon Package</InputLabel>
      <Select
        labelId="select-icon-package"
        id="select-icon-package"
        value={iconPackage}
        label="Icon Package"
        onChange={handleChange}
      >
        {manifest.map((iconPackage) => (
          <MenuItem key={iconPackage.package} value={iconPackage.package}>
            {iconPackage.package}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
