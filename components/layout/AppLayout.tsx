import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

const AppLayout = ({ children, backgroundColor, }:
    { children: React.ReactNode, backgroundColor?: string }) => {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const bg = backgroundColor || colors.background;

    return (
        <View style={[styles.root, {
            backgroundColor: bg
        }]}>
            <StatusBar
                style={colorScheme === 'dark' ? 'light' : 'dark'}
            />

            <View style={[styles.container, {
                backgroundColor: bg,
                paddingTop: hp(5),
                paddingHorizontal: wp(3)
            }]}>
                {children}
            </View>
        </View>
    );
};

export default AppLayout;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingBottom: hp(1),
    },
});
