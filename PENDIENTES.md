# Pendientes — lo que necesito de vos

Todo lo que se podía hacer sin datos tuyos ya está implementado (Fases 1, 3 y 4 completas, Fase 2 parcial). Esto es lo único que falta, y ninguno lo puedo resolver solo porque implicaría **inventar información sobre tu negocio o tus clientes**.

---

## 1. Testimonios — el más importante

**Estado:** la sección está escrita y con estilos listos, **comentada** en `index.html` (buscá "TESTIMONIOS — sección lista, sin publicar").

**Qué necesito:** dos o tres citas reales, con nombre, cargo y empresa.

**Cómo conseguirlos rápido.** Mandale esto por WhatsApp a Caro (RRHH Working), a BITE y a La Casa del Jubilado:

> Hola! Estoy armando la web de New Tech y quería sumar la experiencia de los clientes con los que trabajé. ¿Me tirás dos o tres líneas de cómo te resultó trabajar conmigo y qué te resolvió? Lo pongo con tu nombre y el de la empresa, si te parece bien.

Con dos alcanza. Tres es el punto óptimo.

**Para activarla:** reemplazá el texto de los bloques y borrá las dos líneas del comentario (`<!-- ====...` y `====... -->`).

---

## 2. Rangos de precio

**Estado:** sin tocar. La primera pregunta del FAQ sigue siendo "¿Cuánto cuesta un proyecto?" y la respuesta es "depende, escribinos".

**Por qué importa:** es la pregunta que trae a la gente al FAQ, y hoy los devuelve al formulario sin información. Perdés al que sí podía pagarte (asume que es caro) y atendés consultas de gente fuera de presupuesto.

**Qué necesito:** un piso por tipo de proyecto. No un precio cerrado — un "desde".

```
Landing / sitio institucional:  desde $______
Tienda online:                  desde $______
Sistema a medida:               desde $______
Bot de WhatsApp:                desde $______
Consultoría cloud:              $______ por hora / por proyecto
```

Si no querés publicar pesos (razonable con la inflación), sirve igual expresarlo en semanas de trabajo: *"Una landing son 1-2 semanas; un e-commerce, 4-6."*

---

## 3. Tu foto

**Estado:** "Fundado por Gabriel Calisaya" es un párrafo suelto al final de Nosotros.

**Por qué importa:** para una consultora chica, la persona *es* la propuesta de valor. El cliente quiere saber con quién va a hablar.

**Qué necesito:** una foto tuya, de frente, buena luz. Del celular alcanza. Con eso reestructuro el bloque de Nosotros.

---

## 4. Disponibilidad real

**Estado:** el badge dice "Disponible para nuevos proyectos", que es genérico y no verificable.

**Qué necesito:** cuántos proyectos podés tomar y desde cuándo. Por ejemplo *"2 cupos para septiembre"* o *"Próximo inicio: 25 de agosto"*. Lo dejo en una constante que edites vos en un renglón.

---

## 5. Calculadora de presupuesto (opcional)

Es la idea de diferenciación con más retorno del informe, pero **depende del punto 2**. Sin rangos de precio no hay calculadora.

Cuando tengas los rangos: tres o cuatro preguntas que devuelvan una estimación y prellenen el formulario. Doble beneficio — le das el número que busca, y es una demo viva de "hacemos herramientas a medida".

---

## 6. Datos de confianza

Faltan y pesan en la decisión de contratar:

- CUIT o condición fiscal
- Ciudad de operación visible (hoy solo está en el JSON-LD)
- Cómo facturás
- Política de privacidad enlazada — el formulario recolecta nombre, correo y teléfono, y en Argentina aplica la Ley 25.326

---

## Lo que quedó pendiente por decisión técnica, no por falta de datos

**Font Awesome sigue cargando desde CDN.** Ya no bloquea el render, pero son ~19 iconos que podrían ser SVG inline (unos pocos KB, sin dependencia externa). No lo hice porque no pude obtener los paths reales y dibujarlos a mano habría dado iconos parecidos pero distintos a los actuales. Si querés, se hace con calma comparando uno por uno.

**Capturas de los proyectos.** Las tarjetas de casos muestran logo, texto y enlace. Con una captura de cada proyecto ganarían muchísimo. No las generé porque son sitios de tus clientes y esa decisión es tuya.
