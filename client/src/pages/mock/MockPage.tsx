import React, { ReactNode, memo } from 'react';

export const MockPage: React.FC = memo((): ReactNode => {
    return (
        <div>
            MockPage
        </div>
    )
})

MockPage.displayName = "MockPage";
