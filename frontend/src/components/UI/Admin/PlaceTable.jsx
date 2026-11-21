import { Box, Button, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getCities, getGeoCategories, getPlaceMapForAdmin, getPlacesByCityAndCategory, LoadPlacesFromOpenStreetMap } from "../../../API/ApiClient";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { styled, alpha } from '@mui/material/styles';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay';
import Collapse from '@mui/material/Collapse';
import { animated, useSpring } from '@react-spring/web';


import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import FlatwareRoundedIcon from '@mui/icons-material/FlatwareRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import MuseumRoundedIcon from '@mui/icons-material/MuseumRounded';
import GolfCourseRoundedIcon from '@mui/icons-material/GolfCourseRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import BeachAccessRoundedIcon from '@mui/icons-material/BeachAccessRounded';
import OutdoorGrillRoundedIcon from '@mui/icons-material/OutdoorGrillRounded';
import TourRoundedIcon from '@mui/icons-material/TourRounded';
import DownhillSkiingRoundedIcon from '@mui/icons-material/DownhillSkiingRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import SkateboardingRoundedIcon from '@mui/icons-material/SkateboardingRounded';
import IceSkatingRoundedIcon from '@mui/icons-material/IceSkatingRounded';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';


import * as React from "react";
import { TreeItemLabel, TreeItemProvider, useTreeItem, useTreeItemModel } from "@mui/x-tree-view";
import {
    TreeItemCheckbox,
    TreeItemIconContainer
} from '@mui/x-tree-view/TreeItem';
import TypeTable from "./TypeTable";
import Map from "../../Map";

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

export const getIconFromIconTXT = (iconTXT) => {
    switch (iconTXT) {
        case 'City':
            return LocationCityRoundedIcon;
        case 'Specialty Shops':
            return LocalGroceryStoreRoundedIcon;
        case 'Art & Design':
            return ColorLensRoundedIcon;
        case 'Books & Literature':
            return AutoStoriesRoundedIcon;
        case 'Markets':
            return StoreRoundedIcon;
        case 'Shopping Centres':
            return LocalMallRoundedIcon;
        case 'Bars & Pubs':
            return LocalBarRoundedIcon;
        case 'Cafés':
            return LocalCafeRoundedIcon;
        case 'Restaurants & Food Courts':
            return RestaurantRoundedIcon;
        case 'Ice Cream':
            return IcecreamRoundedIcon;
        case 'Gaming & Entertainment':
            return VideogameAssetRoundedIcon;
        case 'Aquatic Attractions':
            return WaterRoundedIcon;
        case 'Entertainment & Attractions':
            return AttractionsRoundedIcon;
        case 'Performing Arts & Cinema':
            return TheatersRoundedIcon;
        case 'Art Galleries':
            return ColorLensRoundedIcon;
        case 'Museums & Heritage':
            return MuseumRoundedIcon;
        case 'Golf':
            return GolfCourseRoundedIcon;
        case 'Parks & Wildlife':
            return ParkRoundedIcon;
        case 'Wellness & Fitness':
            return SpaRoundedIcon;
        case 'Coastal Attractions':
            return BeachAccessRoundedIcon;
        case 'Outdoor Recreation':
            return OutdoorGrillRoundedIcon;
        case 'Tours & Outdoor Activities':
            return TourRoundedIcon;
        case 'Skiing':
            return DownhillSkiingRoundedIcon;
        case 'Fishing':
            return PhishingRoundedIcon;
        case 'Skateboarding':
            return SkateboardingRoundedIcon;
        case 'Ice Skating':
            return IceSkatingRoundedIcon;
        case 'Sports Facilities':
            return StadiumRoundedIcon;
        case 'Swimming & Water Parks':
            return PoolRoundedIcon;
        case 'Shopping':
            return ShoppingBagRoundedIcon;
        case 'Speciality Shops':
            return CategoryRoundedIcon;
        case 'Art & Design':
            return ColorLensRoundedIcon;
        case 'Shopping':
            return ShoppingBagRoundedIcon;
        case 'Food & Drinks':
            return RestaurantRoundedIcon;
        case 'Entertainment':
            return AttractionsRoundedIcon;
        case 'Culture & History':
            return MuseumRoundedIcon;
        case 'Nature':
            return ParkRoundedIcon;
        case 'Sports & Activities':
            return SportsSoccerRoundedIcon;
        case 'Wellness':
            return SpaRoundedIcon;
        default:
            return PlaceRoundedIcon;
    }
}

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

const MainCategoryIcons = {
    Shopping: ShoppingBagRoundedIcon,
    'Food & Drinks': RestaurantRoundedIcon,
    Entertainment: AttractionsRoundedIcon,
    'Culture & History': MuseumRoundedIcon,
    Nature: ParkRoundedIcon,
    'Sports & Activities': SportsSoccerRoundedIcon,
    Wellness: SpaRoundedIcon
};

export default function PlaceTable() {


    const [PlaceTypes, setPlaceTypes] = React.useState([]);
    const [Cities, setCities] = React.useState([])
    const [places, setPlaces] = React.useState([]);
    const [currentMarkers, setMarkers] = React.useState([]);


    React.useEffect(() => {
        const LoadData = async () => {
            try {
                const LoadCities = await getCities();
                const LoadPlaceTypes = await getGeoCategories();

                // Prepare and group place types by icon
                const MainCategories = {
                    Shopping: [
                        'Specialty Shops',
                        'Art & Design',
                        'Books & Literature',
                        'Markets',
                        'Shopping Centres'
                    ],
                    'Food & Drinks': [
                        'Bars & Pubs',
                        'Cafés',
                        'Restaurants & Food Courts',
                        'Ice Cream'
                    ],
                    Entertainment: [
                        'Gaming & Entertainment',
                        'Performing Arts & Cinema',
                        'Entertainment & Attractions'
                    ],
                    'Culture & History': [
                        'Art Galleries',
                        'Museums & Heritage'
                    ],
                    Nature: [
                        'Parks & Wildlife',
                        'Coastal Attractions',
                        'Aquatic Attractions'
                    ],
                    'Sports & Activities': [
                        'Golf',
                        'Outdoor Recreation',
                        'Tours & Outdoor Activities',
                        'Skiing',
                        'Fishing',
                        'Skateboarding',
                        'Ice Skating',
                        'Sports Facilities',
                        'Swimming & Water Parks'
                    ],
                    Wellness: [
                        'Wellness & Fitness'
                    ]
                };

                const GroupedPlaceTypes = Object.entries(MainCategories).map(
                    ([mainCategory, subcategories]) => {

                        console.log(mainCategory);
                        console.log('Main category icon:', getIconFromIconTXT(mainCategory));

                        return {
                            id: `main-${mainCategory}`,
                            icon: mainCategory,
                            label: mainCategory,
                            children: subcategories
                                .map(subcategory => ({
                                    id: `group-${subcategory}`,
                                    label: subcategory,
                                    icon: subcategory,
                                    children: LoadPlaceTypes
                                        .filter(type => type.icon === subcategory)
                                        .map(type => ({
                                            ...type,
                                            originalId: type.id,
                                            id: `${type.id}`,
                                            label: type.name
                                        }))
                                }))
                                .filter(group => group.children.length > 0)
                        };
                    }
                ).filter(category => category.children.length > 0);

                // Create city tree items
                const Cities = LoadCities.map(city => ({
                    ...city,
                    originalId: city.id,
                    icon: "City",
                    id: `City-${city.id}`,
                    label: city.name,
                    children: GroupedPlaceTypes.map(category => ({
                        ...category,
                        id: `city-${city.id}-${category.id}`,
                        children: category.children.map(group => ({
                            ...group,
                            id: `city-${city.id}-${group.id}`,
                            children: group.children.map(type => ({
                                ...type,
                                id: `F${city.id},${type.id}`
                            }))
                        }))
                    }))
                }));

                setPlaceTypes(LoadPlaceTypes);
                setCities(Cities);

            } catch (error) {
                console.error("Error loading tree data:", error);
            }
        };

        LoadData();
    }, [places]);

    const [lastSelectedItem, setLastSelectedItem] = React.useState(null);
    const [lastSelectedCity, setLastSelectedCity] = React.useState(null);
    const [lastCenter, setLastCenter] = React.useState([0.0000, 0.0000]);
    const [selectedPlace, setSelectedPlace] = React.useState(null);

    const [mapURL, setMapURL] = React.useState("");

    const handleItemSelectionToggle = async (event, itemId = "", isSelected) => {
        if (isSelected && itemId.startsWith("F")) {
            const ids = itemId.substring(1).split(',')
            setLastSelectedItem(ids);

            try {
                const test = await getPlacesByCityAndCategory(ids[0], ids[1])
                setPlaces(test);
                ManageMarkers(test)
            } catch (error) {
                console.error(error);
            }
        }
        else if (isSelected && itemId.startsWith("C")) {
            const id = itemId.substring(itemId.lastIndexOf("-") + 1);
            const city = Cities.find(c => c.originalId == id);

            const coordinates = [Number(city.latitude), Number(city.longitude)]
            setLastCenter(coordinates)
        }
    };

    const loadFromOSM = async (event, itemId = "", isSelected) => {
        const cityId = lastSelectedItem[0];
        const cat = PlaceTypes[lastSelectedItem[1] - 1].geoapify_category;

        const storageKey = `osmOffset_${cityId}_${cat}`;
        const offset = Number(localStorage.getItem(storageKey)) || 0;

        try {
            const result = await LoadPlacesFromOpenStreetMap(cityId, cat, offset);

            localStorage.setItem(storageKey, result.nextOffset);
            console.log(result.places[0].places)

            // Automatically update frontend list
            const placeList = result.places[0].places;
            const filteredPlaces = placeList.filter(
                place => place.category_id === Number(lastSelectedItem[1])
            );
            setPlaces(filteredPlaces);
            ManageMarkers(filteredPlaces)

            console.log("Loaded places:", result.places);

        } catch (err) {
            console.error(err);
        }
    };

    async function SetSelectedPlace(place) {
        setSelectedPlace(place)
        setMapURL(await getPlaceMapForAdmin(place))
    }

    const ManageMarkers = (PlaceList) => {
        const markers = [];
        for (var item of PlaceList) {
            console.log(item)
            const marker = {
                id: item.id,
                name: item.name,
                lon: item.longitude,
                lat: item.latitude
            }
            markers.push(marker);
        }
        setMarkers(markers)
    }

    return (
        <Box sx={{ flex: 1, minHeight: 0, height: '95%', m: 1, display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Paper elevation={3} sx={{ display: "flex", flex: 0.5, p: 1, minHeight: 0 }}>
                <RichTreeView
                    items={Cities}
                    getItemId={(item) => item.id}
                    slots={{ item: CustomTreeItem }}
                    sx={{ minHeight: 0, flex: 1, overflowY: 'auto' }}
                    onItemSelectionToggle={handleItemSelectionToggle}
                ></RichTreeView>
            </Paper>
            <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", flex: 1, p: 1, minHeight: 0 }}>
                <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                    <TableContainer component={Paper} sx={{ flex: 1 }}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Suburb</TableCell>
                                    <TableCell>Address</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {places.map((place) => (
                                    <TableRow key={place.id} hover onClick={() => SetSelectedPlace(place)} sx={{ cursor: "pointer" }} selected={selectedPlace?.id === place.id}>
                                        <TableCell>{place.id}</TableCell>
                                        <TableCell>{place.name}</TableCell>
                                        <TableCell>{place.brand}</TableCell>
                                        <TableCell>{place.suburb}</TableCell>
                                        <TableCell>{place.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Button sx={{ display: lastSelectedItem === null ? 'none' : 'inline-flex', m: 1 }} variant="contained" onClick={loadFromOSM}>Load</Button>
            </Paper>
            <Paper sx={{ flex: 0.5, p: 1, display: "flex" }}>
                <Box sx={{ ml: 0.5, display: "flex", flexDirection: "column", flex: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="overline" sx={{ display: selectedPlace?.brand === null ? 'none' : 'inline-flex' }}>{selectedPlace?.brand}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedPlace?.name}</Typography>
                    </Box>
                    <Box sx={{ flex: 0.7 }}>
                        <Map sx={{ flex: 1 }} centerOfMap={lastCenter} markers={currentMarkers}></Map>
                    </Box>
                </Box>
            </Paper>
        </Box>


    )
}