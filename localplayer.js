var util        = require('util');
var Binions     = require('binions');
var readline    = require('readline');
var Player      = Binions.Player;

function LocalPlayer( chips )
{
    this.interface = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    } );

    Player.call( this, null, chips, 'Local Player' );
}

util.inherits( LocalPlayer, Player );

LocalPlayer.prototype.update = function( gameStatus, cb )
{
    var self = this;
    var err = null

    if ( gameStatus.state == 'complete' )
    {
        cb( err, false );
    }
    else
    {
        this.interface.question( "(c)heck/call, (f)old, or enter a number to bet: ", function( text ) {
            if ( text == 'f' )
            {
                cb( err, false );
            }
            else if ( text == "c" )
            {
                cb( err, gameStatus.betting.call );
            }
            else
            {
                cb( err, parseInt( text, 10 ) );
            }
        } );
    }
}

module.exports = LocalPlayer;
