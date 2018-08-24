var SEMI_BRD_ORIENT = [0,0,0,0,0,0] //0-normal, 1- 90 deg rot, 2- 180 deg rot, 3- 270 deg rot 
//SEMI_BRD (semi boards) are  0  1
//              2  3
//              4  5

var SEMI_BRD_DIM = 300,
    BLOCK_SIZE = SEMI_BRD_DIM/5 ;

var origin = 
{
    "x": 1.7*SEMI_BRD_DIM,
    "y": 3*SEMI_BRD_DIM/5
};  

var piece_img_dim = 
{
   "ROOK" : {
                "height":208,
                "width":99
            },
   "BISHOP" : {
                "height":205,
                "width":99
            },
   "KING" : {
                "height":203,
                "width":99
            },
   "KNIGHT" : {
                "height":202,
                "width":99
            }
};

///////////////////////////////  POSITION AND STATE OF PIECES  /////////////////////////////////

var json = 
{
    "white": 
    [
        {
            "piece": "ROOK",
            "row": 0,
            "col": 0,
            "in_play": true
        },
        {
            "piece": "BISHOP",
            "row": 0,
            "col": 2,
            "in_play": true
        },
        {
            "piece": "KING",
            "row": 0,
            "col": 3,
            "in_play": true
        },  
        {
            "piece": "KNIGHT",
            "row": 1,
            "col": 0,
            "in_play": true
        }
    ],
    "black": 
    [
        {
            "piece": "ROOK",
            "row": 5,
            "col": 0,
            "in_play": true
        },
        {
            "piece": "BISHOP",
            "row": 5,
            "col": 2,
            "in_play": true
        },
        {
            "piece": "KING",
            "row": 5,
            "col": 3,
            "in_play": true
        },  
        {
            "piece": "KNIGHT",
            "row": 5,
            "col": 0,
            "in_play": true
        }
    ]       
};

//////////////////////  Drawing pieces  ///////////////////////////////

function drawPiece(curPiece, bBlackTeam)
{
    var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

    var piece_img = new Image();


    piece_img.onload = function() {
        var imgWidth = piece_img.naturalWidth;
        var imgHeight = piece_img.naturalHeight;

        ctx.drawImage(piece_img, 0, bBlackTeam*imgHeight/2 , imgWidth, imgHeight/2,
        curPiece.col * BLOCK_SIZE + origin.x, curPiece.row * BLOCK_SIZE + origin.y, BLOCK_SIZE, BLOCK_SIZE);                 
    };
    piece_img.src = curPiece.piece + ".png";
};

function drawTeamOfPieces(teamOfPieces,bBlackTeam)
{
    var iPieceCounter;
 
    // Loop through each piece and draw it on the canvas    
    for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) 
    {   
        drawPiece(teamOfPieces[iPieceCounter],bBlackTeam);
    }   
}

function drawPieces()
{  // 0-Black piece  1-White piece
    drawTeamOfPieces(json.black,0);
    drawTeamOfPieces(json.white,1);
}

///////////////////////    DRAWING BOARD   //////////////////////

function drawSemiBoard(board_no) {
    var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "#caf2ec";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var img = new Image();

    var x = Math.floor(board_no/2);
    var y = board_no%2;

    img.onload = function() {
    ctx.drawImage(img,x*SEMI_BRD_DIM + 1.7*SEMI_BRD_DIM,y*SEMI_BRD_DIM + 3*SEMI_BRD_DIM/5,SEMI_BRD_DIM,SEMI_BRD_DIM);
    };
    if(SEMI_BRD_ORIENT[board_no] === 0){
        img.src="./" + board_no + "/board_0.png";
    }else if(SEMI_BRD_ORIENT[board_no] === 1){
        img.src="./" + board_no + "/board_1.png";
    }else if (SEMI_BRD_ORIENT[board_no] === 2) {
        img.src="./" + board_no + "/board_2.png";
    }else{
        img.src="./" + board_no + "/board_3.png";
    }
};

function drawBoard(){
    // var canvas = document.getElementById("canvas");
    // var ctx = canvas.getContext("2d");
    
    for (var i = 0; i < 6; i++) {
        drawSemiBoard(i);
    }
    
    drawPieces();
};

