# Validación V3 — controles y movimiento en Quest 3S

URL de prueba: https://mbabota8.github.io/passtracing/v3/

La rama `v3` parte de `v2`. Los dos objetivos se aprueban por separado. La calibración y precisión milimétrica del guardado se validan y corrigen en `v2`, siguiendo `VALIDATION-V2.md`.

## Controles

| Entrada | Modo manual | Modo pared |
| --- | --- | --- |
| Joystick izquierdo | Desplazar sobre el plano de la imagen | Desplazar sobre el plano de la imagen colocada o recuperada |
| Joystick derecho horizontal | Opacidad | Opacidad |
| Joystick derecho vertical | Tamaño; con gatillo derecho, profundidad | Tamaño sin gatillo derecho |
| Gatillo de cualquiera de los mandos | Colocar y orientar | Apuntar y colocar sobre una pared |
| A/X | Mostrar/ocultar imagen | Configurar habitación cuando se solicite |
| B/Y | Mostrar/ocultar instrucciones | Guardar trabajo |

El desplazamiento izquierdo no necesita gatillo. Zona muerta radial: 0,2. Velocidad proporcional, máximo 10 cm/s también en diagonal, independiente del tamaño. Una nueva colocación reinicia el ajuste local; mientras se coloca se puede ajustar con el joystick izquierdo. Si ambos gatillos están pulsados, el primero que adquiere la colocación la conserva hasta soltarlo. Durante guardado o pérdida de seguimiento se suspende la edición.

1. Cargar una imagen y entrar en modo manual. Comprobar las cuatro direcciones y diagonales, con imagen frontal y girada. Al soltar no debe desplazarse.
2. Mover la cabeza: las direcciones deben seguir el plano de la imagen, sin cambiar profundidad, tamaño ni orientación.
3. Usar ambos joysticks: el derecho conserva tamaño/opacidad; el izquierdo solo traslada. Probar gatillo derecho con profundidad y gatillo izquierdo con traslación. Verificar A/B/X/Y.
4. Repetir en modo pared, incluyendo imagen guardada y recuperada. La traslación no debe deshacerse en el fotograma siguiente.
5. Recolocar y comprobar que se reinicia el ajuste local. Desconectar y reconectar cada mando en diferente orden: las funciones no deben intercambiarse.
6. Desplazar una imagen colocada, guardar con B/Y, salir y continuar el trabajo de v3. Verificar funcionalmente que se guarda la pose desplazada sin duplicar el desplazamiento. No certificar precisión milimétrica.
7. Interrumpir temporalmente el seguimiento y recuperarlo; no debe acumularse movimiento durante la interrupción. Salir de AR durante un guardado y verificar que se puede volver a entrar.

## Movimiento ampliado

1. Configurar en Quest un límite de tipo habitación que cubra el recorrido despejado que se va a utilizar. Los nombres de ajustes pueden variar según Horizon OS.
2. Recorrerlo en modo normal y registrar cuándo aparecen avisos o se interrumpe AR.
3. Salir y activar **Movimiento ampliado — experimental**. Entrar y comprobar el estado: activo o no disponible con retorno al modo normal.
4. Repetir exactamente el recorrido y comprobar imagen, paredes y seguimiento, tanto en modo manual como en modo pared.
5. Repetir entrada/salida de AR con la opción activada y desactivada.

`unbounded` amplía el espacio de seguimiento si el navegador lo concede; no redibuja el perímetro físico ni garantiza que desaparezcan avisos del sistema. Si no está disponible o no mejora el recorrido, este objetivo queda **no validado**.

| Fecha | Quest / Browser | Modo manual/pared | Normal/ampliado | Espacio concedido | Recorrido y distancia | Avisos/interrupciones | Seguimiento | Controles | Movimiento ampliado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pendiente | | | | | | | | Pendiente | Pendiente |

## Datos y comprobaciones automáticas

V3 usa IndexedDB `passtracing-v3`, con el formato de registro existente. No importa ni modifica trabajos de `passtracing-v2`; las dos rutas comparten origen web pero tienen bases separadas.

Ejecutar `node --test`. Las pruebas automáticas no sustituyen las pruebas físicas anteriores.
