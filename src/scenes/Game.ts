import Phaser from 'phaser'
import {
    createWorld,
    addEntity,
    addComponent,
    System,
    IWorld,
} from 'bitecs'

import { Position, Rotation, Velocity, Sprite, Player } from '../components'

import { createSpriteSystem, createMovementSystem, createPlayerSystem } from '../systems'

export class Game extends Phaser.Scene
{
    private world?: IWorld
    private spriteSystem?: System
    private movementSystem?: System
    private playerSystem?: System
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	constructor()
	{
		super('game')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        this.world = createWorld();
        const tank = addEntity(this.world);

        addComponent(this.world, Position, tank)

        Position.x[tank] = 100
        Position.y[tank] = 100


        addComponent(this.world, Rotation, tank)
        Rotation.angle[tank] = 0;

        addComponent(this.world, Velocity, tank)

        Velocity.x[tank] = 0
        Velocity.y[tank] = 0


        addComponent(this.world, Sprite, tank)

        Sprite.texture[tank] = 0

        addComponent(this.world, Player, tank)

        this.spriteSystem = createSpriteSystem(this, ['tank_blue.png','tank_red.png','tank_green.png'])
        this.movementSystem = createMovementSystem()
        this.playerSystem = createPlayerSystem(this.cursors)
        console.log(Velocity);
        // this.add.sprite(100, 100, 'tankers', 'tank_blue.png');
        // this.add.sprite(300, 300, 'tankers', 'tank_red.png');
        // this.add.sprite(400, 400, 'tankers', 'tank_green.png');
    }


    update() {
        if(!this.world) return

        this.playerSystem?.(this.world)
        this.movementSystem?.(this.world)
        this.spriteSystem?.(this.world);

    }
}
