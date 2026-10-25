import { EVENT_WHATSAPP_URL } from "../contact";

type EventCtaProps = {
  title: string;
};

export default function EventCta({ title }: EventCtaProps) {
  return (
    <aside className="event-cta" aria-label="Consultar por esta experiencia">
      <div>
        <p className="eyebrow">¿LA QUERÉS EN TU ESTAND?</p>
        <p className="event-cta-title">{title}</p>
      </div>
      <a
        className="button-primary"
        href={EVENT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Consultar por WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
