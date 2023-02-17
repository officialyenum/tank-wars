import Phaser from 'phaser'
import { defineQuery, defineSystem } from 'bitecs'
import { CPU, Direction, Input, Rotation, Velocity } from '../components'


export const createCPUSystem = (scene: Phaser.Scene) => {
    const cpuQuery = defineQuery([CPU, Velocity, Rotation, Input])
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
                    Input.direction[id] = Direction.Left
                    break;
                // right
                case 1:
                    Input.direction[id] = Direction.Right
                    break;
                // up
                case 2:
                    Input.direction[id] = Direction.Up
                    break;
                // down
                case 3:
                    Input.direction[id] = Direction.Down
                    break;
                // none
                default:
                    Input.direction[id] = Direction.None
                    break;
            }
        }
        return world
    })
}