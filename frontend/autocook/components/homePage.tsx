"use client";

import { title, subtitle } from "@/components/primitives";
import * as React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";

export const SideBarBoard = ({ buttonText }) => { 
    return (
        <div className="mt-2 mb-2">
            <Button fullWidth={true}>{buttonText}</Button> {/* Utilisation de la prop */}
        </div>
    );
};


export const HomePage = () => {
    return(
    <div className="maingrid">
        <div className="gridSidebar">
            <p className="text-center text-secondary rounded font-bold mb-3">My boards</p>
            <Divider/>
            <div className="flex flex-col h-full">
                <div>
                    <SideBarBoard buttonText={"HuntBoard"}></SideBarBoard>
                    <SideBarBoard buttonText={"HuntBoard2"}></SideBarBoard>
                </div>
                <Divider/>
                
                <Button className="mt-3" color="primary">
                    New board
                </Button>
            </div>
        </div>
        <div className="gridContent">
            Content
        </div>
    </div>);
}