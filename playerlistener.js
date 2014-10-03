function PlayerListener( main, player )
{
    this.player = player;

    player.on( 'blind', function( amount ) { main.onBlind( player, amount ); } );
    player.on( 'betAction', function( action, amount, err ) { main.onBetAction( player, action, amount, err ); } );
}

module.exports = PlayerListener;
