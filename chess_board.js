var SEMI_BRD_ORIENT = [0,0,0,0,0,0] //0-normal, 1- 90 deg rot, 2- 180 deg rot, 3- 270 deg rot
//SEMI_BRD (semi boards) are  0  1
//              2  3
//              4  5

var SEMI_BRD_DIM = 300,
    BLOCK_SIZE = SEMI_BRD_DIM/5,
    PIECE_SIZE = 100 ;

var origin =
{
    "x": SEMI_BRD_DIM/4,
    "y": SEMI_BRD_DIM/8
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
        },
        {
            "imgPos": 2,
            "piece": "BISHOP",
            "row": 2,
            "col": 0,
        },
        {
            "imgPos": 3,
            "piece": "KING",
            "row": 5,
            "col": 0,
        },
        {
            "imgPos": 1,
            "piece": "KNIGHT",
            "row": 8,
            "col": 0,
        }
    ],
    "black":
    [
        {
            "imgPos": 0,
            "piece": "ROOK",
            "row": 3,
            "col": 14,
        },
        {
            "imgPos": 2,
            "piece": "BISHOP",
            "row": 5,
            "col": 14,
        },
        {
            "imgPos": 3,
            "piece": "KING",
            "row": 7,
            "col": 14,
        },
        {
            "imgPos": 1,
            "piece": "KNIGHT",
            "row": 5,
            "col": 11,
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

function removeSelection() {
    // drawBlock(selectedPiece.col, selectedPiece.row);

    drawPieces();
}

///////////////////////    DRAWING BOARD   //////////////////////

function drawSemiBoard(board_no) {
    var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var img = new Image();

    var x = Math.floor(board_no/2);
    var y = board_no%2;

    img.onload = function() {
    ctx.drawImage(img,x*SEMI_BRD_DIM + origin.x,y*SEMI_BRD_DIM + origin.y,SEMI_BRD_DIM,SEMI_BRD_DIM);
    
    drawPieces();
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
};

/////////////////   CHESS MOVES VALIDITY   ////////////////////

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
            && (json.white[i].col - prevbx) * (bx - json.white[i].col) > 0 && (json.white[i].row - prevby) * (by - json.white[i].row) > 0 )
        {
         alert("can't move there");
         return -1;
        }
        if( (json.black[i].col - prevbx) * (bx - prevbx)/colsDiff === (json.black[i].row - prevby) *  (by - prevby)/rowsDiff
            && (json.black[i].col - prevbx) * (bx - json.black[i].col) > 0 && (json.black[i].row - prevby) * (by - json.black[i].row) > 0 )
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
    if(rowsDiff*colsDiff <= 1 && Math.abs(rowsDiff- colsDiff) <=1 )
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

//////////////////////////////////////////////////
//////////////////// YASH TOPPER ///////////////////

var move = 1,   //0-black's move, 1-white's move
    clickodd = 0,
    hadRotPrev = [0,0]; //Had Rotated Previously, 0-false 1-true

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

  if(move===1)               //White ka move hai
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

      //now check if his own piece

      for(i=0;i<4;i++)
      {
         if(json.white[i].row == by && json.white[i].col == bx)
         {
           alert("can't move there own piece");
           return 0;
         }
      }

        //now check if wall

      var canMove = WallCheck(prevby,prevbx,by,bx,jsonindex);

      if(canMove == 1)
      {
            //check if enemy piece

      for(i=0;i<4;i++)
      {
          if(json.black[i].row == by && json.black[i].col == bx)
          {
            json.black[i].row = -1;
            json.black[i].col = -1;     //That piece captured
            
            calcScore(i,1);

            break;
          }
      }

        //finally a valid move no wall and no other piece there
      json.white[jsonindex].row = by;
      json.white[jsonindex].col = bx;

      if(checkIfCheck(jsonindex,1) ===  1) alert("Check MF");

      drawBoard();

      hadRotPrev[move] = 0;

      clickodd = 0;
      move = 0;         //black ka move aayga

      }
    }
  }

  else if (move == 0)         //Its black ka move
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
      
      //now check if his own piece

      for(i=0;i<4;i++)
      {
         if(json.black[i].row == by && json.black[i].col == bx)
         {
           alert("can't move there");
           return 0;
         }
      }

      
      //now check if wall
      var canMove = WallCheck(prevby,prevbx,by,bx,jsonindex);


      if(canMove)
      {
        //check if enemy piece

        for(i=0;i<4;i++)
        {
          if(json.white[i].row == by && json.white[i].col == bx)
          {
            json.white[i].row = -1;
            json.white[i].col = -1;     //That piece captured

            calcScore(i,0);
            break;
          }
        }

        //finally a valid move no wall and no other piece there

        json.black[jsonindex].row = by;
        json.black[jsonindex].col = bx;

        if(checkIfCheck(jsonindex,0)===1) alert("Check MF");

        hadRotPrev[move] = 0;

        clickodd = 0;
        move = 1;         //white ka move  aayga

        drawBoard();

      }  
    }
  }

}  );

}

//////////////////////   SCORE BOARD  //////////////////

var SCORE = [0,0];
//  SCORE[0] -BLACK ; SCORE[1] -WHITE

function calcScore(i,isWhite){
// King : 70 ; Knight : 40 ; Bishop : 35 ; Rook : 35. 
  if(i === 0)
  {
    //ROOK
    SCORE[isWhite] += 135;
  }
  else if(i === 1)
  {
    //BISHOP
    SCORE[isWhite] += 135;
  }
  else if(i === 2)
  {
    //KING
    SCORE[isWhite] += 170;  
  }
  else if(i === 3)
  {
    //KNIGHT
    SCORE[isWhite] += 140;  
  }
  if(isWhite)
  {
    var w_s = document.getElementById('white_score');
    w_s.innerHTML = SCORE[1];
    console.log(SCORE[1]);
  }
  else 
  {
    var b_s = document.getElementById('black_score');
    b_s.innerHTML = SCORE[0];
    console.log(SCORE[0]);   
  }
}

/////////////////////////  CHECK IF CHECK  //////////////////////////

function checkIfCheck(jsonindex,isWhite)
{
  if(isWhite)  //White moved
  {
    //check if valid move first
    // if(ifValidMove(json.white[jsonindex].col,json.white[jsonindex].row,json.black[2].col,json.black[2].row) === 0)
    // {
    //   //now check if same piece is se
    //   //deselect
    //   return 0;
    if(ifValidMove(json.white[jsonindex].col,json.white[jsonindex].row,json.black[2].col,json.black[2].row) === -1)
    {
      //invalid move
      return -1;
    }

    //Wall
    if(WallCheck(json.white[jsonindex].row,json.white[jsonindex].col,json.black[2].row,json.black[2].col,jsonindex) === 1)
    return 1;
  }
  else  //Black moved
  {
    //check if valid move first
    // if(ifValidMove(json.black[jsonindex].col,json.black[jsonindex].row,json.white[2].col,json.white[2].row) === 0)
    // {
    //   //now check if same piece is se
    //   //deselect
    //   return 0;
    if(ifValidMove(json.black[jsonindex].col,json.black[jsonindex].row,json.white[2].col,json.white[2].row) === -1)
    {
      //invalid move
      return -1;
    }

    //Wall
    if(WallCheck(json.black[jsonindex].row,json.black[jsonindex].col,json.white[2].row,json.white[2].col,jsonindex) === 1)
    return 1;
  }
}

/////////////////////////   ROTATE BOARD FUNCTION  ///////////////////////

var firstInBoard=[[0,0],[5,0],[0,5],[5,5],[0,10],[5,10]];

function rotate(id) {
    if(hadRotPrev[move] === 0)
    if(!( (Math.floor(json.white[2].col/5)===Math.floor(id/2) && Math.floor(json.white[2].row/5)===id%2) || (Math.floor(json.black[2].col/5)===Math.floor(id/2)
        && Math.floor(json.black[2].row/5)===id%2) )) 
    {
        SEMI_BRD_ORIENT[id]=(SEMI_BRD_ORIENT[id]+1)%4;

        for(i=0;i<4;i++)
        {
            if(json.white[i].row>=firstInBoard[id][0] && json.white[i].row<firstInBoard[id][0]+5 && json.white[i].col>=firstInBoard[id][1]  && json.white[i].col<firstInBoard[id][1]+5)
            {
                var old_row=json.white[i].row%5;
                json.white[i].row=firstInBoard[id][0] + ((json.white[i].col)%5);
                json.white[i].col=firstInBoard[id][1] + ( 4 - old_row);

            }
            //console.log(json.white[i].row,json.white[i].col);
        }
        for(i=0;i<4;i++)
        {

            if(json.black[i].row>=firstInBoard[id][0] && json.black[i].row<firstInBoard[id][0]+5 && json.black[i].col>=firstInBoard[id][1]  && json.black[i].col<firstInBoard[id][1]+5)
            {
                var old_row=json.black[i].row%5;
                json.black[i].row=firstInBoard[id][0] + ((json.black[i].col)%5);
                json.black[i].col=firstInBoard[id][1] + ( 4 - old_row );
            }
            //console.log(json.black[i].row,json.black[i].col);
        }

        hadRotPrev[move] = 1;      
        
        move = (move+1)%2;
        clickodd = 0;

        drawBoard();
    }

}


/////////////////////////  WALL CHECK FUNCTION  /////////////////////////

function WallCheck(prby,prbx,fby,fbx,jsindex)
{

    
     var canvas = document.getElementById('chess');
    var ctx = canvas.getContext('2d');

  var len;
  if(jsindex===0)  //ROOK
  {

    if(prbx>fbx)
    {
      var imgData = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2,origin.y +  (fby)*BLOCK_SIZE+BLOCK_SIZE/2, (prbx-fbx)*BLOCK_SIZE, 1);
      len = prbx-fbx;
    }
    else if(prby>fby)
    {
      var imgData = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2,origin.y+ (fby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (prby-fby)*BLOCK_SIZE);
      len = prby-fby;
    }
    else if(fbx>prbx)
    {
      var imgData = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, (fbx-prbx)*BLOCK_SIZE, 1);
      len = fbx-prbx;
    }
    else if(fby>prby)
    {
      var imgData = ctx.getImageData(origin.x +(prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (fby-prby)*BLOCK_SIZE);
      len = fby-prby;
    }

    if(len>0)
    {  
      var data = imgData.data;

      for (var i = 0; i < data.length; i += 4) 
      { // look at all pixels
              
              if (data[i] == 255 && data[i + 1] == 0 && data[i + 2] == 0) 
              { // red
                  
                  alert("wall therefore you can't move there");
                  return(0);
                  break;
              }
      }
    }
    
    return(1);
  }

  if(jsindex===1)      //BISHOP
  {
      if(fbx===prbx && fby===prby)      //no wall found recurse back
      {
            return(1);
      }  
    if(fbx>prbx && fby>prby)          //move to right bottom
    {

      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (prbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby+1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data4.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1 === 1 && p2 === 1)
      {
        alert("wall therefore can't move");
        return(0);
      }
      return(WallCheck(prby+1,prbx+1,fby,fbx,jsindex));
              
    }

    
    else if(fbx>prbx && fby<prby)      //move to right top
    {
      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (prbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }

      return(WallCheck(prby-1,prbx+1,fby,fbx,jsindex));

    }

    else if(prbx>fbx && prby>fby)      //move to left top
    {
      var imgData1 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      var imgData2 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (fbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data4.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1 === 1 && p2 === 1)
      {
        alert("wall therefore can't move");
        return(0);
      }
      console.log("WallCheck: "+" "+prby+" "+prbx+" "+fby+" "+fbx);
      x=WallCheck(prby-1,prbx-1,fby,fbx,jsindex);
      console.log(x);
      return(x);

    }

    else if(fbx<prbx && fby>prby)      //move to left bottom
    {
      var imgData1 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (fbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }

      return(WallCheck(prby,prbx,fby-1,fbx+1,jsindex));

    }    


  }

  if(jsindex===2)      //KING
  {
    if(prbx>fbx && prby == fby)
    {
      var imgData = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2,origin.y +  (fby)*BLOCK_SIZE+BLOCK_SIZE/2, (prbx-fbx)*BLOCK_SIZE, 1);
      len = prbx-fbx;
    }
    else if(prby>fby && prbx==fbx)
    {
      var imgData = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2,origin.y+ (fby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (prby-fby)*BLOCK_SIZE);
      len = prby-fby;
    }
    else if(fbx>prbx && prby==fby)
    {
      var imgData = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, (fbx-prbx)*BLOCK_SIZE, 1);
      len = fbx-prbx;
    }
    else if(fby>prby && prbx==fbx)
    {
      var imgData = ctx.getImageData(origin.x +(prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (fby-prby)*BLOCK_SIZE);
      len = fby-prby;
    }

    if(len>0)
    {
      var data = imgData.data;
      for (var i = 0; i < data.length; i += 4) 
      { // look at all pixels
                 
            if (data[i] == 255 && data[i + 1] == 0 && data[i + 2] == 0) 
            { // red
                
                alert("wall therefore you can't move there");
                return(0);
                break;
            }
      }
      return 1;

    }

    if(fbx>prbx && fby>prby)          //move to right bottom
    {
      

      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (prbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby+1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }
      else return(1);     //no wall
      

              
    }

    
    else if(fbx>prbx && fby<prby)      //move to right top
    {

       

      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (prbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }

      else return 1;

    }

    else if(prbx>fbx && prby>fby)      //move to left top
    {
      var imgData1 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 =  ctx.getImageData(origin.x + (fbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 =  ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }

      else return 1;

    }

    else if(prbx>fbx && prby<fby)      //move to left bottom
    {
      var imgData1 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE, 1);
      var imgData2 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData3 = ctx.getImageData(origin.x + (fbx+1)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2,1, BLOCK_SIZE);
      var imgData4 = ctx.getImageData(origin.x + (fbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (fby-1)*BLOCK_SIZE+BLOCK_SIZE/2, BLOCK_SIZE,1);
      
      var data1 = imgData1.data;
      var data2 = imgData2.data;
      var data3 = imgData3.data;
      var data4 = imgData4.data;


      var p1 = 0; //condition for no wall
      var p2 = 0; 

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                p1 = 1;
                break;
              }
      }

      for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data4[i] == 255 && data4[i + 1] == 0 && data4[i + 2] == 0) 
              {
                p2 = 1;
                break;
              }
      }

      if(p1==1 && p2 ==1)
      {
        alert("wall therefore can't move");
        return(0);
      }

      else return 1; //can move

    }

  }


  if(jsindex==3)      //KNIGHT
  {
    if(Math.abs(fbx-prbx) === 1)
    { 
      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (fby-prby)/2*BLOCK_SIZE);
      var imgData2 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby+(fby-prby)/2)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (fby-prby)/2*BLOCK_SIZE);
      var imgData3 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby+(fby-prby))*BLOCK_SIZE+BLOCK_SIZE/2, (fbx-prbx)*BLOCK_SIZE, 1);
    }
    else if(Math.abs(fbx-prbx) === 2)
    {
      var imgData1 = ctx.getImageData(origin.x + (prbx)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, (fbx-prbx)/2*BLOCK_SIZE, 1);
      var imgData2 = ctx.getImageData(origin.x + (prbx+(fbx-prbx)/2)*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, (fbx-prbx)/2*BLOCK_SIZE, 1);
      var imgData3 = ctx.getImageData(origin.x + (prbx+(fbx-prbx))*BLOCK_SIZE+BLOCK_SIZE/2, origin.y + (prby)*BLOCK_SIZE+BLOCK_SIZE/2, 1, (fby-prby)*BLOCK_SIZE);
    }  
    var data1 = imgData1.data;
    var data2 = imgData2.data;
    var data3 = imgData3.data;

    var noOfWalls =0;    
    for (var i = 0; i < data1.length; i += 4) 
      { // look at all pixels
              
              if (data1[i] == 255 && data1[i + 1] == 0 && data1[i + 2] == 0) 
              {
                noOfWalls++;
                break;
              }
      }
    for (var i = 0; i < data2.length; i += 4) 
      { // look at all pixels
              
              if (data2[i] == 255 && data2[i + 1] == 0 && data2[i + 2] == 0) 
              {
                noOfWalls++;
                break;
              }
      }
    for (var i = 0; i < data3.length; i += 4) 
      { // look at all pixels
              
              if (data3[i] == 255 && data3[i + 1] == 0 && data3[i + 2] == 0) 
              {
                noOfWalls++;
                break;
              }
      }

    if(noOfWalls <= 1)
      return 1;
    else 
      return 0;
  }
  
}

///////////////////////   END  GAME BY SUHAS THE TOPPER   ///////////////////////////

function endgame(piece){
  alert(" The Game Ends ");
  var winner = piece ? "White" : "Black" ;
  var myWindow = window.open("end.html", "_self");
  myWindow.document.write("<h2> The Winner is " + winner + "</h2>" + "<p>Scores are <ul><li>WHITE : " + SCORE[1] + "</li><li>BLACK : " + SCORE[0] + "</li></ul> ");

}

//////////////  TIMER  ////////////////////////

var TIME = 60 ;
var seconds_left_Black = TIME;
var seconds_left_White = TIME;

function BlackTimer() {
  
  console.log("black");
  var interval = setInterval(function() {
    if (move == 1) {
      WhiteTimer();
      clearInterval(interval);
    }
    document.getElementById('BlackTime').innerHTML = seconds_left_Black ;
    if (seconds_left_Black <= 0)
    {
       document.getElementById('BlackTime').innerHTML = " 0 ";
       clearInterval(interval);
    }
    seconds_left_Black -= 1/2;

}, 1000);
}

function WhiteTimer() {  
  console.log("white");
  var interval = setInterval(function() {
    if (move == 0) {
      BlackTimer();
      clearInterval(interval);
    }
    document.getElementById('WhiteTime').innerHTML = seconds_left_White ;
    if (seconds_left_White <= 0 )
    {
       document.getElementById('WhiteTime').innerHTML = " 0 ";
       clearInterval(interval);
    }
    seconds_left_White -= 1/2;
}, 1000);
} 

/////////////////////////////////////////
///////////SUHAS THE TOPPER//////////////
/////////////////////////////////////////
