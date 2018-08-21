var SEMI_BRD_ORIENT = [0,0,0,0,0,0] //0-normal, 1- 90 deg rot, 2- 180 deg rot, 3- 270 deg rot 
//SEMI_BRD (semi boards) are  0  1
//              2  3
//              4  5

var SEMI_BRD_DIM = 300;

///////////////////////    DRAWING BOARD   //////////////////////

function drawSemiBoard(board_no) {
    var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

    var img = new Image();

    var x = board_no%2;
    var y = Math.floor(board_no/2);
    img.onload = function() {
    ctx.drawImage(img,x*SEMI_BRD_DIM + 2*SEMI_BRD_DIM,y*SEMI_BRD_DIM + 2*SEMI_BRD_DIM/5,SEMI_BRD_DIM,SEMI_BRD_DIM);
    };
    if(SEMI_BRD_ORIENT[board_no] === 0){
        img.src="./" + board_no + "/board_0.jpg";
    }else if(SEMI_BRD_ORIENT[board_no] === 1){
        img.src="./" + board_no + "/board_1.jpg";
    }else if (SEMI_BRD_ORIENT[board_no] === 2) {
        img.src="./" + board_no + "/board_2.jpg";
    }else{
        img.src="./" + board_no + "/board_3.jpg";
    }
};

function drawBoard(){
    for (var i = 0; i < 6; i++) {
        drawSemiBoard(i);
    }
};

function drawPiece(curPiece, bBlackTeam)
{
    ctx.drawImage(pieces, imageCoords.x, imageCoords.y, BLOCK_SIZE, BLOCK_SIZE, 
        curPiece.col * BLOCK_SIZE, curPiece.row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);                 
};


///////////////////////////////  POSITION AND STATE OF PIECES  /////////////////////////////////

function piecesInfo()
{
    json = 
    {
        "white": 
        [
            {
                "piece": ROOK,
                "row": 0,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": BISHOP,
                "row": 0,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": KING,
                "row": 0,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": KNIGHT,
                "row": 1,
                "col": 0,
                "status": IN_PLAY
            }
        ],
        "black": 
        [
            {
                "piece": ROOK,
                "row": 0,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": BISHOP,
                "row": 0,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": KING,
                "row": 0,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": KNIGHT,
                "row": 1,
                "col": 0,
                "status": IN_PLAY
            }
        ]       
    };
}


//////////////// Alterenate implementation
////// PIECE =[colour][x,y,inPlay];  2-d array
// var KING = [],
// KNIGHT = [],
// BISHOP = [],
// ROOK = [];

// for (var i = 0; i < 2; i++) { //0- black, 1- white
//     KING.push = [0,0,1];
//     KNIGHT.push = [0,0,1];
//     BISHOP.push = [0,0,1];
//     ROOK.push = [0,0,1];    
// }
