import React from "react";

import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const MapPreview = (props) => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://openmaptiles.org/img/home-banner-map.png`;
    }

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{ ...styles.mapPreview, ...props.style }}
        >
            {props.location ? (
                <Image
                    style={styles.mapImage}
                    source={{ uri: imagePreviewUrl }}
                />
            ) : (
                props.children
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: "100%",
        height: "100%",
    },
});

export default MapPreview;
