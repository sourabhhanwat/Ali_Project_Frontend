import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import InspectionHistory from './InspectionHistory';
import NextInspectionDate from './NextInspectionDate';

export default function ProgramTab({ hidden }: { hidden?: boolean }) {
    var paragraphDesign = {
        backgroundColor: '#68c1a8',
        padding:    '.8rem',
        color: 'Black',

    };

    const content = React.useMemo(
        () => (
            <>
                {/* <Typography style={{color: "Black",backgroundColor: '#68c1a8',padding:'.8rem',font:"bold"}} variant="body1">INSPECTION STRATEGY</Typography> */}
                {/* <p style={paragraphDesign}>INSPECTION STRATEGY</p> */}
                <p></p>
                <InspectionHistory />
                <br />
                <NextInspectionDate />
            </>
        ),
        []
    );

    return <Box hidden={hidden}>{content}</Box>;
}
