"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {

    console.log("Particles container loaded:", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 80,
        fullScreen : {
          enable : false
        },
        particles: {
          color: {
            value: [  '#f472b6', 
            '#ec4899',
            '#8b5cf6', // violet-500
            '#6366f1', // indigo-500
            '#3b82f6', // blue-500
            '#0ea5e9', // sky-500
            '#06b6d4', // cyan-500
            '#14b8a6', // teal-500
            '#10b981', // green-500
            '#84cc16', // lime-500
            '#eab308', 
            '#f59e0b', 
            '#ef4444', 
            '#f43f5e' ]
          },
          links: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 400,
            },
            value: 15,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;