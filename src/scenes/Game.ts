import Phaser from 'phaser'
import {
    createWorld,
    addEntity,
    addComponent,
    System,
    IWorld,
} from 'bitecs'

import { Position, Rotation, Velocity, Sprite, Player, CPU } from '../components'

import { createSpriteSystem, createMovementSystem, createPlayerSystem, createCPUSystem } from '../systems'

// 1. create CPU component
// 2. create CPU system
// 3. run  CPU system
// 4. create a bunch of CPU Tanks
export class Game extends Phaser.Scene
{
    private world?: IWorld
    private spriteSystem?: System
    private movementSystem?: System
    private playerSystem?: System
    private cpuSystem?: System
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
        const { width, height } = this.scale
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

        //TODO: Create random CPU Tanks
        for (let i = 0; i < 20; i++) {
            const cpuTank = addEntity(this.world);
            addComponent(this.world, Position, cpuTank)
            Position.x[cpuTank] = Phaser.Math.Between(width * 0.25, width * 0.75)
            Position.y[cpuTank] = Phaser.Math.Between(height * 0.25, height *0.75)

            addComponent(this.world, Rotation, cpuTank)
            Rotation.angle[cpuTank] = 0;

            addComponent(this.world, Velocity, cpuTank)

            Velocity.x[cpuTank] = 0
            Velocity.y[cpuTank] = 0

            addComponent(this.world, Sprite, cpuTank)

            Sprite.texture[cpuTank] = Phaser.Math.Between(1, 2) 
            
            addComponent(this.world, CPU, cpuTank)   
            CPU.timeBetweenActions[cpuTank] = Phaser.Math.Between(0,500)    
        }

        this.spriteSystem = createSpriteSystem(this, ['tank_blue.png','tank_red.png','tank_green.png'])
        this.movementSystem = createMovementSystem()
        this.playerSystem = createPlayerSystem(this.cursors)
        this.cpuSystem = createCPUSystem(this)
        console.log(Velocity);
        // this.add.sprite(100, 100, 'tankers', 'tank_blue.png');
        // this.add.sprite(300, 300, 'tankers', 'tank_red.png');
        // this.add.sprite(400, 400, 'tankers', 'tank_green.png');
    }


    update() {
        if(!this.world) return

        this.playerSystem?.(this.world)
        this.cpuSystem?.(this.world)
        this.movementSystem?.(this.world)
        this.spriteSystem?.(this.world);

    }
}
