var instructions = 0;
var PLAY = 1;
var END = 2;
var gameState = instructions;

var ob,obG, ob1, ob2;
var theif, theifImg;
var gameOver, gameOverImg;
var police, policeImg;
var iGround, road;
var score = 0;
var bg;

function preload() {
    ob1 = loadImage("images/building.png");
    ob2 = loadImage("images/handPump.png");
    theifImg = loadAnimation("images/chor.gif");
    policeImg = loadImage("images/police.png");
    gameOverImg = loadImage("images/gameOver.png");
    bg = loadImage("images/bg.jpg");
    //road = loadImage("images/road.png");
}

function setup() {
    createCanvas(2500,1000);

    gameOver = createSprite(1250,350);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    theif = createSprite(700,850);
    theif.addAnimation("running",theifImg);
    theif.scale = 0.7;

    police = createSprite(200,850);
    police.addImage(policeImg);
    police.scale = 0.5;

    iGround = createSprite(1250,1000,200000,20);
    iGround.shapeColor = "black";

    obG = new Group();
}

function draw() {
    background(255);

    if(gameState === instructions) {
        texts();
        theif.visible = false;
        police.visible = false;
        iGround.visible = false;
        gameOver.visible = false;

        if(keyDown('s')) {
            gameState = PLAY;
        }
    }

    if(gameState === PLAY) {
        background(bg);
        textSize(55);
        fill("black");
        textFont("Comic Sans MS");
        text("Score: "+ score, 60,90);

        gameOver.visible = false;

        theif.visible = true;
        police.visible = true;
        iGround.visible = true;

        theif.collide(iGround);
        police.collide(iGround);
        police.y = theif.y;

        if(keyDown("space")) {
            theif.velocityY = -12;
        }
        theif.velocityY += 1;
        score = score+Math.round(getFrameRate()/60);

        obs();

        if(theif.isTouching(obG)) {
            gameState = END;
        }
}
        if(gameState === END) {
            background(bg);
            obG.destroyEach();
            gameOver.visible = true;
            textSize(75);
            fill("black");
            text("CAUGHT!!",1250,100);

            if(keyCode === 114) {
                reset();
            }
        }

    drawSprites();
}

function texts() {
    textSize(60);
    fill("black");
    text("GAME INSRUCTIONS", 40, 90);

    textSize(45);
    fill("black")
    text("1) Press 'SPACE' to jump.", 40, 170);

    textSize(45);
    fill("black");
    text("2) Be careful from obstacles!!", 40, 240);

    textSize(45);
    fill("black");
    text("3) If your game's over, then press 'R' to restart", 40, 310);

    textSize(45);
    fill("black");
    text("4) Wanna start the game? Press 's'.", 40, 380);

    textSize(195);
    fill("magenta");
    textFont("Book Antiqua");
    text("ALL THE BEST!!", 250, 700);
}

function obs() {
    if(frameCount%300 === 0) {
        ob = createSprite(2500,750);
        ob.velocityX = -5;
        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: ob.addImage(ob1);
            ob.scale = 0.3;
            break;
            case 2: ob.addImage(ob2);
            ob.scale = 0.2;
            break;
            default: break;
        }
        obG.add(ob);
    }
}

function reset() {
    gameState = PLAY;
    score = 0;
}