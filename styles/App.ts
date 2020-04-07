import {StyleSheet, StatusBar, Platform} from 'react-native'

export default StyleSheet.create({
    header: {
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        flex: 1
    },
    background: {
        backgroundColor: 'black',
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})