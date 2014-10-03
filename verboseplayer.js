var util        = require('util');
var Binions     = require('binions');
var Player      = Binions.Player;

function VerbosePlayer( bot, chips, name )
{
    Player.call( this, bot, chips, name );
}

util.inherits( VerbosePlayer, Player );

VerbosePlayer.prototype.takeBlind = function( amount )
{
    var chips = Player.prototype.takeBlind.call( this, amount );

    this.emit( 'blind', amount );

    return chips;
}

module.exports = VerbosePlayer;
