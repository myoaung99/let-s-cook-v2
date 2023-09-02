import React from "react";

export interface MobileMenuProps {
    showMobileMenu: boolean;
    setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
};

export interface MenuData {
    href: string;
    label: string;
}

export interface MenuToggleButtonProps extends MobileMenuProps{
}