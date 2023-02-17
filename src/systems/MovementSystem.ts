import { defineQuery, defineSystem } from 'bitecs'
import { Position, Velocity } from '../components'

export const createMovementSystem = () => {
    const query = defineQuery([Position, Velocity])
    return defineSystem(world => {
        const entities = query(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            Position.x[id] += Velocity.x[id]
            Position.y[id] += Velocity.y[id]
            
        }
        return world
    })
}