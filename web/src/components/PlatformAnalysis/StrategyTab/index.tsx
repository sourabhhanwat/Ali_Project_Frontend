import Box from '@material-ui/core/Box';
import React from 'react';
import InspectionHistory from './InspectionHistory';
import NextInspectionDate from './NextInspectionDate';

export default function ProgramTab({ hidden }: { hidden?: boolean }) {
    var paragraphDesign = {
        // border: '1px solid black',
        backgroundColor: 'green',
        padding:    '.5rem',

    };

    const content = React.useMemo(
        () => (
            <>
                <p style={paragraphDesign}>INSPECTION STRATEGY</p>
                <InspectionHistory />
                <br />
                <NextInspectionDate />
            </>
        ),
        []
    );

    return <Box hidden={hidden}>{content}</Box>;
}
