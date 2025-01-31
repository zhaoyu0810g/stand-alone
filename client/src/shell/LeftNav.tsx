import React, { memo, useCallback } from 'react';
import {
    Board20Filled,
    Board20Regular,
    BoxMultiple20Filled,
    BoxMultiple20Regular,
    bundleIcon,
} from "@fluentui/react-icons";
import {
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavItem,
} from "@fluentui/react-nav-preview";

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);

export const LeftNav: React.FC = memo(() => {
    const linkDestination = "";
    const handleSelectionChange = useCallback((_event: {}, item: { value: string }) => {
        console.log("Selected value:", item);
    }, []);

    return (
        <NavDrawer
            defaultSelectedValue="1"
            defaultSelectedCategoryValue=""
            open={true}
            type={"inline"}
            multiple={true}
            onNavItemSelect={handleSelectionChange}
        >
            <NavDrawerHeader></NavDrawerHeader>
            <NavDrawerBody>
                <NavItem href={linkDestination} icon={<Dashboard />} value="1">
                    Home
                </NavItem>
                <NavItem href={linkDestination} icon={<TrainingPrograms />} value="2">
                    Mock: RAG
                </NavItem>
                <NavItem href={linkDestination} icon={<TrainingPrograms />} value="3">
                    Connector
                </NavItem>
            </NavDrawerBody>
        </NavDrawer>
    );
});

LeftNav.displayName = "LeftNav";
