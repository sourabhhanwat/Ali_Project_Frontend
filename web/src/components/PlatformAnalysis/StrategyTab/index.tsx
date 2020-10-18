import Box from '@material-ui/core/Box';
import React from 'react';
import InspectionHistory from './InspectionHistory';
import NextInspectionDate from './NextInspectionDate';

export default function ProgramTab({ hidden }: { hidden?: boolean }) {
    var paragraphDesign = {
        backgroundColor: 'Gray',
        padding:    '.8rem',
        color: 'white',

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
