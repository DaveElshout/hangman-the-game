class Ellipse {
    constructor(x, y, radiusX, radiusY) {
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.clockwise = false;
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusX, this.startAngle, this.endAngle);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvasId) {
        this.keyPress = (ev) => {
            let pressedKey = ev.key;
            console.log(`Key ${ev.key} has been pressed`);
            const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
            if (alphabet.indexOf(pressedKey) >= 0) {
                if (this.pressedKeys.indexOf(pressedKey) <= -1) {
                    this.checkClickedLetter(pressedKey);
                    this.pressedKeys.push(pressedKey);
                    console.log(this.pressedKeys);
                }
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.base = new Rectangle(cx - 200, cy * 1.75, 300, 35);
        this.base.fillStyle = "brown";
        this.verticalPole = new Rectangle(cx - 200, cy * 0.75, 30, 400);
        this.verticalPole.fillStyle = "brown";
        this.horizontalPole = new Rectangle(cx - 200, cy * 0.75, 200, 27);
        this.horizontalPole.fillStyle = "brown";
        this.verticalString = new Line(cx - 1, cy - 30, cx - 1, cy - 80);
        this.verticalString.strokeStyle = "black";
        this.head = new Ellipse(cx - 1, cy - 10, 40, 40);
        this.body = new Rectangle(cx - 5, cy - 0, 10, 140);
        this.leftArm = new Line(cx - 0, cy - -40, cx - 20, cy - -120);
        this.leftArm.lineWidth = 5;
        this.rightArm = new Line(cx - 0, cy - -40, cx + 20, cy - -120);
        this.rightArm.lineWidth = 5;
        this.leftLeg = new Line(cx - 2, cy - -140, cx - 10, cy - -230);
        this.leftLeg.lineWidth = 5;
        this.rightLeg = new Line(cx + 2, cy - -140, cx + 10, cy - -230);
        this.rightLeg.lineWidth = 5;
        this.wordsToChooseFrom = [
            "cluttered",
            "collarbones",
            "perfect",
            "fallacious",
            "disastrous",
            "accidental",
            "chickens",
            "unadvised",
        ];
        this.startGame(cx);
        window.addEventListener("keypress", this.keyPress);
    }
    startGame(cx) {
        this.pressedKeys = [];
        this.guessedLettersInWord = [];
        this.attempts = 6;
        this.pickWord();
        this.lettersInWord = this.word.split("");
        for (let i = 0; i < this.word.length; i++) {
            this.guessedLettersInWord.push("-");
        }
        this.finalTextString = new TextString(cx, 220, this.guessedLettersInWord.join(" "));
        this.drawCanvas();
    }
    pickWord() {
        this.wordsToChooseFrom;
        let random = Math.floor(Math.random() * this.wordsToChooseFrom.length);
        this.word = this.wordsToChooseFrom[random];
        console.log(`Random word ${random} is ${this.word}`);
        this.wordsToChooseFrom.splice(random, 1);
    }
    ;
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.finalTextString.drawText(this.ctx);
        if (this.attempts <= 4) {
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
    checkClickedLetter(letter) {
        let lifepoints = 0;
        for (let i = 0; i < this.lettersInWord.length; i++) {
            if (this.lettersInWord[i] === letter) {
                this.guessedLettersInWord[i] = letter;
            }
            else {
                lifepoints++;
            }
        }
        if (lifepoints === this.word.length) {
            this.loseOneLife();
        }
        const cx = this.canvas.width / 2;
        this.finalTextString = new TextString(cx, 220, this.guessedLettersInWord.join(" "));
        this.drawCanvas();
    }
    loseOneLife() {
        this.attempts--;
        console.log(this.attempts);
        this.drawCanvas();
        if (this.attempts === 0) {
            window.location.reload(false);
        }
    }
}
let game = null;
window.addEventListener('load', function () {
    game = new Game(document.getElementById('canvas'));
});
class Line {
    constructor(x1, y1, x2, y2) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    drawLine(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class TextString {
    constructor(x, y, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.textBaseline = "alphabetic";
        this.x = x;
        this.y = y;
        this.text = text;
    }
    drawText(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map