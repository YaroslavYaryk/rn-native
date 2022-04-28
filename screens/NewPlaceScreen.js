import React, { useState, useCallback } from "react";
import {
    ScrollView,
    View,
    Button,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import * as productAction from "../store/places-actions";
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState("");
    const [pickedImage, setPickedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        // you could add validation
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        dispatch(
            productAction.addNewPlace(titleValue, pickedImage, selectedLocation)
        );
        props.navigation.goBack();
    };

    const onImageTakeHandler = (imageUri) => {
        setPickedImage(imageUri);
    };

    const onLocationPickedHandler = useCallback(
        (location) => {
            setSelectedLocation(location);
        },
        [setSelectedLocation]
    );

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker
                    onImageTaken={onImageTakeHandler}
                    imageUri={pickedImage}
                />
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={onLocationPickedHandler}
                />
                <Button
                    title="Save Place"
                    color={Colors.primaryColor}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add Place",
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});

export default NewPlaceScreen;
