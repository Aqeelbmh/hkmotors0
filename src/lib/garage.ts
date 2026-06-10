import { useState, useEffect } from "react";
import type { Vehicle } from "@/data/catalog";
import { vehicles as allVehicles } from "@/data/catalog";

const STORAGE_KEY = "hk-motors-garage";

export function useGarage() {
    const [myVehicle, setMyVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const v = allVehicles.find((v) => v.slug === saved);
            if (v) setMyVehicle(v);
        }
    }, []);

    const setVehicle = (slug: string | null) => {
        if (slug) {
            localStorage.setItem(STORAGE_KEY, slug);
            const v = allVehicles.find((v) => v.slug === slug);
            setMyVehicle(v || null);
        } else {
            localStorage.removeItem(STORAGE_KEY);
            setMyVehicle(null);
        }
    };

    return { myVehicle, setVehicle };
}
