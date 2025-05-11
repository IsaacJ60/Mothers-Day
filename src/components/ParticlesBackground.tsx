"use client";

import React, { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useMotherStore } from "@/store/useMotherStore";

interface ParticlesBackgroundProps {
    /** z-index for the canvas (behind content by default) */
    zIndex?: number;
}

// Map favoriteFlower names to image file paths
const flowerImageMap: Record<string, string> = {
    Roses: "/rose.png",
    Tulips: "/tulip.png",
    Lilies: "/lily.png",
    Orchids: "/orchid.png",
    Carnations: "/carnation.png",
    Daisies: "/daisy.png",
    Sunflowers: "/sunflower.png",
    Peonies: "/peony.png",
    Chrysanthemums: "/chrysanthemum.png",
    Hydrangeas: "/hydrangea.png",
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ zIndex = -1 }) => {
    // Retrieve the selected flower from global state
    const info = useMotherStore((s) => s.info);
    const selectedFlower = info?.favoriteFlower || "";
    const imageSrc = flowerImageMap[selectedFlower] || "/flower.png";

    // track initialization state
    const [initialized, setInitialized] = useState(false);

    // memoized callback for particlesLoaded
    const particlesLoaded = useCallback(async (container?: Container) => {
        console.log(container);
        return Promise.resolve();
    }, []);

    // initialize tsParticles engine once
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInitialized(true);
        });
    }, []);

    // avoid SSR mismatch
    if (!initialized) {
        return null;
    }

    return (
        <Particles
            id="tsparticles-bg"
            particlesLoaded={particlesLoaded}
            options={{
                fullScreen: { enable: true, zIndex },
                background: { color: { value: "transparent" } },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: { enable: true, mode: "repulse" },
                        resize: { enable: true },
                    },
                    modes: {
                        push: { quantity: 1 },
                        repulse: { distance: 200, duration: 5 },
                    },
                },
                particles: {
                    number: { value: 50, density: { enable: true } },
                    shape: {
                        type: "image",
                        options: { image: { src: imageSrc, width: 48, height: 48 } },
                    },
                    size: { value: { min: 20, max: 50 } },
                    move: {
                        direction: "bottom",
                        enable: true,
                        outModes: { default: "out" },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    links: {
                        color: "#000",
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    opacity: { value: 0.5 },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;
