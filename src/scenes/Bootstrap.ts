import Phaser from 'phaser'
export class Bootstrap extends Phaser.Scene
{
	constructor()
	{
		super('bootstrap')
	}

    init()
    {

    }

	preload()
    {
        this.load.multiatlas('tankers', 'assets/tanker-game.json', 'assets');
    }

    create()
    {
        this.createNewGame();  
    }


    update() {
        
    }

    private createNewGame() 
    {
        this.scene.launch('game');
    }
}
