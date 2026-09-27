// Distances are metres in the image plane, independent of image scale.
export function planarStep(x, y, seconds) {
    const magnitude = Math.hypot(x, y);
    if (!Number.isFinite(magnitude) || magnitude <= 0.2 || !Number.isFinite(seconds) || seconds <= 0) return { x: 0, y: 0 };
    const distance = ((Math.min(magnitude, 1) - 0.2) / 0.8) * 0.10 * Math.min(seconds, 0.1);
    return { x: x / magnitude * distance, y: -y / magnitude * distance };
}

export function controllerForHand(bindings, hand) {
    for (const [source, controller] of bindings) {
        if (source.handedness === hand) return controller;
    }
    return null;
}

export function composePosition(base, quaternion, offset) {
    // Rotate the local offset by a unit quaternion without applying image scale.
    const { x, y, z, w } = quaternion;
    const tx = -2 * z * offset.y;
    const ty = 2 * z * offset.x;
    const tz = 2 * (x * offset.y - y * offset.x);
    return {
        x: base.x + offset.x + w * tx + y * tz - z * ty,
        y: base.y + offset.y + w * ty + z * tx - x * tz,
        z: base.z + w * tz + x * ty - y * tx
    };
}
