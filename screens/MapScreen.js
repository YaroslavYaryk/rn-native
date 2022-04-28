import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam("initialLocation");
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const readonly = props.navigation.getParam("readonly");

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 51.423876,
        longitude: initialLocation ? initialLocation.lng : 26.138532,
        latitudeDelta: 0.00822,
        longitudeDelta: 0.04221,
    };

    const selectLocationHandler = (event) => {
        if (readonly) {
            alert("Its not changeble!!!");
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    };

    let markerCoornates;
    if (selectedLocation) {
        markerCoornates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
        };
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            alert("please pick up an location");
            return;
        }
        props.navigation.navigate("NewPlace", {
            pickedLoacation: selectedLocation,
        });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler });
    }, [savePickedLocationHandler]);

    return (
        <View style={styles.container}>
            <MapView
                region={mapRegion}
                onPress={selectLocationHandler}
                style={styles.map}
            >
                {markerCoornates && (
                    <Marker
                        title="Picked Location"
                        coordinate={markerCoornates}
                    ></Marker>
                )}
            </MapView>
        </View>
    );
};

MapScreen.navigationOptions = (navData) => {
    const saveFn = navData.navigation.getParam("saveLocation");
    const readonly = navData.navigation.getParam("readonly");
    if (readonly) {
        return {};
    }
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Place"
                    iconName={
                        Platform.OS === "android"
                            ? "cloud-done-outline"
                            : "cloud-done-outline"
                    }
                    onPress={saveFn}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default MapScreen;
