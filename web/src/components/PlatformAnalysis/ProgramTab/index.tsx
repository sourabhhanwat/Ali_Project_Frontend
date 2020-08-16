import Box from '@material-ui/core/Box';
import React from 'react';
import ProgramPage from './ProgramPage';

export default function StrategyTab({ hidden }: { hidden?: boolean }) {
    
    var paragraphDesign = {
        // border: '1px solid black',
        backgroundColor: 'green',
        padding:    '.5rem',

    };

    const content = React.useMemo(
        () => (
            <>
                <p style={paragraphDesign}>INSPECTION PROGRAM</p>
                <ProgramPage />
            </>
        ),
        []
    );

    return <Box hidden={hidden}>{content}</Box>;
}
