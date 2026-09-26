// Plane polygons are expressed in planeSpace: X/Z on the wall and Y along its normal.
export function pointInPolygon(x, z, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const a = polygon[i], b = polygon[j];
        if ((a.z > z) !== (b.z > z) &&
            x < (b.x - a.x) * (z - a.z) / (b.z - a.z) + a.x) inside = !inside;
    }
    return inside;
}

// The ray and plane are in the same reference space. Return the nearest valid hit.
export function intersectWall(origin, direction, walls) {
    let nearest = null;
    for (const wall of walls) {
        if (wall.orientation !== 'vertical' || wall.semanticLabel && wall.semanticLabel !== 'wall') continue;
        const normal = wall.normal.clone().normalize();
        const denominator = direction.dot(normal);
        if (Math.abs(denominator) < 1e-6) continue;
        const distance = wall.position.clone().sub(origin).dot(normal) / denominator;
        if (distance <= 0 || nearest && distance >= nearest.distance) continue;
        const point = origin.clone().addScaledVector(direction, distance);
        const local = wall.worldToLocal(point.clone());
        if (!pointInPolygon(local.x, local.z, wall.polygon)) continue;
        nearest = { wall, point, distance, normal: normal.dot(origin.clone().sub(point)) >= 0 ? normal : normal.negate() };
    }
    return nearest;
}
