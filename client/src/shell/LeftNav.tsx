import React, { memo } from 'react';
import {
    Chat20Filled,
    Chat20Regular,
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

const ChatIcon = bundleIcon(Chat20Filled, Chat20Regular);
const DataIcon = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);

// TODO: Change Icon

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
                    <NavItem icon={<DataIcon />} value="/">
                        Mock: RAG
                    </NavItem>
                </Link>
                <Link to="/chat">
                    <NavItem icon={<ChatIcon />} value="/chat">
                        Chat
                    </NavItem>
                </Link>
            </NavDrawerBody>
        </NavDrawer>
    );
});

LeftNav.displayName = "LeftNav";
