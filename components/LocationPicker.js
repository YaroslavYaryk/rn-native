import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
    const selectedLocation = props.navigation.getParam("pickedLoacation");

    const { onLocationPicked } = props;

    useEffect(() => {
        if (selectedLocation) {
            setPickedLocation(selectedLocation);
            onLocationPicked(selectedLocation);
        }
    }, [selectedLocation, onLocationPicked]);

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Insufficient permissions!",
                "You need to grant location permissions to use this app.",
                [{ text: "Okay" }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch (err) {
            Alert.alert(
                "Could not fetch location!",
                "Please try again later or pick a location on the map.",
                [{ text: "Okay" }]
            );
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map");
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onPress={pickOnMapHandler}
            >
                {isFetching ? (
                    <ActivityIndicator
                        size="large"
                        color={Colors.primaryColor}
                    />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </MapPreview>
            <View style={styles.locationButtons}>
                <Button
                    title="Get User Location"
                    color={Colors.primaryColor}
                    onPress={getLocationHandler}
                />
                <Button
                    title="Pick in a map"
                    color={Colors.primaryColor}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    locationButtons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default LocationPicker;
