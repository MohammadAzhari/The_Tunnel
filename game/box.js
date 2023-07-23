import * as THREE from 'three';

export class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color,
    gravity,
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    zAcceleration = false,
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color })
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);
    this.updateSides();

    this.velocity = velocity;
    this.gravity = gravity;

    this.zAcceleration = zAcceleration;
  }

  updateSides() {
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }

  update() {
    this.updateSides();
    if (this.zAcceleration) this.velocity.z += this.zAcceleration;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    if (!this.zAcceleration) this.applyGravity();
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  static create({
    width,
    height,
    depth,
    color,
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    zAcceleration = false,
  }) {
    const compnonet = new Box({
      width,
      depth,
      height,
      color,
      zAcceleration,
      position,
      velocity,
    });
    compnonet.receiveShadow = true;
    return compnonet;
  }
}
