// Variables
let aimCanvas = new canvas('aim');
let cursor = new mouse();

// Setup
aimCanvas.setSize(800, 600);

// Run it !
run();

// Global Class
function canvas(canvasId) {

    // Canvas
    this.canvas = document.querySelector('#' + canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.centerLeft;
    this.centerTop;

    // Cursor
    this.cursorX = -50;
    this.cursorY = -50;
    this.cursorSound = [];

    // Game Settings
    this.currentView = "menu";
    this.mode;

    // Listener
    this.canvas.addEventListener('mousemove', function (e) {

        this.boundingClientRect = this.getBoundingClientRect();
        aimCanvas.cursorX = e.clientX - this.boundingClientRect.left;
        return aimCanvas.cursorY = e.clientY - this.boundingClientRect.top;

    })
    this.canvas.addEventListener('mousedown', function () {

        // Shoot Sound
        aimCanvas.cursorSound.push(new sound());
        aimCanvas.cursorSound[aimCanvas.cursorSound.length - 1].play();

        // Menu Event
        if (aimCanvas.currentView === "menu") {

            // Target Mode Icon
            if (aimCanvas.cursorX > aimCanvas.centerLeft - 75
                && aimCanvas.cursorX < aimCanvas.centerLeft + 75
                && aimCanvas.cursorY > aimCanvas.centerTop - 50
                && aimCanvas.cursorY < aimCanvas.centerTop + 100) {

                aimCanvas.mode = new targetMode();
                return aimCanvas.currentView = "targetMode";

            }

        }

        // Check if the current view of the aimCanvas is in "targetMode"
        if (aimCanvas.currentView === "targetMode") {

            // Increment the shootFail counter in target mode
            aimCanvas.mode.shootFail += 1;

            // Iterate through each target in the targets array
            aimCanvas.mode.targets.find(function (e, index) {

                // Calculate the horizontal and vertical distances between the cursor and the current target
                this.dx = aimCanvas.cursorX - e.x;
                this.dy = aimCanvas.cursorY - e.y;

                // Calculate the distance from the cursor to the target using the Pythagorean theorem
                this.dist = Math.abs(Math.sqrt(this.dx * this.dx + this.dy * this.dy));

                // Check if the cursor is within the size of the target
                if (this.dist <= e.size) {

                    // Decrement the shootFail counter and increment the score
                    aimCanvas.mode.shootFail -= 1;
                    aimCanvas.mode.score += 1;

                    // Remove the target from the array
                    return aimCanvas.mode.targets.splice(index, 1);
                }

            });
        }


        setTimeout(function () {

            aimCanvas.cursorSound.splice(aimCanvas.cursorSound[aimCanvas.cursorSound.length - 1], 1);

        }, 2000);

    })
    document.addEventListener('keydown', function (e) {

        if (e.code === "Escape") {

            aimCanvas.mode = null;
            return aimCanvas.currentView = "menu";

        }

    })

    this.setSize = function (x, y) {

        this.canvas.width = x;
        this.canvas.height = y;
        this.centerLeft = this.canvas.width / 2;
        return this.centerTop = this.canvas.height / 2;

    }

    this.clear = function () {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    this.controller = function () {

        if (this.currentView === "menu") {




        }

        if (this.currentView === "targetMode") {

            if (this.mode.life <= 0) {

                //console.log('loose');

            }

            this.mode.addTarget();

        }

        return this.view(this.currentView);

    }

    // Define a method named 'view' for the object
    this.view = function (type) {

        // Clear the canvas before drawing
        this.clear();

        // Check the type of view to determine the content to be displayed
        if (type === "menu") {

            // Draw the title of the menu
            this.ctx.fillStyle = "#000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "center";
            this.ctx.font = "30px Open Sans";
            this.ctx.fillText('CANVAS AIM TRAINING', this.centerLeft, this.centerTop - 100);

            // Draw three rectangles with different colors for menu options
            this.ctx.fillStyle = "#c8c8c8";
            this.ctx.fillRect(this.centerLeft - 250, this.centerTop - 50, 150, 150);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(this.centerLeft - 75, this.centerTop - 50, 150, 150);
            this.ctx.fillStyle = "#c8c8c8";
            this.ctx.fillRect(this.centerLeft + 100, this.centerTop - 50, 150, 150);

            // Draw several circles representing different elements
            aimCanvas.ctx.fillStyle = "#c8c8c8";

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft - 45, this.centerTop - 20, 10, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft - 25, this.centerTop + 20, 20, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft - 25, this.centerTop + 50, 5, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft - 45, this.centerTop + 70, 10, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft + 5, this.centerTop + 60, 10, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft + 35, this.centerTop, 15, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            aimCanvas.ctx.beginPath();
            aimCanvas.ctx.arc(this.centerLeft + 30, this.centerTop + 50, 20, 0, 2 * Math.PI);
            aimCanvas.ctx.closePath();
            aimCanvas.ctx.fill();

            // Draw text for the "Precision" indicator
            aimCanvas.ctx.fillStyle = "#e40700";
            aimCanvas.ctx.textAlign = "center";
            aimCanvas.ctx.textBaseline = "center";
            aimCanvas.ctx.font = "30px Open Sans";
            aimCanvas.ctx.fillText("Precision", this.centerLeft, this.centerTop + 40);


        } else if (type === "targetMode") {

            // Check if the player's life is zero to display the end screen
            if (this.mode.life === 0) {

                // Display the "End" message and the player's score
                aimCanvas.ctx.fillStyle = "#404040";
                aimCanvas.ctx.textAlign = "center";
                aimCanvas.ctx.textBaseline = "center";
                aimCanvas.ctx.font = "50px Open Sans";
                aimCanvas.ctx.fillText("End", this.centerLeft, this.centerTop - 20);
                aimCanvas.ctx.font = "30px Open Sans";
                aimCanvas.ctx.fillText("Score : " + this.mode.score, this.centerLeft, this.centerTop + 20);
                aimCanvas.ctx.fillText("Press ESCAPE", this.centerLeft, this.centerTop + 200);

            } else {

                // Display the remaining lives, score, and shooting failures during gameplay
                this.ctx.fillStyle = "#959595";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "center";
                this.ctx.font = "80px Open Sans";
                this.ctx.fillText('♥'.repeat(this.mode.life), this.centerLeft, this.centerTop);

                aimCanvas.ctx.font = "30px Open Sans";
                aimCanvas.ctx.fillText("Score : " + this.mode.score, this.centerLeft, this.centerTop + 30);
                aimCanvas.ctx.fillText("Miss : " + this.mode.shootFail, this.centerLeft, this.centerTop + 70);

                // Call the getTargets method to display the targets
                this.mode.getTargets();

            }

        }

        // Show the cursor on the canvas
        return cursor.show();

    }

}
// Define a constructor function named 'mouse'
function mouse() {

    // Set the default color for the mouse
    this.color = "green";

    // Define a method named 'show' for the mouse object
    this.show = function () {

        // Set the fill style to the mouse color
        aimCanvas.ctx.fillStyle = this.color;

        // Begin drawing the mouse shape
        aimCanvas.ctx.beginPath();

        // Draw a small square at the current cursor position
        aimCanvas.ctx.fillRect(aimCanvas.cursorX, aimCanvas.cursorY, 3, 3);

        // Draw a vertical rectangle above the cursor position
        aimCanvas.ctx.fillRect(aimCanvas.cursorX, aimCanvas.cursorY - 15, 3, 10);

        // Draw a horizontal rectangle to the right of the cursor position
        aimCanvas.ctx.fillRect(aimCanvas.cursorX + 8, aimCanvas.cursorY, 10, 3);

        // Draw a vertical rectangle below the cursor position
        aimCanvas.ctx.fillRect(aimCanvas.cursorX, aimCanvas.cursorY + 8, 3, 10);

        // Draw a horizontal rectangle to the left of the cursor position
        aimCanvas.ctx.fillRect(aimCanvas.cursorX - 15, aimCanvas.cursorY, 10, 3);

        // Close the path for the mouse shape
        aimCanvas.ctx.closePath();
    }
}


// Game Mode
function targetMode() {

    this.life = 3;
    this.score = 0;
    this.shootFail = 0;
    this.targets = [];
    this.targetsMaxSize = 50; // Unity : Pixel
    this.targetsRapidity = 0.2; // Unity : Pixel
    this.targetsTime = 2000 - (this.score * 5); // Unity : Mills
    this.targetsLastAdd = Date.now();

    this.addTarget = function () {

        if (this.targets.length < 5 && Date.now() > this.targetsLastAdd + this.targetsTime) {

            this.targets.push(new target());
            return this.targetsLastAdd = Date.now();

        }

    }

    this.getTargets = function () {

        this.targets.forEach(function (value, index) {

            if (value.reset === true && value.size <= 0) {

                aimCanvas.mode.targets.splice(index, 1);
                return aimCanvas.mode.life -= 1;

            }

            return value.draw();

        });

    }

}
// Define a constructor function named 'target'
function target() {

    // Initialize target properties with random positions and default values
    this.x = rand(aimCanvas.mode.targetsMaxSize, aimCanvas.canvas.width - aimCanvas.mode.targetsMaxSize);
    this.y = rand(aimCanvas.mode.targetsMaxSize, aimCanvas.canvas.height - aimCanvas.mode.targetsMaxSize);
    this.size = 0;
    this.reset = false;

    // Define a method named 'draw' for the target object
    this.draw = function () {

        // Check if the target size is less than the maximum size and reset flag is false
        if (this.size < aimCanvas.mode.targetsMaxSize && this.reset === false) {

            // Increase the target size based on the rapidity setting
            this.size += aimCanvas.mode.targetsRapidity;

        } else {

            // Set the reset flag to true
            this.reset = true;

            // Check if reducing the size by the rapidity will not go below zero
            if (this.size - aimCanvas.mode.targetsRapidity < 0) {
                // If true, set the size to zero
                return this.size = 0;
            }

            // Decrease the target size based on the rapidity setting
            this.size -= aimCanvas.mode.targetsRapidity;
        }

        // Set the fill style to red
        aimCanvas.ctx.fillStyle = "red";

        // Begin drawing the target as a filled circle
        aimCanvas.ctx.beginPath();
        aimCanvas.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        aimCanvas.ctx.closePath();
        aimCanvas.ctx.fill();
    }
}



// Functions
function rand(min, max) {

    return Math.round(Math.random() * (max - min) + min);

}

function sound() {

    this.sound = document.createElement("audio");
    this.sound.src = "shoot.mp3";
    this.sound.setAttribute("preload", "auto");

    this.play = function () {

        this.sound.play();

    }

}
function run() {

    aimCanvas.controller();
    window.requestAnimationFrame(run);

}


