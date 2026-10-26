import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("demo de experiencias", () => {
  it("permite abrir las tres muestras desde la portada", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", {
        name: /Experiencias Digitales para Expos y Eventos/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Probar ruleta/i }),
    ).toHaveAttribute("href", "/ruleta");
    expect(
      screen.getByRole("link", { name: /Probar trivia/i }),
    ).toHaveAttribute("href", "/trivia");
    expect(
      screen.getByRole("link", { name: /Explorar objeto 3D/i }),
    ).toHaveAttribute("href", "/3d");
    expect(
      screen.getByRole("link", { name: /Probar raspadita/i }),
    ).toHaveAttribute("href", "/raspadita");
    expect(
      screen.getByRole("link", { name: /Probar memotest/i }),
    ).toHaveAttribute("href", "/memotest");
    expect(
      screen.getByRole("link", { name: /Probar votación/i }),
    ).toHaveAttribute("href", "/votacion");
  });

  it("completa el memotest y ofrece el registro al sorteo", async () => {
    const user = userEvent.setup();
    const { container } = renderAt("/memotest");
    const cards = [
      ...container.querySelectorAll<HTMLButtonElement>(".memory-card"),
    ];
    expect(cards).toHaveLength(12);
    const pairs = new Map<string, HTMLButtonElement[]>();
    for (const card of cards) {
      const pair = card.dataset.pair ?? "";
      pairs.set(pair, [...(pairs.get(pair) ?? []), card]);
    }
    for (const [first, second] of pairs.values()) {
      await user.click(first);
      await user.click(second);
    }
    expect(screen.getByText(/Completaste el tablero/i)).toBeInTheDocument();
    expect(screen.getByText(/6 movimientos/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Participar en el sorteo/i }),
    ).toBeInTheDocument();
  });

  it("da vuelta las cartas que no forman par", async () => {
    vi.useFakeTimers();
    const { container } = renderAt("/memotest");
    const cards = [
      ...container.querySelectorAll<HTMLButtonElement>(".memory-card"),
    ];
    const first = cards[0];
    const other = cards.find((card) => card.dataset.pair !== first.dataset.pair)!;
    await act(async () => {
      first.click();
    });
    await act(async () => {
      other.click();
    });
    expect(first).toHaveAttribute("aria-pressed", "true");
    await act(async () => {
      vi.advanceTimersByTime(900);
    });
    expect(first).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText(/Movimientos 01/i)).toBeInTheDocument();
  });

  it("suma el voto y sigue recibiendo votos en vivo", async () => {
    vi.useFakeTimers();
    renderAt("/votacion");
    expect(screen.getByText("122")).toBeInTheDocument();
    await act(async () => {
      screen.getByRole("button", { name: /Raspadita/i }).click();
    });
    expect(screen.getByText(/Gracias por votar/i)).toBeInTheDocument();
    expect(screen.getByText(/Tu voto/i)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(1400 * 3);
    });
    expect(screen.getByText("126")).toBeInTheDocument();
  });

  it("muestra el panel de la marca con datos de muestra", () => {
    renderAt("/panel");
    expect(screen.getByText(/Datos ficticios/i)).toBeInTheDocument();
    expect(screen.getByText("Contactos captados")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Participaciones por hora/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Descargar CSV de muestra/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(6);
  });

  it("lleva la consulta de eventos a WhatsApp con un mensaje listo", () => {
    renderAt("/");
    const cta = screen.getByRole("link", { name: /Hablemos de tu evento/i });
    expect(cta.getAttribute("href")).toMatch(
      /^https:\/\/wa\.me\/5493885187080\?text=/,
    );
    expect(decodeURIComponent(cta.getAttribute("href") ?? "")).toMatch(
      /activación para mi evento/i,
    );
    expect(
      screen.getByRole("heading", { name: /Lo que se lleva tu marca/i }),
    ).toBeInTheDocument();
  });

  it("revela la raspadita y pide datos para reclamar el premio", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    vi.useFakeTimers();
    renderAt("/raspadita");
    expect(screen.getByText(/Premio oculto/i)).toBeInTheDocument();
    screen.getByRole("button", { name: /Revelar premio/i }).click();
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("dialog", { name: /Ganaste 15% OFF/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reclamar premio/i }),
    ).toBeInTheDocument();
  });

  it("permite raspar otra tarjeta si no hay premio", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    vi.useFakeTimers();
    renderAt("/raspadita");
    screen.getByRole("button", { name: /Revelar premio/i }).click();
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("dialog", { name: /Seguí participando/i }),
    ).toBeInTheDocument();
    await act(async () => {
      screen.getByRole("button", { name: /Raspar otra tarjeta/i }).click();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Revelar premio/i }),
    ).toBeInTheDocument();
  });

  it("entrega un premio y aclara que el formulario no guarda datos", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    vi.useFakeTimers();
    renderAt("/ruleta");
    screen.getByRole("button", { name: /Girar ruleta/i }).click();
    await act(async () => {
      vi.advanceTimersByTime(4200);
    });
    expect(
      screen.getByRole("dialog", { name: /Ganaste 10% OFF/i }),
    ).toBeInTheDocument();
    vi.useRealTimers();

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Nombre completo/i), "Ana Prueba");
    await user.type(screen.getByLabelText(/WhatsApp/i), "3885551234");
    await user.type(
      screen.getByLabelText(/Correo electrónico/i),
      "ana@example.com",
    );
    await user.click(screen.getByRole("button", { name: /Reclamar premio/i }));
    expect(screen.getByText(/tus datos no se guardaron/i)).toBeInTheDocument();
  });

  it("permite reintentar si la ruleta cae en sigue participando", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    vi.useFakeTimers();
    renderAt("/ruleta");
    screen.getByRole("button", { name: /Girar ruleta/i }).click();
    await act(async () => {
      vi.advanceTimersByTime(4200);
    });
    expect(
      screen.getByRole("dialog", { name: /Seguí participando/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Reclamar premio/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Volver a girar/i }),
    ).toBeInTheDocument();
  });

  it("rechaza texto en WhatsApp y acepta un número de prueba", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    vi.useFakeTimers();
    renderAt("/ruleta");
    screen.getByRole("button", { name: /Girar ruleta/i }).click();
    await act(async () => {
      vi.advanceTimersByTime(4200);
    });
    vi.useRealTimers();
    const phone = screen.getByLabelText(/WhatsApp/i) as HTMLInputElement;
    phone.value = "solo letras";
    expect(phone.checkValidity()).toBe(false);
    phone.value = "+5493885551234";
    expect(phone.checkValidity()).toBe(true);
  });

  it("resuelve tres preguntas y muestra la puntuación", async () => {
    const user = userEvent.setup();
    renderAt("/trivia");
    await user.click(
      screen.getByRole("button", {
        name: /Abrir una experiencia desde el celular/i,
      }),
    );
    expect(screen.getByText(/Respuesta correcta/i)).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /Siguiente pregunta/i }),
    );
    await user.click(
      screen.getByRole("button", {
        name: /Un producto desde distintos ángulos/i,
      }),
    );
    await user.click(
      screen.getByRole("button", { name: /Siguiente pregunta/i }),
    );
    await user.click(
      screen.getByRole("button", {
        name: /Cuántas personas completaron la experiencia/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: /Ver resultado/i }));
    expect(screen.getByLabelText(/Puntuación: 3 de 3/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Participar en el sorteo/i }),
    ).toBeInTheDocument();
  });
});
