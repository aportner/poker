function RandomBot()
{
    this.name   = "Player" + Math.floor( Math.random() * 10000 );
}

RandomBot.prototype.update = function( game )
{
    var raise   = Math.random() < 0.25;

    if ( game.state == 'complete' )
    {
        return false;
    }
    else if ( raise )
    {
        return game.betting.raise;
    }
    else
    {
        return game.betting.call;
    }
}

module.exports = RandomBot;
