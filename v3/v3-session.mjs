export async function chooseReferenceSpace(session, expanded) {
    if (expanded) {
        try {
            await session.requestReferenceSpace('unbounded');
            return 'unbounded';
        } catch { /* Optional feature: retain the normal experience. */ }
    }
    await session.requestReferenceSpace('local-floor');
    return 'local-floor';
}

export function createARButton(renderer, reportSpace, reportError) {
    const button = document.createElement('button');
    button.id = 'ARButton';
    button.textContent = 'Comprobando AR…';
    button.disabled = true;
    Object.assign(button.style, { position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', zIndex: '10' });
    const settings = ['manualMode', 'expandedMovement', 'continueWork', 'newWork'].map(id => document.getElementById(id));
    let session = null;
    function reset() {
        session = null;
        button.textContent = 'Start AR';
        button.disabled = false;
        settings.forEach(element => { element.disabled = false; });
    }
    button.onclick = async () => {
        button.disabled = true;
        try {
            if (session) { await session.end(); return; }
            settings.forEach(element => { element.disabled = true; });
            const expanded = document.getElementById('expandedMovement').checked;
            session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['plane-detection', 'anchors'],
                optionalFeatures: expanded ? ['local-floor', 'unbounded'] : ['local-floor']
            });
            session.addEventListener('end', reset, { once: true });
            const type = await chooseReferenceSpace(session, expanded);
            renderer.xr.setReferenceSpaceType(type);
            await renderer.xr.setSession(session);
            reportSpace(type, expanded);
            button.textContent = 'Salir de AR';
            button.disabled = false;
        } catch (error) {
            if (session) await session.end().catch(() => {});
            reset();
            reportError(`No se pudo iniciar AR: ${error.message}`);
        }
    };
    if (navigator.xr) {
        navigator.xr.isSessionSupported('immersive-ar').then(supported => {
            button.disabled = !supported;
            button.textContent = supported ? 'Start AR' : 'AR no disponible';
        }).catch(error => reportError(`No se pudo comprobar AR: ${error.message}`));
    } else button.textContent = 'AR no disponible';
    return button;
}
