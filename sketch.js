var ball;

var database, position;

function setup()
{
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //we are refrencing position thing inn database
    //refencing means pointing
    var node = database.ref("Ball/Position");

    //on() lisens to the database
    //on() is used to read information from database
    node.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y)
{
    //set() is used to write inside the database
    database.ref("Ball/Position").set({
        x: ball.x + x,
        y: ball.y + y
    })
}

function readPosition(data)
{
    //val() take out the values in JSON format
    position = data.val(); //{x: 200, y: 200}

    ball.x = position.x;
    ball.y = position.y;
}

function showError()
{
    console.log("Error");
}