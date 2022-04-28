import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

import { combineReducers, applyMiddleware } from "redux";
import placeReduser from "./store/places-redusers";

import PlacesNavigator from "./navigation/PlacesNavigator";

import { init } from "./helpers/db";

init()
    .then(() => {
        console.log("Iinitializing database");
    })
    .catch((err) => {
        console.log("Initializing Db Failed");
        console.log(err);
    });

const rootReducer = combineReducers({
    places: placeReduser,
});

const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }),
    },
    applyMiddleware(ReduxThunk)
);

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
