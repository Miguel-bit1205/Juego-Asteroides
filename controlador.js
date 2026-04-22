import { Modelo } from "./modelo.js";
import { Vista } from "./vista.js";

export class Controlador {
  constructor() {
    this.vista = new Vista();
    this.vista.ajustarCanvas();

    this.modelo = new Modelo(
      this.vista.obtenerAncho(),
      this.vista.obtenerAlto(),
    );
  }

  iniciarAsteroidesIniciales() {
    for (let i = 0; i < 3; i++) {
      this.modelo.agregarAsteroide();
    }
  }

  configurarResize() {
    window.addEventListener("resize", () => {
      this.vista.ajustarCanvas();
      this.modelo.actualizarLimites(
        this.vista.obtenerAncho(),
        this.vista.obtenerAlto(),
      );
    });
  }

  configurarSpawnAsteroides() {
    setInterval(() => {
      if (!this.modelo.gameOver) {
        this.modelo.agregarAsteroide();
      }
    }, 1000);
  }

  configurarTeclado() {
    document.addEventListener("keydown", (evento) => {
      if (this.modelo.gameOver) return;

      if (evento.key === "ArrowLeft") {
        this.modelo.girarIzquierda();
      }

      if (evento.key === "ArrowRight") {
        this.modelo.girarDerecha();
      }

      if (evento.key === "ArrowUp") {
        this.modelo.moverNave();
      }

      if (evento.key === " ") {
        if (this.modelo.puedeDisparar) {
          this.modelo.crearDisparo();
          this.modelo.puedeDisparar = false;

          setTimeout(() => {
            this.modelo.puedeDisparar = true;
          }, 150);
        }
      }
    });
  }

  gameLoop = () => {
    this.modelo.actualizar();
    this.vista.renderizar(this.modelo);
    requestAnimationFrame(this.gameLoop);
  };

  iniciar() {
    this.iniciarAsteroidesIniciales();
    this.configurarResize();
    this.configurarSpawnAsteroides();
    this.configurarTeclado();
    this.gameLoop();
  }
}
