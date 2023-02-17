import {
    defineSystem,
    defineQuery,
    enterQuery,
    exitQuery
} from 'bitecs'
import { ArcadeSprite, ArcadeSpriteStatic, Position, Rotation,  Sprite, Velocity } from '../components'


export const createSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
    const spriteById = new Map<number, Phaser.GameObjects.Sprite>()
    const spriteQuery = defineQuery([Sprite, Position, Rotation])
    const spriteQueryEnter =  enterQuery(spriteQuery)
    const spriteQueryExit = exitQuery(spriteQuery)
    return  defineSystem(world => {
        const enterEntities =  spriteQueryEnter(world)
        for (let i= 0; i < enterEntities.length; i++){
            const id = enterEntities[i]
            const textId = Sprite.texture[id]
            const texture = textures[textId]
            spriteById.set(id, scene.add.sprite(0,0, 'tankers', texture))
        }
        const entities = spriteQuery(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            const sprite = spriteById.get(id)
            if (!sprite) continue
            sprite.x = Position.x[id]
            sprite.y = Position.y[id]
            sprite.angle = Rotation.angle[id]
        }
        const exitEntities = spriteQueryExit(world)
        for (let i = 0; i < exitEntities.length; i++) {
            const id = exitEntities[i];
            const sprite = spriteById.get(id)
            if (!sprite) continue
            sprite.destroy()
            spriteById.delete(id)
        }
        return world
    })
}

export const createArcadeSpriteSystem = (group: Phaser.Physics.Arcade.Group, textures: string[]) => {
        const spriteById = new Map<number, Phaser.Physics.Arcade.Sprite>()
        const spriteQuery = defineQuery([ArcadeSprite, Position, Rotation, Velocity])
        const spriteQueryEnter =  enterQuery(spriteQuery)
        const spriteQueryExit = exitQuery(spriteQuery)
        return  defineSystem(world => {
            const enterEntities =  spriteQueryEnter(world)
            for (let i= 0; i < enterEntities.length; i++){
                const id = enterEntities[i]
                const textId = ArcadeSprite.texture[id]
                const texture = textures[textId]
                // const arcadeSprite = scene.add.sprite(0, 0, 'tankers', texture)
                const arcadeSprite = group.get(Position.x[id], Position.y[id], 'tankers', texture)
                spriteById.set(id, arcadeSprite)
            }
            const entities = spriteQuery(world)
            for (let i = 0; i < entities.length; i++) {
                const id = entities[i];
                const sprite = spriteById.get(id)
                if (!sprite) continue
                sprite.setVelocity(Velocity.x[id], Velocity.y[id])
                sprite.angle = Rotation.angle[id]
            }
            const exitEntities = spriteQueryExit(world)
            for (let i = 0; i < exitEntities.length; i++) {
                const id = exitEntities[i];
                const sprite = spriteById.get(id)
                if (!sprite) continue
                group.killAndHide(sprite)
                spriteById.delete(id)
            }
            return world
        })
}

export const createArcadeSpriteStaticSystem = (group: Phaser.Physics.Arcade.StaticGroup, textures: string[]) => {
    const spriteById = new Map<number, Phaser.Physics.Arcade.Sprite>()
    const spriteQuery = defineQuery([ArcadeSpriteStatic, Position])
    const spriteQueryEnter =  enterQuery(spriteQuery)
    const spriteQueryExit = exitQuery(spriteQuery)
    return  defineSystem(world => {
        const enterEntities =  spriteQueryEnter(world)
        for (let i= 0; i < enterEntities.length; i++){
            const id = enterEntities[i]
            const textId = ArcadeSpriteStatic.texture[id]
            const texture = textures[textId]
            // const arcadeSprite = scene.add.sprite(0, 0, 'tankers', texture)
            const arcadeSprite = group.get(Position.x[id], Position.y[id], 'tankers', texture)
            spriteById.set(id, arcadeSprite)
        }
        const entities = spriteQuery(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            const sprite = spriteById.get(id)
            if (!sprite) continue
            sprite.setPosition(Position.x[id], Position.y[id])
        }
        const exitEntities = spriteQueryExit(world)
        for (let i = 0; i < exitEntities.length; i++) {
            const id = exitEntities[i];
            const sprite = spriteById.get(id)
            if (!sprite) continue
            group.killAndHide(sprite)
            spriteById.delete(id)
        }
        return world
    })
}