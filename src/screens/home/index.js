import React from "react";
import Box from '../../components/box';

export default function HomeScreen() {
    return [
        <Box>
            <h1>This is Left column...</h1>
        </Box>,
        <Box>
            <h1>This is Right column...</h1>
        </Box>
    ]
};