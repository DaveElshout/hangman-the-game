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
            console.log(`Key ${ev.key} has been pressed`);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, "_ _ _ _ _ _ _ _");
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
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.base.drawRectangle(this.ctx);
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