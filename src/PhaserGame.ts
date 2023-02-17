import Phaser from 'phaser';

import { Bootstrap, Game } from './scenes'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser-container',
	backgroundColor: '#282c34',
	scale: {
	  mode: Phaser.Scale.ScaleModes.RESIZE,
	  width: window.innerWidth,
	  height: window.innerHeight,
	},
	physics: {
	  default: 'arcade',
	  arcade: {
		gravity: { y: 200 },
	  },
	},
	scene: [Bootstrap, Game],
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default new Phaser.Game(config)
