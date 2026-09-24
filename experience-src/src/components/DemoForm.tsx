import { useState, type FormEvent } from "react";

type DemoFormProps = {
  compact?: boolean;
  submitLabel: string;
  nameLabel?: string;
};

export default function DemoForm({
  compact = false,
  submitLabel,
  nameLabel = "Nombre completo",
}: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (submitted)
    return (
      <div className="form-success" role="status">
        <span className="success-check" aria-hidden="true">
          ✓
        </span>
        <h3>¡Listo! Así se vería la confirmación.</h3>
        <p>
          Esta es una demo: tus datos no se guardaron. En un evento real, el
          registro puede conectarse a la herramienta que use el cliente.
        </p>
        <button
          className="text-action"
          type="button"
          onClick={() => setSubmitted(false)}
        >
          Volver a probar <span aria-hidden="true">↗</span>
        </button>
      </div>
    );

  return (
    <form className="demo-form" onSubmit={handleSubmit}>
      <label>
        <span>{nameLabel}</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          required
          minLength={2}
        />
      </label>
      <label>
        <span>WhatsApp</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Ej. 388 555 1234"
          required
          pattern="[+]?[0-9 ]{8,22}"
          title="Ingresá un número de 8 a 22 caracteres, con dígitos, espacios o + al inicio"
        />
      </label>
      <label>
        <span>Correo electrónico</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          required
        />
      </label>
      <p className="privacy-note">
        Datos de prueba · No se envían ni se almacenan.
      </p>
      <button
        type="submit"
        className={`button-primary w-full justify-center ${compact ? "mt-2" : "mt-4"}`}
      >
        {submitLabel} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
