import * as FileSystem from "expo-file-system";
import { addPlace, fetchPlaces, insertPlace } from "../helpers/db";
export const ADD_PLACE = "ADD_PLACE";
export const READ_PLACE = "READ_PLACE";

export const addNewPlace = (title, pickedImage, location) => {
    return async (dispatch) => {
        const fileName = pickedImage.split("/").pop();

        const newPath = FileSystem.documentDirectory + fileName;

        const address = "Osvitianska street, Volodymyrets, Rivne obl, Ukraine";

        try {
            await FileSystem.moveAsync({
                from: pickedImage,
                to: newPath,
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            );

            dispatch({
                type: ADD_PLACE,
                placeDate: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng,
                    },
                },
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const featchPlaces = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchPlaces();

            dispatch({
                type: READ_PLACE,
                places: dbResult.rows._array,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
