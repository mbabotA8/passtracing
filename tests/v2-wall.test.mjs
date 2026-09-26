import test from 'node:test';
import assert from 'node:assert/strict';
import { pointInPolygon, intersectWall } from '../v2-wall.mjs';

class Vector {
    constructor(x, y, z) { Object.assign(this, { x, y, z }); }
    clone() { return new Vector(this.x, this.y, this.z); }
    normalize() { const n = Math.hypot(this.x, this.y, this.z); return new Vector(this.x/n, this.y/n, this.z/n); }
    sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
    dot(v) { return this.x*v.x + this.y*v.y + this.z*v.z; }
    addScaledVector(v, n) { this.x += v.x*n; this.y += v.y*n; this.z += v.z*n; return this; }
    negate() { this.x *= -1; this.y *= -1; this.z *= -1; return this; }
}
const square = [{x:-1,z:-1},{x:1,z:-1},{x:1,z:1},{x:-1,z:1}];
const wall = (z, polygon=square) => ({orientation:'vertical', semanticLabel:'wall', position:new Vector(0,0,z), normal:new Vector(0,0,1), polygon, worldToLocal:p=>new Vector(p.x,p.y,p.z-z)});

test('polygon rejects points outside and supports a concave shape', () => {
    assert.equal(pointInPolygon(0,0,square), true);
    assert.equal(pointInPolygon(2,0,square), false);
    const concave=[{x:0,z:0},{x:2,z:0},{x:2,z:2},{x:1,z:1},{x:0,z:2}];
    assert.equal(pointInPolygon(1,0.5,concave), true);
    assert.equal(pointInPolygon(1,1.5,concave), false);
});

test('ray chooses the nearest intersection within a vertical wall', () => {
    const hit=intersectWall(new Vector(0,0,0),new Vector(0,0,-1),[wall(-4),wall(-2)]);
    assert.equal(hit.distance,2);
    assert.equal(hit.point.z,-2);
    assert.equal(hit.normal.z,1);
});

test('rejects horizontal, off-polygon, and behind-the-controller hits', () => {
    const origin=new Vector(0,0,0), ray=new Vector(0,0,-1);
    assert.equal(intersectWall(origin,ray,[{...wall(-2),orientation:'horizontal'}]),null);
    assert.equal(intersectWall(new Vector(2,0,0),ray,[wall(-2)]),null);
    assert.equal(intersectWall(origin,ray,[wall(2)]),null);
});
