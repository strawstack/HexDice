var config = {
    type: Phaser.AUTO,
    parent: "game-area",
    width: 600,
    height: 600,
    backgroundColor: "#333", // game background color
    physics: {
        default: 'matter',
        matter: {
            gravity: {x: 0, y: 5},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let g1;
let numberArea = undefined;

function preload ()
{

}

function create ()
{
    // setting Matter world bounds
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

    // Create graphics and physics body
    g1 = this.add.graphics({x: 300, y: 150, add: true});
    this.matter.add.gameObject(g1, { shape: { type: 'polygon', radius: 50, sides: 6 } });

    // Draw body using phusics vertices
    let vertices = g1.body.vertices;
    let pos = g1.body.position;
    let first = vertices[0];
    g1.fillStyle(0xffffff, 0.1);
    g1.lineStyle(5, 0xffffff, 1);
    g1.moveTo(first.x - pos.x, first.y - pos.y);
    for (let i = 1; i < vertices.length; i++) {
        let v = vertices[i];
        g1.lineTo(v.x - pos.x, v.y - pos.y);
    }
    g1.closePath();
    g1.strokePath();
    g1.fillPath();

    this.matter.add.pointerConstraint({
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            damping: 0,
            length: 0.01,
            stiffness: 0.1,
            angularStiffness: 0.5,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            }
        });
}

function update() {
    if (numberArea != undefined) {
        let pos = g1.body.position;
        numberArea.style.top = (pos.y - 32 + 3) + "px";
        numberArea.style.left = (pos.x - 32 + 3) + "px";

        // Set number
        let deg = rad => rad/Math.PI * 180;
        let _angle = deg(g1.body.angle);
        let angle = _angle % 360;
        if (angle < 0) { angle += 360 };
        let number = Math.floor(angle/60) + 1;
        numberArea.innerHTML = number;
    }
}

function main() {
    numberArea = document.querySelector(".number-area");
}
window.onload = main;
