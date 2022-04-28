import { ADD_PLACE, READ_PLACE } from "./places-actions";
import Place from "../models/Place";

const initialState = {
    places: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeDate.id,
                action.placeDate.title,
                action.placeDate.image,
                action.placeDate.address,
                action.placeDate.coords.lat,
                action.placeDate.coords.lng
            );
            return {
                places: state.places.concat(newPlace),
            };
        case READ_PLACE:
            return {
                places: action.places.map(
                    (pl) =>
                        new Place(
                            pl.id.toString(),
                            pl.title,
                            pl.imageUri,
                            pl.address,
                            pl.lat,
                            pl.lng
                        )
                ),
            };
        default:
            return state;
    }
};
