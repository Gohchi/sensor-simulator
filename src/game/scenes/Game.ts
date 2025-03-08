import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { SENSORS_A, SENSORS_B } from '../data';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: any;
  player: Phaser.Physics.Matter.Sprite;
  test: any;
  info: Phaser.GameObjects.Text;
  events: any = {
    tween: null
  };
  rotatePlayer: Function;

  preload() {
    this.load.setPath('assets');

    this.load.image('car', 'car.webp');
    this.load.image('platform', 'platform.png');
  }

  create() {
    // this.matter.world.setBounds();

    const radius = 24;
    const sensors = SENSORS_A;
    
    
    const Bodies = Phaser.Physics.Matter.Matter.Bodies;

    const rect = Bodies.rectangle(0, 0, 98, 98);
    
    const sensorObjects = [];

    for (const sensor of sensors) {
      const current = Bodies.circle(sensor.x, sensor.y, radius, sensor.options);
      
      sensorObjects.push(current);
    }
    
    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
        parts: sensorObjects,
        inertia: Infinity
    });

    this.player = this.matter.add.image(0, 0, 'car');

    this.player.setScale(.5);
    this.player.setExistingBody(compoundBody);
    this.player.setPosition(800, 780);
    this.player.setAngle(-90);
    this.player.setFrictionAir(0.03);
    this.player.setTintFill(0xccffb1);

    const pathA = this.matter.add.image(400, 300, 'platform', null, {
      // isStatic: true,
      // ignoreGravity: false,
      // isSensor: false,
      label: 'pathA',
    });
    pathA.setAngle(90);

    const pathB = this.matter.add.image(800, 82, 'platform', null, {
      isStatic: true,
      label: 'pathB',
    });
    const pathC = this.matter.add.image(800, 300, 'platform', null, {
      isStatic: true,
      label: 'pathB',
    });
    pathC.setAngle(90);

    const group = this.add.group([pathB, pathC], {
      name: 'TEST GROUP'
    });
    // this.matter.setCollisionGroup([pathB, pathC], 1);

    
    this.matter.world.on('collisionactive', (event: any) => {

      //  Loop through all of the collision pairs
      const pairs = event.pairs;

      let infoMessage = '';

      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;

        //  We only want sensor collisions
        if (pairs[i].isSensor) {
          let blockBody;
          let playerBody;

          if (bodyA.isSensor) {
            blockBody = bodyB;
            playerBody = bodyA;
          } else if (bodyB.isSensor) {
            blockBody = bodyA;
            playerBody = bodyB;
          }

          //  You can get to the Sprite via `gameObject` property
          const playerSprite = playerBody.gameObject;
          const blockSprite = blockBody.gameObject;

          if (i > 0) infoMessage += ' and ';
          infoMessage += playerBody.label;
          
          blockSprite?.setTintFill(playerBody._tintFillcolor);
        }
      }

      this.info.setText(infoMessage);
    });

    const kb = this.input.keyboard;
    if (kb) {
      this.cursors = kb.createCursorKeys();
      this.keys = {
        Q: kb.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        E: kb.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      };
    }


    this.info = this.add.text(10, 10, 'Move with cursor keys. Hit blocks with sensors.', { font: '16px Courier', fill: '#ffffff' });

    EventBus.emit('current-scene-ready', this);

  }

  update() {

    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-0.03);
      // this.player.setVelocityX(-10);
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(0.03);
      // this.player.setVelocityX(10);
    } else {
      this.player.setAngularVelocity(0);
      // this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.thrust(0.005);
      // this.player.setVelocityY(-10);
    } else if (this.cursors.down.isDown) {
      this.player.thrust(-0.005);
      // this.player.setVelocityY(10);
    } else {
      // this.player.setVelocityY(0);
    }
    

    // if (this.cursors.space.isDown) {
    //   this.player.setAngularVelocity(-0.05);
    // } else {
    //   this.player.setAngularVelocity(0);
    // }
  }
}
