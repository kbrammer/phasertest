var parentElement = document.getElementById('phaser-game');
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var player;
var cursors;
var fireButton;

var backgroundBitmapData;

var gameState = new Phaser.State();
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, parentElement, gameState);

gameState.preload = function() {
    this.forceSingleUpdate = true;
    this.load.image('player', 'space-ship.png');
};

gameState.create = function () {
    // debugger;
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // add background
    backgroundBitmapData = this.make.bitmapData(GAME_WIDTH, GAME_HEIGHT);
    backgroundBitmapData.addToWorld();

    // add stars
    for(var i = 0; i < 50; i++){
        var star = new Phaser.Circle(this.world.randomX, this.world.randomY, this.rnd.integerInRange(2, 5));
        var starlight = new Phaser.Circle(star.x, star.y, star.radius*5);

        var starColor = Phaser.Color.getRandomColor(200, 255, 255);
        backgroundBitmapData.circle(star.x, star.y, star.radius, Phaser.Color.getWebRGB(starColor));

        var starLightColor = Phaser.Color.getRandomColor(200, 255, 50);
        backgroundBitmapData.circle(starlight.x, starlight.y, starlight.radius, Phaser.Color.getWebRGB(starLightColor));
    }
    

    // set up player
    player = this.add.sprite(this.world.randomX, this.world.randomY, 'player');
    player.anchor.set(0.5);
    this.physics.arcade.enable(player);
    player.body.drag.set(100);
    player.body.maxVelocity.set(200);
    player.rotationOffset = -1.5; //offset for initial angle of loaded sprite

    // keyboard events
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

};

gameState.update = function () {


    if (cursors.up.isDown)
    {
        this.physics.arcade.accelerationFromRotation(player.rotation+player.rotationOffset, 200, player.body.acceleration);
    }
    else
    {
        player.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 300;
    }
    else
    {
        player.body.angularVelocity = 0;
    }

    if (fireButton.isDown)
    {
        // fireBullet();
    }

    screenWrap(player);

};

gameState.render = function () {

    this.game.debug.spriteInfo(player, 32, 32);

};


function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}
