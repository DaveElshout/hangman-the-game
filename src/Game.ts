class Game {

    /**
     * @internal Holds the canvas HTML element where this game should draw on. 
     * This variable knows the screen's size.
     * 
     * @see [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     */
    private readonly canvas: HTMLCanvasElement;
    
    
    /**
     * @internal attribute that holds the RenderContext to draw on. This will
     * be used in the `draw()` method.
     * 
     * @see [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
     */
    private readonly ctx: CanvasRenderingContext2D;

    // The game screen components
    private title: TextString;
    private word: TextString;

    // The hangman parts
    
    private base: Rectangle;
    private verticalPole: Rectangle;
    private horizontalPole: Rectangle;
    private verticalString: Line;
    private head: Ellipse;
    private body: Rectangle;
    private leftArm: Line;
    private rightArm: Line;
    private leftLeg: Line;
    private rightLeg: Line;

    

    /**
     * Construct a new Game.
     * 
     * @param {HTMLCanvasElement} canvasId 
     */
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        // Initialize the game items
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, "_ _ _ _ _ _ _ _");

        // The base of the hangman
        this.base = new Rectangle(cx - 200, cy * 1.75, 300, 35);
        this.base.fillStyle = "brown";
        // TODO create the other parts of the hangman
        this.verticalPole = new Rectangle(cx - 200, cy * 0.75, 30, 400);
        this.verticalPole.fillStyle = "brown";
        this.horizontalPole = new Rectangle(cx - 200, cy * 0.75, 200, 27);
        this.horizontalPole.fillStyle = "brown";
        this.verticalString = new Line(cx - 1, cy - 30, cx - 1, cy - 80);
        this.verticalString.strokeStyle = "black";
        this.head = new Ellipse(cx - 1, cy - 10 , 40, 40);
        this.body = new Rectangle(cx - 5, cy - 0, 10, 140);
        this.leftArm = new Line(cx - 0, cy - -40, cx- 20, cy - -120);
        this.leftArm.lineWidth = 5; 
        this.rightArm = new Line(cx - 0, cy - -40, cx+ 20, cy - -120);
        this.rightArm.lineWidth = 5;
        this.leftLeg = new Line(cx - 2, cy - -140, cx- 10, cy - -230);
        this.leftLeg.lineWidth = 5;
        this.rightLeg = new Line(cx + 2, cy - -140, cx+ 10, cy - -230);
        this.rightLeg.lineWidth = 5;
        
        

        // Draw the canvas
        this.drawCanvas();

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }


    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        // Draw the hangman
        this.base.drawRectangle(this.ctx);
        // TODO draw the other parts of the hangman
        this.verticalPole.drawRectangle(this.ctx);
        this.horizontalPole.drawRectangle(this.ctx);
        this.verticalString.drawLine(this.ctx);
        this.head.drawCircle(this.ctx);
        this.body.drawRectangle(this.ctx);
        this.leftArm.drawLine(this.ctx);
        this.rightArm.drawLine(this.ctx);
        this.leftLeg.drawLine(this.ctx);
        this.rightLeg.drawLine(this.ctx);

    }

    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
        console.log(`Key ${ev.key} has been pressed`);
    }


}

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});
