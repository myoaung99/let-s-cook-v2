import type { Container, Engine, ISourceOptions } from 'tsparticles-engine';
import Particles from 'react-particles';
import { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim'; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const ParticlesComponent = () => {
    const particlesInit = async (engine: Engine) => {
        await loadSlim(engine);
    };

    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log(container);
        },
        []
    );
    // options variable is the particles configuration
    // many configurations can be found here: https://particles.js.org
    // other configurations can be found in the official CodePen collection here: https://codepen.io/collection/DPOage
    const options: ISourceOptions = {
        fullScreen: {
            enable: false, // set this to false to use the particles like any other DOM element, with this true they act like a background
            zIndex: -1,
        },
        fpsLimit: 120,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: ['#2EB67D', '#ECB22E', '#E01E5B', '#36C5F0'],
            },
            shape: {
                type: 'circle',
            },
            opacity: {
                value: 1,
            },
            size: {
                value: { min: 1, max: 8 },
            },
            links: {
                enable: true,
                distance: 150,
                color: '#808080',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 5,
                outModes: {
                    default: 'out',
                },
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'grab',
                },
                onClick: {
                    enable: true,
                    mode: 'push',
                },
            },
            modes: {
                grab: {
                    distance: 280,
                    links: {
                        opacity: 1,
                        color: '#808080',
                    },
                },
                push: {
                    quantity: 4,
                },
            },
        },
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default ParticlesComponent;
