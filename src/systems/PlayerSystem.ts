import Phaser from 'phaser'
import { defineQuery, defineSystem } from 'bitecs'
import { Player, Velocity } from '../components'


export const createPlayerSystem = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
    const query = defineQuery([Player, Velocity])
    return defineSystem(world => {
        const entities = query(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            if (cursors.left.isDown)
            {
                Velocity.x[id] = -5
                Velocity.y[id] = 0
            }
            else if(cursors.right.isDown)
            { 
                Velocity.x[id] = 5
                Velocity.y[id] = 0
            }
            else if(cursors.up.isDown)
            {
                Velocity.x[id] = 0
                Velocity.y[id] = -5
            }
            else if(cursors.down.isDown)
            {
                Velocity.x[id] = 0
                Velocity.y[id] = 5
            }
            else
            {
                Velocity.x[id] = 0
                Velocity.y[id] = 0
            }
            
        }
        return world
    })
}