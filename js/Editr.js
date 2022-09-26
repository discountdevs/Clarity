// Abandon hope, all ye who enter here

function init() {
    createHiDPICanvas = function () {
        let cv = document.createElement("canvas");
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        cv.style.width = window.innerWidth + "px";
        cv.style.height = window.innerHeight + "px";
        cv.id = "editrCanvas";
        return cv;
    }

    readjustCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        game.set_viewport(canvas.width, canvas.height);
    }

    generate_block_selectors = function () {

        var tileBar = document.querySelector("#tileSelectBar");
        tileBar.innerHTML = "";
        var order = window.map.display_order;
        var keys = [];

        order.forEach(orderNum => {
            keys.push(window.map.keys[orderNum])
        })

        keys.forEach(tile => {
            if (tile.blockname) {
                if (tile.img) {
                    var base64img = game.current_map.textures[tile.img];
                    var htmlImg = `
                    <img src="{src}" class="tileOption unselected" onmouseover="tooltip('{tilename}', this);" onclick="select({id}, this);" onmouseleave="untooltip(this);" id="selectBlock{id}">
                    `.replace("{src}", base64img).replace("{id}", tile.id).replace("{id}", tile.id).replace("{tilename}", tile.blockname);
                    tileBar.innerHTML = tileBar.innerHTML + htmlImg;
                } else {
                    game.log("[Editr] Warning: Tile " + tile.blockname + " has no image, relying on colour only!");
                    // Draw the image using the colour
                    var htmlImg = `
                    <div class="tileOption unselected" style="background-color: {colour}" onmouseover="tooltip('{tilename}', this);" onclick="select({id}, this);" onmouseleave="untooltip(this);" id="selectBlock{id}"></div>
                    `.replace("{colour}", tile.colour).replace("{id}", tile.id).replace("{id}", tile.id).replace("{tilename}", tile.blockname);
                    tileBar.innerHTML = tileBar.innerHTML + htmlImg;
                }
            } else {
                game.log("[Editr] Warning: Tile " + tile.id + " has no name!");
            }
        });
    }

    regenerate_block_selectors = function () {
        generate_block_selectors();
        swal.fire ({
            title: "Success!",
            text: "Block selectors have been regenerated. If you are still experiencing desync between your mapvar and your block selectors, contact the Clarity discord for more information.",
            icon: "success",
            confirmButtonText: "Ok"
        });
    }

    //Create canvas with the device resolution.
    var canvas = createHiDPICanvas();
    ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    window.map = new Mapvar();
    window.game = new Clarity();
    game.set_viewport(canvas.width, canvas.height);
    game.load_map(window.map);
    generate_block_selectors();

    // User controls the viewport with WASD. Viewport shan't be limited.
    game.limit_viewport = false;

    canvas.addEventListener('mousemove', function (evt) {
        game.update_mouse(canvas, evt);
    }, false);

    canvas.addEventListener('mousedown', function (evt) {
        game.onClick(evt);
    });

    canvas.addEventListener('mouseup', function (evt) {
        game.onReleaseClick(evt);
    });

    window.addEventListener('resize', function () {
        readjustCanvas(canvas);
    }, false);


    var Loop = function () {
        ctx.fillStyle = '#111'; // Background colour
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw the game
        game.update();
        game.draw(ctx);
    };

    window.renderInterval = setInterval(Loop, 16.7);
}

init();

function tooltip(text, callobj) {
    document.querySelector("#tooltip").innerHTML = text;
}

function untooltip(callobj) {
    document.querySelector("#tooltip").innerHTML = window.map.keys[game.selectedTile].blockname;
}

function select(id, callobj) {
    game.selectedTile = id;
    // Set all other tiles in the select bar to unselected
    var tiles = document.querySelectorAll(".tileOption");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].className = "tileOption unselected";
    }
    callobj.className = "tileOption";
}

function saveToBrowser() {
    // Prompt the user for the level name
    Swal.fire({
        title: 'Save Level',
        input: 'text',
        inputLabel: 'Level Name',
        inputPlaceholder: 'Enter a name for the level',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Save the level to the browser
            localStorage.setItem("mapsave-" + result.value, LZString.compressToBase64(JSONfn.stringify(window.map)));
            game.log("[Editr] Saved map", "mapsave-" + result.value);
            Swal.fire({
                title: 'Level Saved!',
                text: 'Your level has been saved to the browser.',
                icon: 'success',
                confirmButtonText: 'Kewl'
            });
        }
    });
}

function loadFromBrowser() {
    // Pop up a list of all available mapvar saves
    var saves = [];
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("mapsave-")) {
            saves.push(localStorage.key(i).replace("mapsave-", ""));
        }
    }
    if (saves.length == 0) {
        Swal.fire({
            title: 'No Saves Found',
            text: 'No saves were found in your browser.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        Swal.fire({
            title: 'Load Level',
            input: 'select',
            inputOptions: saves,
            inputPlaceholder: 'Select a level to load',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to select something!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Load the level from the browser
                game.log("[Editr] Attempting to load mapsave-" + saves[result.value]);
                var jsonMap = JSONfn.parse(LZString.decompressFromBase64(localStorage.getItem("mapsave-" + saves[result
                    .value])));
                // Load the contents of jsonMap into window.map
                for (var key in jsonMap) {
                    window.map[key] = jsonMap[key];
                }
                game.log("[Editr] Got mapvar mapsave-" + saves[result.value]);
                game.load_map(window.map);
                Swal.fire({
                    title: 'Level Loaded!',
                    text: 'Your level has been loaded from the browser.',
                    icon: 'success',
                    confirmButtonText: 'Noice'
                });
            }
        });
    }
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        // Load the contents of the file into window.map
        game.log("[Editr] Attempting to load mapvar at " + file.name);
        window.map = {};
        var jsonMap = JSONfn.parse(contents);
        for (var key in jsonMap) {
            window.map[key] = jsonMap[key];
        }
        game.load_map(window.map);
        game.log("[Editr] Got mapvar at " + file.name);
        // Regenerate block selectors
        generate_block_selectors();
    };
    reader.readAsText(file);
};

function exportMapvar() {
    var new_data = [];
    var old_data = window.map.data;
    for (var i = 0; i < old_data.length; i++) {
        new_data.push([]);
        for (var j = 0; j < old_data[i].length; j++) {
            new_data[i].push(old_data[i][j].id);
        }
    }
    var backupData = window.map.data;
    window.map.data = new_data;
    var map = JSONfn.stringify(window.map);
    window.map.data = backupData;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(map));
    element.setAttribute('download', "New Mapvar.clarity");
    element.click();
}

function resize_map(x, y, fillid) {
    // Resize the map (can't use .length)
    var old_data = window.map.data;
    window.map.data = [];
    for (var i = 0; i < x; i++) {
        window.map.data.push([]);
        for (var j = 0; j < y; j++) {
            window.map.data[i].push(game.current_map.keys[fillid]);
        }
    }
    // Copy the old data into the new data
    for (var i = 0; i < old_data.length; i++) {
        for (var j = 0; j < old_data[i].length; j++) {
            if (i < x && j < y) {
                window.map.data[i][j] = old_data[i][j];
            }
        }
    }
    game.load_map(window.map);
}

function resize_map_prompt() {
    // Prompt the user for the id to fill with, x, and y
    Swal.fire({
        title: 'Resize Map',
        html: '<input type="number" id="fillid" class="swal2-input" placeholder="Fill ID (Optional)"><br>' +
            '<input type="number" id="x" class="swal2-input" placeholder="X">&nbsp;&nbsp;' +
            '<input type="number" id="y" class="swal2-input" placeholder="Y">',
        focusConfirm: false,
        showCancelButton: true,
        width: 600,
        preConfirm: () => {
            return {
                fillid: document.getElementById('fillid').value || 0,
                x: document.getElementById('x').value,
                y: document.getElementById('y').value
            }
        }
    }).then((result) => {
        var x = result.value.x;
        var y = result.value.y;
        var fillid = result.value.fillid;
        if (result.isConfirmed) {
            // Confirm the action
            Swal.fire({
                title: 'Resize Map',
                text: 'Are you sure you want to resize the map to ' + result.value.x + 'x' + result.value.y + '? This action is irreversible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, resize it!',
                cancelButtonText: 'No, nvm',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Resize the map
                    resize_map(x, y, fillid);
                }
            });
        }
    });
}

document.getElementById('actual-btn')
    .addEventListener('change', readSingleFile, false);

function openCustomiser() {
    // Opens a sweetalert2 modal with the mapvar customizer
    Swal.fire({
        title: 'Mapvar Customiser',
        html: `
        <div class="container" style="color:#fff">
            <p>
                Player Spawn Position (X, Y):  
                <input type="number" style="width: 30px;" id="spawn-pos-x" class="form-control" placeholder="Spawn Position (X)" value="${game.current_map.player.x}">
                <input type="number" style="width: 30px;" id="spawn-pos-y" class="form-control" placeholder="Spawn Position (Y)" value="${game.current_map.player.y}">
            </p>
            <p>
                <label for="player_color">Player Colour: </label>
                <input type="color" id="player_color" class="field-radio">
            </p>
            <p>
                <button class="swal2-cancel swal2-styled" onclick="resize_map_prompt()">Resize Map</button>
            </p>
            <p>
                <button class="swal2-cancel swal2-styled" onclick="regenerate_block_selectors()">Regenerate block selectors</button>
            </p>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Save',
        width: 1000,
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            var player_colour = document.getElementById("player_color").value;
            var player_spawn_x = document.getElementById("spawn-pos-x").value;
            var player_spawn_y = document.getElementById("spawn-pos-y").value;

            if (game.player_img) {
                // Warn the user that the image takes precedence over the colour
                Swal.fire({
                    title: 'Warning',
                    text: 'The player image takes precedence over the colour. Are you sure you want to continue and set the player colour?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, save it!',
                    cancelButtonText: 'No, don\'t.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Set the player colour
                        game.player.color = player_colour;
                        game.current_map.color = player_colour;                        
                        // Set spawnpoint
                        game.current_map.player.x = player_spawn_x;
                        game.current_map.player.y = player_spawn_y;
                        window.map.player.x = parseInt(player_spawn_x);
                        window.map.player.y = parseInt(player_spawn_y);
                    }
                });
            } else {
                game.current_map.player.colour = player_colour;
                game.player.colour = player_colour;
            }
        },
        didOpen: () => {
            document.getElementById('player_color').value = window.map.player.colour;
        },
    });
}