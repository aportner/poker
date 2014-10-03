var util            = require("util");
var Binions         = require("binions");
var RandomBot       = require('./randombot');
var LocalPlayer     = require('./localplayer');
var Player          = require('./verboseplayer');
var PlayerListener  = require('./playerlistener');

var Game            = Binions.Game;
var NoLimit         = Binions.betting.noLimit;

function Table() {
    var self = this;

    noLimit = new NoLimit(1,2);
    players = [];
    listeners = [];
    chips = 100;

    for ( var i = 0; i < 6; ++i )
    {
        var player = null;

        if ( i < 5 )
        {
            var bot = new RandomBot();
            player = new Player( bot, chips, bot.name );
        }
        else
        {
            player = new LocalPlayer( chips );
        }

        if ( player != null )
        {
            players.push( player );
            listeners.push( new PlayerListener( this, player ) );
        }
    }




    var handIndex = 0;

    var game = new Game( players, noLimit, handIndex );

    game.on( 'roundComplete', function() {
        console.log( "round complete" );
    });
    game.on( 'complete', function() {
        console.log( "game complete" );
        console.log('winners:')
        for ( var i = 0; i < game.winners.length; ++i )
        {
            var winner = game.winners[ i ];
            var player = game.players[ winner.position ];
            console.log( 'winner:', player.name, winner.amount, self.formatCards( player.makeHand( game.community ).cards ) );
        }
    });

    game.on( 'roundStart', function() {
        console.log( 'roundStart' );
    } );

    game.on( 'stateChange', function( state ) {
        console.log( 'stateChange', state );

        if ( state == 'pre-flop' )
        {
            for ( var i = 0; i < players.length; ++i )
            {
                var player = players[ i ];
                var cards  = player.cards;
                console.log( players[ i ].name + ' dealt:', self.formatCards( cards ) );
            }
        }
        else if ( state == 'flop' || state == 'turn' || state == 'river' )
        {
            console.log( 'Cards:', self.formatCards( game.community ) );
        }
        else if ( state == 'final' )
        {
        }
    });

    game.run();
}

Table.prototype.onBlind = function( player, amount )
{
    console.log( player.name + ' blind: ' + amount );
}

Table.prototype.onBetAction = function( player, action, amount, err )
{
    console.log( player.name + ' ' + action + ' ' + amount );
}

Table.prototype.formatCards = function( cards )
{
    var value = "";

    for ( var i = 0; i < cards.length; ++i )
    {
        value += this.formatCard( cards[ i ] ) + " ";
    }

    return value;
}

Table.prototype.formatCard = function( card ) { return card.value + card.suit; }

var table           = new Table();
