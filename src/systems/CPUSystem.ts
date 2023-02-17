import Phaser from 'phaser'
import { defineQuery, defineSystem } from 'bitecs'
import { CPU, Rotation, Velocity } from '../components'


export const createCPUSystem = (scene: Phaser.Scene) => {
    const cpuQuery = defineQuery([CPU, Velocity, Rotation])
    return defineSystem(world => {
        const dt = scene.game.loop.delta;
        const entities = cpuQuery(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            CPU.accumulatedTime[id] += dt
            if (CPU.accumulatedTime[id] < CPU.timeBetweenActions[id]) 
            {
                continue
            }
            CPU.accumulatedTime[id] = 0
            const rand = Phaser.Math.Between(0,20)
            switch (rand) {
                // left
                case 0:
                    Velocity.x[id] = -5
                    Velocity.y[id] = 0
                    Rotation.angle[id] = 180
                    break;
                // right
                case 1:
                    Velocity.x[id] = 5
                    Velocity.y[id] = 0
                    Rotation.angle[id] = 0
                    break;
                // up
                case 2:
                    Velocity.x[id] = 0
                    Velocity.y[id] = -5
                    Rotation.angle[id] = 270
                    break;
                // down
                case 3:
                    Velocity.x[id] = 0
                    Velocity.y[id] = 5
                    Rotation.angle[id] = 90
                    break;
                // stay
                default:
                    Velocity.x[id] = 0
                    Velocity.y[id] = 0
                    break;
            }
        }
        return world
    })
}