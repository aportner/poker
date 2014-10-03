var util        = require('util');
var Binions     = require('binions');
var Player      = Binions.Player;

function LocalPlayer( chips )
{
    Player.call( this, null, chips, 'Local Player' );
}

util.inherits( LocalPlayer, Player );

LocalPlayer.prototype.update = function( gameStatus, cb )
{
    console.log( gameStatus );
}

module.exports = LocalPlayer;
