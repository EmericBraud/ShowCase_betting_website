"use client";

import { title, subtitle } from "@/components/primitives";
import * as React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { baseStyles, Divider } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import {Progress } from "@nextui-org/progress"

export const SideBarBoard = ({ buttonText }) => {
  return <div className="gridSidebarItem">{buttonText}</div>;
};

export const VideoBanner = () => {
  return (
    <div className="w-full h-auto overflow-hidden cursor-pointer">
      <video
        className="w-full h-auto"
        autoPlay
        loop
        muted
        playsInline
      >
          <source src="/banner.webm" type="video/webm"/>
            <source src="/banner.mp4" type="video/mp4"/>
            Votre navigateur ne supporte pas la vidéo.
      </video>
    </div>
  );
};

export const Indicator = ({title, value}) => {
    return(
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <p className="text-lg">{value}</p>
        </div>
    );
}

export const IndicatorBonusOpened = ({title, total, opened}: {title: string, total: number, opened: number}) => {
    return(
        <div className="flex flex-col">
            <p className="text-sm text-default-500">{title}</p>
            <Progress
                classNames={{
                    base: "max-w-md relative",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium font-bold text-default-600 w-full text-center absolute z-[200] top-1 [text-shadow:_1_1px_1_rgb(0_0_0_/_100%)]",
                    value: "text-foreground/60",
                }}
                label={`${opened}/${total}`}
                radius="sm"
                showValueLabel={false}
                size="lg"
                value={(opened/total)*100}
                />
        </div>
    );
}

export const MultiBox = ({value, color}: {value: number, color: string}) => {
    return(
        <p className={"text-md rounded w-min pl-1 pr-1"+ (color==="green" ? " bg-green-400 text-zinc-800": (color==="grey"? " bg-zinc-300 text-zinc-800":""))}>{value}x</p>
    );
}

export const IndicatorMulti = ({title, value, color}: {title: string, value: number, color: string}) =>{
    return(
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <MultiBox value={value} color={color}/>
        </div>
    );
}

export const IndicatorGainLoose = ({title, gain, bet}: {title: string, gain: number, bet: number}) => {
    return(
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <div className="flex flex-row gap-3">
                <p className="text-green-400">2000€</p>
                <MultiBox value={gain/bet} color={"green"}/>
            </div>
        </div>
    );
}

export const BonusItem = () => {
    return(
        <div className="p-2 bg-default-50 rounded-lg flex flex-row gap-6 justify-between hover:bg-default-100 transition-colors duration-300">
            <div className="flex flex-row gap-6">
                <img src="/game.png" width="150" className="object-cover rounded-xl drop-shadow-xl"/>
                <div className="flex flex-col justify-center min-h-full gap-1">
                    <p className="font-bold text-xl">Snake Arena</p>
                    <p className="text-default-500">Relax gaming</p>
                </div>
            </div>
            <div className="flex flex-col justify-center min-h-full gap-1">
                <p className="text-sm text-default-500">Mise de départ: 500€</p>
                <div className="flex flex-row gap-2">
                    <p>Gain : <span className="text-green-400">1000€</span></p>
                    <MultiBox value={2} color="green"/>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
                <Button>Editer le gain</Button>
                <Button>Supprimer</Button>
            </div>
        </div>
    );
}

export const BonusList = () => {

    return(
        <div>
            <h2 className="mb-2 text-md">Bonus récupérés :</h2>
            <div className="flex flex-col gap-3">
                <BonusItem/>
                <BonusItem/>
            </div>
        </div>
    );
}

export const BonusHunt = () => {
    let name: string = "#1";
    let start_bet = 1000;
    return(
        <div>
            <div className="flex flex-row w-full gap-3 mb-2 justify-between">
                <div className="flex flex-row gap-3">
                    <h1 className="font-bold text-lg p-0.5">Bonus hunt: {name}</h1>
                    <Switch defaultSelected={true} size="sm">Rendre public</Switch>
                </div>
                <Button size="sm" color="secondary">Copier le lien à partager</Button>

            </div>
            <Divider/>
            <div className="mt-2">
                <h2>Progression - Phase d'ouverture</h2>
                <br/>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-8">
                        <Indicator title="Mise de départ" value={start_bet+"€"}/>
                        <IndicatorBonusOpened title="Bonus ouverts" total={5} opened={3}/>
                        <IndicatorMulti title="Multi. breakeven" value={5} color="grey"/>
                        <IndicatorMulti title="Multi. moyen" value={10} color="green"/>
                        <IndicatorGainLoose title="Gain / Perte" gain={2000} bet={1000}/>
                    </div> 
                    <div className="flex flex-row gap-2">
                        <Button color="default">Statistiques</Button>
                        <Button color="primary">Ajouter des bonus</Button>
                        <Button color="danger">Terminer la session</Button>
                    </div>
                </div>
            </div>
            <br/>
            <Divider/>
            <div className="mt-2"/>
            <BonusList/>
        </div>
    );
}

export const HomePage = () => {
  return (
    <div>
      <div className="h-[180px] overflow-hidden flex items-center rounded-xl mb-6">
        <VideoBanner />
      </div>
      <div className="maingrid">
        <div className="gridSidebar overflow-hidden">
          <p className="text-center text-white font-bold p-2 animate-gradient">
            Mes bonus hunts
          </p>
          <VideoBanner />
          <div className="flex flex-col h-full">
            <div>
              <SideBarBoard buttonText={"HuntBoard"}></SideBarBoard>
              <SideBarBoard buttonText={"HuntBoard2"}></SideBarBoard>
            </div>
            <Button className="mt-3" color="primary">
              Ajouter
            </Button>
          </div>
        </div>
        <div className="gridContent rounded">
            <BonusHunt/>
        </div>
      </div>
    </div>
  );
};
