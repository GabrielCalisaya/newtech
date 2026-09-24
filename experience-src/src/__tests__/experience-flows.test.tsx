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
