import { Box, Button, ButtonGroup, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DeleteCountry, getCitiesByRegion, getCountries, getRegionsByCountry } from "../../../API/ApiClient";
import { RichTreeView, TreeItemCheckbox, TreeItemIconContainer, useTreeItem, useTreeItemModel } from "@mui/x-tree-view";
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay';
import { getRegions } from "../../../API/ApiClient";
import { styled, alpha } from '@mui/material/styles';
import * as React from "react";
import Collapse from '@mui/material/Collapse';
import { animated, useSpring } from '@react-spring/web';
import { TreeItemLabel, TreeItemProvider } from "@mui/x-tree-view";
import CountryEdit from "../../Admin/CountryEdit";



export function CustomLabel({ icon: Icon, expandable, children, ...other }) {
    return (
        <TreeItemLabel
            {...other}
            sx={{ display: "flex", alignItems: 'center' }}>
            {Icon && (
                <Box
                    component={Icon}
                    className="labelIcon"></Box>
            )}
            <TreeItemLabel>{children}</TreeItemLabel>
            {expandable}
        </TreeItemLabel>
    )
}

const CustomCollapse = styled(Collapse)({
    padding: 0,
});

const AnimatedCollapse = animated(CustomCollapse);

export function TransitionComponent(props) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
        },
    });

    return <AnimatedCollapse style={style} {...props} />;
}

export const TreeItemContent = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
    width: '100%',
    boxSizing: 'border-box', // prevent width + padding to overflow
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    flexDirection: 'row-reverse',
    borderRadius: theme.spacing(0.7),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    fontWeight: 500,
    '&[data-expanded]:not([data-focused], [data-selected]) .labelIcon': {
        color: theme.palette.primary.dark,
        ...theme.applyStyles('light', {
            color: theme.palette.primary.main,
        }),
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            left: '16px',
            top: '44px',
            height: 'calc(100% - 48px)',
            width: '1.5px',
            backgroundColor: theme.palette.grey[700],
            ...theme.applyStyles('light', {
                backgroundColor: theme.palette.grey[300],
            }),
        },
    },
    [`&[data-focused], &[data-selected]`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        ...theme.applyStyles('light', {
            backgroundColor: theme.palette.primary.main,
        }),
    },
    '&:not([data-focused], [data-selected]):hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: 'white',
        ...theme.applyStyles('light', {
            color: theme.palette.primary.main,
        }),
    },
}));

export const TreeItemRoot = styled('li')(({ theme }) => ({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    color: theme.palette.grey[400],
    ...theme.applyStyles('light', {
        color: theme.palette.grey[800],
    }),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    const { id, itemId, label, disabled, children, ...other } = props;

    const { getContextProviderProps, getRootProps, getContentProps, getIconContainerProps, getCheckboxProps, getLabelProps, getGroupTransitionProps, getDragAndDropOverlayProps, status } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

    const item = useTreeItemModel(itemId);

    let icon;
    if (item.icon) {
        icon = getIconFromIconTXT(item.icon)
    }

    return (
        <TreeItemProvider {...getContextProviderProps()}>
            <TreeItemRoot {...getRootProps(other)}>
                <TreeItemContent {...getContentProps()}>
                    <TreeItemIconContainer {...getIconContainerProps()}>
                        <TreeItemIcon status={status} />
                    </TreeItemIconContainer>
                    <TreeItemCheckbox {...getCheckboxProps()} />
                    <CustomLabel
                        {...getLabelProps({
                            icon,
                            expandable: status.expandable && status.expanded,
                        })}
                    />
                    <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
                </TreeItemContent>
                {children && <TransitionComponent {...getGroupTransitionProps()} />}
            </TreeItemRoot>
        </TreeItemProvider>
    )
})

export default function GeoTab(props) {

    const [mode, setMode] = React.useState("")
    const [bigList, setBigList] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [cities, setCities] = React.useState([])

    const [lastSelectedItem, setLastSelectedItem] = React.useState([])

    const handleItemSelectionToggle = async (event, itemId = "", isSelected) => {
        if (isSelected && itemId.startsWith("C")) {
            setMode("Country")
            var ids = itemId.substring(1).split(',')
            setLastSelectedItem(ids);
            console.log(ids)

            try {

            } catch (error) {
                console.error(error);
            }
        }
        else if (isSelected && itemId.startsWith("R")) {
            setMode("Region")
            const ids = itemId.substring(1).split(',')
            setLastSelectedItem(ids);

            try {

            } catch (error) {
                console.error(error);
            }
        } else if (isSelected && itemId.startsWith("c")) {
            setMode("City")
            const ids = itemId.substring(1).split(',')
            setLastSelectedItem(ids);

            try {

            } catch (error) {
                console.error(error);
            }
        };
    }

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const countriesData = await getCountries();

                await Promise.all(countriesData.map(async (country) => {
                    const regions = await getRegionsByCountry(country.id);

                    await Promise.all(regions.map(async (region) => {
                        const cities = await getCitiesByRegion(region.id);
                        cities.map((city) => {
                            city.label = city.name;
                            city.oldID = city.id;
                            city.id = "c-" + city.id;
                        })
                        region.label = region.name;
                        region.oldID = region.id;
                        region.id = "R-" + region.id;
                        region.children = cities;
                    }));

                    country.oldID = country.id;
                    country.id = "C-" + country.id;
                    country.label = country.name;
                    country.children = regions;
                }));

                console.log("test")
                console.log(countriesData);
                setBigList(countriesData);
                const countr = await getCountries();
                const regio = await getRegions();
                const citie = await getCities();

                setCountries(countr);
                setRegions(regio);
                setCities(citie);

            } catch (err) {
                console.error(err);
            }
        };

        loadData();
    }, []);

    return (
        <Box sx={{ flex: 1, minHeight: 0, height: '95%', m: 1, display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Paper elevation={3} sx={{ display: "flex", flex: 0.5, p: 1, minHeight: 0 }}>
                <RichTreeView
                    items={bigList}
                    getItemId={(item) => item.id}
                    slots={{ item: CustomTreeItem }}
                    sx={{ minHeight: 0, flex: 1, overflowY: 'auto' }}
                    onItemSelectionToggle={handleItemSelectionToggle}
                ></RichTreeView>
            </Paper>
            <Paper elevation={3} sx={{ display: "flex", flex: 1, p: 1, minHeight: 0, flexDirection: "column" }}>
                <Box sx={{ flex: 1 }}>
                    {mode === "Country" ? (
                        <CountryEdit />
                    ) : mode === "Region" ? (
                        <Typography>Region</Typography>
                    ) : mode === "City" ? (
                        <Typography>City</Typography>
                    ) : (
                        <Typography>Create</Typography>
                    )}
                </Box>
                <Divider orientation="horizontal"></Divider>
                <ButtonGroup fullWidth variant="contained">
                    <Button>Add new Country</Button>
                    <Button>Add new Region</Button>
                    <Button>Add new City</Button>
                </ButtonGroup>
            </Paper>
        </Box>
    )
}