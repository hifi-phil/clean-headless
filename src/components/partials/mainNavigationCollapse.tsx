"use client";

import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { TranslationModel } from "@/api-clean/model";
import { HomeContentResponseModel } from "@/api/model";
import { VisibilityControlsContentResponseModel } from "@/api/model";
import { getDictionValue } from "@/helpers/dictionary";

interface MainNavigationCollapseProps {
    navigation: VisibilityControlsContentResponseModel[];
    dictionary?: TranslationModel[];
    homePage?: HomeContentResponseModel;
}

export const MainNavigationCollapse = ({ navigation, dictionary, homePage }: MainNavigationCollapseProps) => {
   
   
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className={`navbar-toggler${isOpen ? "" : " collapsed"}`}
                type="button"
                aria-controls="navbarResponsive"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getDictionValue(dictionary, "Navigation.MenuTitle")}
                {' '}<FontAwesomeIcon icon={faBars} />
            </button>
            <Collapse in={isOpen}>
            <div className="navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto py-4 py-lg-0">
                    <li className="nav-item">
                        <a className="nav-link px-lg-3 py-3 py-lg-4" href={homePage?.route?.path!}>{homePage?.name}</a>
                    </li>
                    {navigation.map((page, index) => (
                        <li key={index} className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href={page.route?.path!}>{page.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            </Collapse>
        </>
    );
};
