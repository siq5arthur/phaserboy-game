import Phaser from "phaser";

import Player from './Player';

import sky from './assets/sky.png';
import ground from './assets/platform.png';
import star from './assets/star.png';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function collectStar (player, star)
{
    star.disableBody(true, true);
}

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', 
        dude,
        { frameWidth: 32, frameHeight: 48 }
    );
}

var platforms;
var player;
var cursors;
var stars;

function create ()
{
    this.add.image(400, 300, 'sky');

    cursors = this.input.keyboard.createCursorKeys();
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    
    player = new Player(this, cursors);
    player.create();
    
    player.addCollider(platforms);

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player.getPlayer(), stars, collectStar, null, this);
}

function update ()
{
    player.update()
}