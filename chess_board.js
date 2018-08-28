var SEMI_BRD_ORIENT = [0,0,0,0,0,0] //0-normal, 1- 90 deg rot, 2- 180 deg rot, 3- 270 deg rot
//SEMI_BRD (semi boards) are  0  1
//              2  3
//              4  5

var SEMI_BRD_DIM = 300,
    BLOCK_SIZE = SEMI_BRD_DIM/5,
    PIECE_SIZE = 100 ;

var origin =
{
    "x": 1.7*SEMI_BRD_DIM,
    "y": 3*SEMI_BRD_DIM/5
};

///////////////////////////////  POSITION AND STATE OF PIECES  /////////////////////////////////

var json =
{
    "white":
    [
        {
            "imgPos": 0,
            "piece": "ROOK",
            "row": 0,
            "col": 0,
            "in_play": true
        },
        {
            "imgPos": 2,
            "piece": "BISHOP",
            "row": 0,
            "col": 2,
            "in_play": true
        },
        {
            "imgPos": 3,
            "piece": "KING",
            "row": 0,
            "col": 3,
            "in_play": true
        },
        {
            "imgPos": 1,
            "piece": "KNIGHT",
            "row": 1,
            "col": 0,
            "in_play": true
        }
    ],
    "black":
    [
        {
            "imgPos": 0,
            "piece": "ROOK",
            "row": 5,
            "col": 0,
            "in_play": true
        },
        {
            "imgPos": 2,
            "piece": "BISHOP",
            "row": 5,
            "col": 2,
            "in_play": true
        },
        {
            "imgPos": 3,
            "piece": "KING",
            "row": 5,
            "col": 3,
            "in_play": true
        },
        {
            "imgPos": 1,
            "piece": "KNIGHT",
            "row": 5,
            "col": 11,
            "in_play": true
        }
    ]
};

//////////////////////  Drawing pieces  ///////////////////////////////

function getImageCoords(pieceCode, bBlackTeam) {

    var imageCoords =  {
        "x": pieceCode * PIECE_SIZE,
        "y": (bBlackTeam ? PIECE_SIZE : 0)
    };

    return imageCoords;
}

function drawPiece(curPiece, bBlackTeam)
{
    var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

    var imageCoords = getImageCoords(curPiece.imgPos, bBlackTeam);

    var piece_img = new Image();

    piece_img.onload = function() {

    //Doesn't draw killed pieces
    if(curPiece.col === -1 && curPiece.row === -1) return 0;

    ctx.drawImage(piece_img,imageCoords.x, imageCoords.y,
        PIECE_SIZE, PIECE_SIZE,
        curPiece.col * BLOCK_SIZE + origin.x + 3, curPiece.row * BLOCK_SIZE + origin.y + 3,
        BLOCK_SIZE - 6 , BLOCK_SIZE - 6);
    };
    piece_img.src = "pieces.png";
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
    var canvas = document.getElementById("canvas");

    for (var i = 0; i < 6; i++) {
        drawSemiBoard(i);
    }

    drawPieces();

    //canvas.addEventListener('click',board_click,false);
};

/////////////////   CHESS MOVES   ////////////////////

function ifValidMove(prevbx,prevby,bx,by){
  var rowsDiff , colsDiff;

  rowsDiff = Math.abs(by - prevby);
  colsDiff = Math.abs(bx - prevbx);

  if(rowsDiff === 0 && colsDiff === 0){
      return 0;
  }   

  if(jsonindex === 0){
    //ROOK MOVEMENT

    if(!(rowsDiff === 0 ) != !(colsDiff === 0))
    { 
      if(rowsDiff === 0)   // Belongs to same row
      {
        for(i=0;i<4;i++)    
        {
          if(json.white[i].row === by) 
            if(bx > prevbx &&  (json.white[i].col>prevbx && json.white[i].col<bx)) 
            {
              alert("can't move there");
              return -1;
            }
            else if(bx < prevbx &&  (json.white[i].col<prevbx && json.white[i].col>bx))
            {
              return -1;
            }
          if(json.black[i].row === by)
            if(bx > prevbx &&  (json.black[i].col>prevbx && json.black[i].col<bx)) 
            {
              alert("can't move there");
              return -1;
            }
            else if(bx < prevbx &&  (json.black[i].col<prevbx && json.black[i].col>bx))
            {
              return -1;
            }
        }
      }   
      else if(colsDiff === 0)   // Belongs to same column
      {
        for(i=0;i<4;i++)    
        {
          if(json.white[i].col === bx)
            if(by > prevby &&  (json.white[i].row>prevby && json.white[i].row<by)) 
            {
              alert("can't move there");
              return -1;
            }
            else if(by < prevby &&  (json.white[i].row<prevby && json.white[i].row>by))
            {
              alert("can't move there");
              return -1;
            }
          if(json.black[i].col === bx)
          {
            if(by > prevby &&  (json.black[i].row>prevby && json.black[i].row<by)) 
            {
              alert("can't move there");
              return -1;
            }
            else if(by < prevby &&  (json.black[i].row<prevby && json.black[i].row>by))
            {
              alert("can't move there");
              return -1;
            }
          }
        }
      }
      else return 1;
    }   
    else
    {
      alert("go fuck yourself");
      return -1;
    } 
  }  
  else if(jsonindex === 1){
    //BISHOP MOVEMENT
    if(rowsDiff === colsDiff)
    {
      for(i=0;i<4;i++)
      {
        if(i === 1) continue;
        if( (json.white[i].col - prevbx) * (bx - prevbx)/colsDiff === (json.white[i].row - prevby) *  (by - prevby)/rowsDiff
            && (json.white[i].col - prevbx) * (bx - prevbx)/colsDiff < colsDiff && (json.white[i].row - prevby) *  (by - prevby)/rowsDiff < rowsDiff )
        {
         alert("can't move there");
         return -1;
        }
        if( (json.black[i].col - prevbx) * (bx - prevbx)/colsDiff === (json.black[i].row - prevby) *  (by - prevby)/rowsDiff
            && (json.black[i].col - prevbx) * (bx - prevbx)/colsDiff < colsDiff && (json.black[i].row - prevby) *  (by - prevby)/rowsDiff < rowsDiff )
        {
         alert("can't move there");
         return -1;
        }
      }
      return 1;
    }
    else return -1;
  }
  else if (jsonindex === 2){
    //KING MOVEMENT
    if(rowsDiff*colsDiff <= 1)
      return 1;
    else return -1;
  }
  else if(jsonindex === 3){
    //KNIGHT MOVEMENT
    if((rowsDiff === 2 && colsDiff ===1)||(rowsDiff === 1 && colsDiff === 2))
      return 1;
    else return -1;
  }
}

//////////////////////////////////////////
///////////////////////////////////////

var move = 0,
    clickodd = 0;

var prevbx = null, prevby = null;

var jsonindex = null;

function onclickinit(){
  $("#chess").on("click", function (event){

  var x = event.clientX;
  var y = event.clientY;

  var canvas = document.getElementById("chess");
  var ctx = canvas.getContext('2d');

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  bx = Math.floor((x- origin.x )/BLOCK_SIZE);     //block ka column nmbr, starts from 0,0
  by = Math.floor((y- origin.y)/BLOCK_SIZE);     //block ka row nmbr

  // Checking if selection is outside the bard
    if(bx<0 || bx>14 || by<0 || by>9)
    {
        return -1;
    }

  if(move===0)               //White ka move hai
  {

    if(clickodd === 0 )      //first time click
    {
      for(i=0;i<4;i++)
      {
        if(json.white[i].row === by && json.white[i].col === bx)      //if its his own piece
        {
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.rect(origin.x+bx*BLOCK_SIZE+5,origin.y+by*BLOCK_SIZE+5,BLOCK_SIZE-10,BLOCK_SIZE- 10);
          ctx.strokeStyle = 'black';          //highlight
          ctx.stroke();

          clickodd = 1;
          prevbx = bx; prevby = by;
          break;
        }
      }
      jsonindex = i;
    }

    else if (clickodd === 1)
    {
      //check if valid move first
      if(ifValidMove(prevbx,prevby,bx,by) === 0)
      {
        //now check if same piece is se
        //deselect
        removeSelection();
        clickodd = 0;
        return 0;
      }else if(ifValidMove(prevbx,prevby,bx,by) === -1)
      {
        //invalid move
        return -1;
      }

      //now check if wall

    //  var canMove = WallCheck(prevby,prevbx,by,bx,jsonindex);






    //now check if his own piece

    for(i=0;i<4;i++)
    {
       if(json.white[i].row == by && json.white[i].col == bx)
       {
         alert("can't move there");
         return 0;
       }
    }

    //check if enemy piece

    for(i=0;i<4;i++)
    {
        if(json.black[i].row == by && json.black[i].col == bx)
        {
          json.black[i].row = -1;
          json.black[i].col = -1;     //That piece captured
          break;
        }
    }

      //finally a valid move no wall and no other piece there
    json.white[jsonindex].row = by;
    json.white[jsonindex].col = bx;

    drawBoard();

    clickodd = 0;
    move = 1;         //black ka move aayga
    }
  }

  else if (move == 1)         //Its black ka move
  {

    if(clickodd == 0 )      //first time click
    {
      for(i=0;i<4;i++)
      {
        if(json.black[i].row == by && json.black[i].col == bx)      //if its his own piece
        {
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.rect(origin.x+bx*BLOCK_SIZE+5,origin.y+by*BLOCK_SIZE+5,BLOCK_SIZE-10,BLOCK_SIZE- 10);
          ctx.strokeStyle = 'black';          //highlight
          ctx.stroke();

          clickodd = 1;
          prevbx = bx; prevby = by;
          break;
        }
      }
      jsonindex = i;
    }

    else if (clickodd == 1)
    {
      //check if valid move first
      if(ifValidMove(prevbx,prevby,bx,by) === 0)
      {
        //now check if his own piece
        //deselect
        removeSelection();
        clickodd = 0;
        return 0;
      }else if(ifValidMove(prevbx,prevby,bx,by) === -1)
      {
        //invalid move
        return -1;
      }

      //now check if wall

      //var canMove = WallCheck(prevby,prevbx,by,bx,jsonindex);


    //now check if his own piece

    for(i=0;i<4;i++)
    {
       if(json.black[i].row == by && json.black[i].col == bx)
       {
         alert("can't move there");
         return 0;
       }
    }

      //check if enemy piece

      for(i=0;i<4;i++)
      {
        if(json.white[i].row == by && json.white[i].col == bx)
        {
          json.white[i].row = -1;
          json.white[i].col = -1;     //That piece captured
          break;
        }
      }

      //finally a valid move no wall and no other piece there

      json.black[jsonindex].row = by;
      json.black[jsonindex].col = bx;

      clickodd = 0;
      move = 0;         //white ka move  aayga
      drawBoard();
          }}


}  );


}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
////////////////SUHAS/////////////////////////


function getPieceAtBlockForTeam(teamOfPieces, clickedBlock) {

    var curPiece = null,
        iPieceCounter = 0,
        pieceAtBlock = null;

    for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {
        curPiece = teamOfPieces[iPieceCounter];
        if (curPiece.status === IN_PLAY &&
                curPiece.col === clickedBlock.col &&
                curPiece.row === clickedBlock.row)
        {
            pieceAtBlock = curPiece;
            iPieceCounter = teamOfPieces.length;
        }
    }

    return pieceAtBlock;
}

function selectPiece(pieceAtBlock) {
    // Draw outline
    ctx.lineWidth = SELECT_LINE_WIDTH;
    ctx.strokeStyle = HIGHLIGHT_COLOUR;
    ctx.strokeRect((pieceAtBlock.col * BLOCK_SIZE) + SELECT_LINE_WIDTH + SEMI_BRD_DIM/2 + 3 ,
        (pieceAtBlock.row * 3*BLOCK_SIZE/2) + SELECT_LINE_WIDTH + SEMI_BRD_DIM/4 + 3,
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2) - 6,
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2) - 6) ;

    selectedPiece = pieceAtBlock;
}

function checkIfPieceClicked(clickedBlock) {
    var team = BLACK ? json.black : json.white;
    var pieceAtBlock = getPieceAtBlockForTeam(team,clickedBlock);

    if (pieceAtBlock !== null) {
        selectPiece(pieceAtBlock);
    }
}

function removeSelection() {
    // drawBlock(selectedPiece.col, selectedPiece.row);

    drawPieces();
}

function processMove(clickedBlock) {
    var team = BLACK ? json.black : json.white;
    var pieceAtBlock = getPieceAtBlockForTeam(team,clickedBlock);

    var possible = checkWall(clickedBlock);

    if(clickedBlock.col != null && clickedBlock.row != null){
         if (pieceAtBlock !== null) {
            removeSelection(selectedPiece);
            checkIfPieceClicked(clickedBlock);
        }
        else if( possible === 1 ){
            movePiece(clickedBlock);
        }
        else{
            alert("Wall is Blocking");
            removeSelection(selectedPiece);
        }
    }
    else{
        removeSelection(selectedPiece);
        selectedPiece = null;
    }
}

function movePiece(clickedBlock) {
    // Clear the block in the original position
    // drawBlock(selectedPiece.col, selectedPiece.row);

    var team = BLACK ? json.black : json.white ;

    team[selectedPiece.piece].col = clickedBlock.col;
    team[selectedPiece.piece].row = clickedBlock.row;
    // Draw the piece in the new position
    // drawPiece(selectedPiece, !clickedBlock);
    drawGame();

    selectedPiece = null;
}

// function board_click(ev) {
//       var canvas = document.getElementById("chess");
//       var ctx = canvas.getContext('2d');

//     if (allow_execution === 1) {
//        var x = ev.clientX - canvas.offsetLeft,
//             y = ev.clientY - canvas.offsetTop,
//             clickedBlock = screenToBlock(x, y);

//         if (selectedPiece === null) {
//             checkIfPieceClicked(clickedBlock);
//         }
//         else {
//             processMove(clickedBlock);
//         }
//     }
//     else{
//         var team = BLACK ? json.black : json.white;
//         setRemainingPositions(team);
//         printThePositions(team);
//         alert("gameover");
//     }
// }




/////////////////////////   ROTATE BOARD FUNCTION  ///////////////////////
var firstInBoard=[[0,0],[5,0],[0,5],[5,5],[0,10],[5,10]];

function rotate(id) {
      SEMI_BRD_ORIENT[id]=(SEMI_BRD_ORIENT[id]+1)%4;
      console.log(SEMI_BRD_ORIENT);

      for(i=0;i<4;i++)
      {
          if(json.white[i].row>=firstInBoard[id][0] && json.white[i].row<firstInBoard[id][0]+5 && json.white[i].col>=firstInBoard[id][1]  && json.white[i].col<firstInBoard[id][1]+5)
          {
              var old_row=json.white[i].row%5;
              // console.log(old_row);
              json.white[i].row=firstInBoard[id][0] + ((json.white[i].col)%5);
              json.white[i].col=firstInBoard[id][1] + ( 4 - old_row);

          }
          console.log(json.white[i].row,json.white[i].col);
      }
      for(i=0;i<4;i++)
      {

          if(json.black[i].row>=firstInBoard[id][0] && json.black[i].row<firstInBoard[id][0]+5 && json.black[i].col>=firstInBoard[id][1]  && json.black[i].col<firstInBoard[id][1]+5)
          {
              var old_row=json.black[i].row%5;
              json.black[i].row=firstInBoard[id][0] + ((json.black[i].col)%5);
              json.black[i].col=firstInBoard[id][1] + ( 4 - old_row );
          }
          console.log(json.black[i].row,json.black[i].col);
      }

      drawBoard();
}
