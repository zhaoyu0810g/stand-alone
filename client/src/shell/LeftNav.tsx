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
import { Link } from 'react-router-dom';

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);

export const LeftNav: React.FC = memo(() => {
    return (
        <NavDrawer
            defaultSelectedValue={window.location.pathname}
            defaultSelectedCategoryValue=""
            open={true}
            type={"inline"}
            multiple={true}
        >
            <NavDrawerHeader></NavDrawerHeader>
            <NavDrawerBody>
                <Link to="/">
                    <NavItem icon={<Dashboard />} value="/">
                        Home
                    </NavItem>
                </Link>
                <Link to="/dashboard">
                    <NavItem icon={<TrainingPrograms />} value="/dashboard">
                        Mock: RAG
                    </NavItem>
                </Link>
                <Link to="/connector">
                    <NavItem icon={<TrainingPrograms />} value="3">
                        Connector
                    </NavItem>
                </Link>
            </NavDrawerBody>
        </NavDrawer>
    );
});

LeftNav.displayName = "LeftNav";
