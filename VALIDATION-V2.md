# Validación física de V2 — Quest 3S

Este prototipo sirve para comprobar si el navegador recupera un anclaje con un error máximo de 3 mm. No se considerará validado hasta completar estas mediciones en el visor.

1. Abra `https://mbabota8.github.io/passtracing/v2/` en Quest Browser, sin modo privado. Cargue `Images/calibration.svg`, entre en AR y seleccione una pared detectada. Si no hay paredes, configure la habitación en Ajustes de Quest y vuelva a entrar.
2. Ajuste el tamaño del lado mayor a 0,5 m; marque físicamente los nueve cruces. Pulse B/Y para guardar y compruebe el mensaje **Guardado**. No mueva la pared ni las marcas.
3. Cierre AR y vuelva a abrir el sitio con **Continuar último trabajo**. Mida en milímetros el desplazamiento de cada cruz respecto a la marca física. Repita desde varias posiciones habituales de trazado.
4. Repita tres veces tras cierre inmediato, tras reinicio del visor, tras varias horas, tras 24 horas y tras 72 horas. Realice la misma serie con lados de 1, 2 y 4 m.
5. Compruebe además 30 minutos continuos de estabilidad. Anote cualquier pérdida de seguimiento y cuánto tarda en recuperarse.

Use una regla o patrón de medida cuya incertidumbre sea menor que 3 mm. Si no puede medir esa precisión, registre el resultado como **inconcluyente**. Para aprobar, el desplazamiento de cada uno de los nueve puntos debe ser ≤3 mm en todas las recuperaciones.

| Tamaño | Escenario | Repetición | Fecha/hora | Luz | Versión Quest / Browser | Error máximo de 9 puntos (mm) | Tiempo hasta localizar | Fallos | Resultado |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| 0,5 / 1 / 2 / 4 m | inmediato / reinicio / horas / 24 h / 72 h | 1 / 2 / 3 | | | | | | | |

El guardado usa los datos locales del mismo navegador y visor. Borrar datos del sitio, usar modo privado o cambiar de origen web puede hacer que el anclaje no se recupere.
