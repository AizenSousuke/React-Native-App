import React from 'react'
import { View, Text } from 'react-native'
import BusDetails from './BusDetails'

const BusStop = () => {
    return (
        <View>
            <BusDetails busNumber={966} />
            <BusDetails busNumber={960} />
            <BusDetails busNumber={911} />
            <BusDetails busNumber={913} />
            <BusDetails busNumber={963} />
        </View>
    )
}

export default BusStop
