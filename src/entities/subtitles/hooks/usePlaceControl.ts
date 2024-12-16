import { useState } from "react";

type Placement = "fixed" | "draggable";

const PLACEMENT_LOCALSTORAGE = "placement-settings";

export const usePlaceControl = () => {
  const [placement, setPlacement] = useState<Placement>(
    (localStorage.getItem(PLACEMENT_LOCALSTORAGE) as Placement) || "fixed"
  );

  const updatePlacement = (type: Placement) => {
    setPlacement(type);
    localStorage.setItem(PLACEMENT_LOCALSTORAGE, type);
  };

  return { placement, setPlacement: updatePlacement };
};
