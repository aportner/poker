var util        = require("util");
var Binions     = require("binions");
var RandomBot   = require('./randombot');
var LocalPlayer = require('./localplayer');

var Game        = Binions.Game;
var Player      = Binions.Player;
var NoLimit     = Binions.betting.noLimit;

noLimit = new NoLimit(1,2);
players = [];
chips = 100;

for ( var i = 0; i < 5; ++i )
{
    var bot = new RandomBot();
    players.push( new Player( bot, chips, bot.name ))
}

players.push( new LocalPlayer( chips ) );

var handIndex = 0;

var game = new Game( players, noLimit, handIndex );
game.on( 'roundComplete', function() {
    console.log( "round complete" );
});
game.on( 'complete', function() {
    console.log( "game complete" );
});

game.run();
