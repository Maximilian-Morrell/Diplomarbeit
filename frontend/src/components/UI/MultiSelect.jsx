import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

export default function MultiSelect({
    label,
    options,
    value,
    onChange,
    width = 300,
}) {
    const theme = useTheme();

    return (
        <FormControl sx={{ width }}>
            <InputLabel>{label}</InputLabel>

            <Select
                multiple
                value={value}
                onChange={onChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        style={{
                            fontWeight: value.includes(option)
                                ? theme.typography.fontWeightMedium
                                : theme.typography.fontWeightRegular,
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}