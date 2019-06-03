cameraDrawList.push({ f: () => drawTiles(), lay: 99 });
resetList.push({ f: () => resetTiles() });

var worldGridCurrent = [];

function resetTiles() {
    worldGridCurrent = [];
    worldGridCurrent = worldGridConstant.map(function(arr) {
        return arr.slice();
    });
}

function drawTiles() {
    for (var j = 0; j < MAP_ROWS; j++) {
        for (var k = 0; k < MAP_COLS; k++) {
            for (var i in mapTileList) {
                if (worldGridCurrent[j][k] == mapTileList[i].code) {
                    var image = mapTileList[i].image;
                    if (image.startsWith("RECT:")){
                        drawRect(gridToPixelX(k), gridToPixelY(j), TILE_W-1, TILE_H-1, image.substring(5, image.length));
                    } else {
                        // console.log(window[image].width);
                        drawImage(window[image], gridToPixelX(k) + TILE_W / 2, gridToPixelY(j) + TILE_H / 2, 0, TILE_W/window[image].width, TILE_H/window[image].height);
                    }
                }
            }
        }
    }
}

function gridToIndex(col, row) {
    return col + MAP_COLS * row;
}

function gridToPixelX(col) {
    return col * TILE_W;
}

function gridToPixelY(row) {
    return row * TILE_H;
}

function pixelToGridX(x) {
    return Math.floor(x / TILE_W);
}

function pixelToGridY(y) {
    return Math.floor(y / TILE_H);
}

function pixelToTile(x, y) {
    //checks if in map
    if (x >= 0 && x < MAP_COLS*TILE_W &&
        y >= 0 && y < MAP_ROWS*TILE_H) {
        return worldGridCurrent[pixelToGridY(y)][pixelToGridX(x)];
    } else {
        //false if tile is outside map
        return false;
    }
}

function findTile(find, replace) {
    for(var j=0;j<MAP_ROWS;j++) { 
        for(var k=0;k<MAP_COLS;k++) { 

             if(worldGridCurrent[j][k] == mapTileList[find].code) {

                worldGridCurrent[j][k] = mapTileList[replace].code;

                return {x: gridToPixelX(k), y: gridToPixelY(j)}
            }
        }
    }
}