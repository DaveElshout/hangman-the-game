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
    private finalTextString: TextString;

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

    //game variables 

    private wordsToChooseFrom: string[];
    private pressedKeys: string[];
    private word: string;
    private lettersInWord:String[];
    private guessedLettersInWord:string[];
    private attempts: number;


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
        

        // The base of the hangman
        this.base = new Rectangle(cx - 200, cy * 1.75, 300, 35);
        this.base.fillStyle = "brown";
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

        //the array of words to chose from
        this.wordsToChooseFrom = [
            "cluttered",
            "collarbones",
            "perfect",
            "fallacious",
            "disastrous",
            "accidental",
            "chickens",
            "unadvised",
        ]
        this.startGame(cx);


        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }

    /**
     * (re)starts the game 
     * resets canvas and picks a new word
     */
    //TODO: finish this, test if it works
    private startGame(cx:number) {
        
        this.pressedKeys = [];
        this.guessedLettersInWord = [];
        this.attempts = 6
        this.pickWord();

        //splits word into an array of letters
        //makes an array of "-" based on the amount of characters in the word
        this.lettersInWord = this.word.split("");
        for (let i:number = 0; i < this.word.length; i++) {
        this.guessedLettersInWord.push("-");
        }
        this.finalTextString = new TextString(cx, 220, this.guessedLettersInWord.join(" "));
        this.drawCanvas();
    }

    //picks a word and removes it from the array
    private pickWord() {
      this.wordsToChooseFrom
        let random: number = Math.floor(Math.random() * this.wordsToChooseFrom.length);
        
        this.word = this.wordsToChooseFrom[random];
        console.log(`Random word ${random} is ${this.word}`);
        this.wordsToChooseFrom.splice(random, 1);
             
    };
    


    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.finalTextString.drawText(this.ctx);
        // Draw the hangman
        //TODO: make the hangman be drawn in stages
        if(this.attempts <= 4) {
            this.base.drawRectangle(this.ctx);
            if (this.attempts <= 3) {
                this.verticalPole.drawRectangle(this.ctx);
                if (this.attempts <= 2) {
                    this.horizontalPole.drawRectangle(this.ctx);  
                    if (this.attempts <= 1) {
                        this.verticalString.drawLine(this.ctx);
                        if (this.attempts = 0) {
                            this.head.drawCircle(this.ctx);
                            this.body.drawRectangle(this.ctx);
                            this.leftArm.drawLine(this.ctx);
                            this.rightArm.drawLine(this.ctx);
                            this.leftLeg.drawLine(this.ctx);
                            this.rightLeg.drawLine(this.ctx);

                        }
                    }
                } 
            }    
        } 
        
        
        
        
        

    }

    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        //saves which keys are pressed
        
        let  pressedKey:string = ev.key; 
        console.log(`Key ${ev.key} has been pressed`);

        //checks if pressed key is a letter
        const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
        if (alphabet.indexOf(pressedKey) >= 0){

            //makes sure the same keypress can not be registred wrong twice
            if (this.pressedKeys.indexOf(pressedKey) <= -1){
                this.checkClickedLetter(pressedKey)
                this.pressedKeys.push(pressedKey);
                console.log(this.pressedKeys);
            }
        } 
    }
    /**
     * takes letter and checks if it is found in the word
     * immediately pushes the changes to the canvas
     * @param letter this is the letter the player clicked on their keyboard
     */
    private checkClickedLetter(letter:string) {
        let lifepoints:number = 0;
        for (let i:number = 0; i < this.lettersInWord.length; i++) {
        if(this.lettersInWord[i] === letter){
        this.guessedLettersInWord[i] = letter;
        
        }   else {
             lifepoints++
            }
             
        }  
        if(lifepoints === this.word.length){
         this.loseOneLife();
        } 

      const cx = this.canvas.width / 2;
      this.finalTextString = new TextString(cx, 220, this.guessedLettersInWord.join(" "));
      this.drawCanvas();
    }

    /**
     * the player loses a life, which redraws the canvas with a part of the gallow drawn in
     */
    private loseOneLife() {
         this.attempts--
         console.log(this.attempts)
         this.drawCanvas();
         if(this.attempts === 0){
          window.location.reload(false); 
         }
    }
}

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});


