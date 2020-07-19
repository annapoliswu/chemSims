import 'phaser';
import WaterScene from './scenes/waterScene';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import SelectionScene from './scenes/selectionScene';
import WeighScene from './scenes/weighScene';

const DEFAULT_WIDTH = 1366;
const DEFAULT_HEIGHT = 768;


const config: GameConfig = {
    backgroundColor: '#DDD',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, SelectionScene, WaterScene, WeighScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    dom:{
        createContainer: true
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
