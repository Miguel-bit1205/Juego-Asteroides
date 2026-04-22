export class Vista {
  constructor() {
    this.canvas = document.getElementById("Juego");
    this.ctx = this.canvas.getContext("2d");
    this.hud = document.getElementById("HUD");
    this.vidasSpan = document.getElementById("vidas");
    this.puntajeSpan = document.getElementById("puntaje");
  }

  ajustarCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - this.hud.offsetHeight;
  }

  obtenerAncho() {
    return this.canvas.width;
  }

  obtenerAlto() {
    return this.canvas.height;
  }

  actualizarVidas(vidas) {
    this.vidasSpan.textContent = vidas;
  }

  actualizarPuntaje(puntaje) {
    this.puntajeSpan.textContent = puntaje;
  }

  limpiarPantalla() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  dibujarNave(nave, invulnerable) {
    this.ctx.save();
    this.ctx.translate(nave.x, nave.y);
    this.ctx.rotate((nave.angulo * Math.PI) / 180);

    let relleno, borde;
    if (invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
      relleno = "#ffaa00";
      borde = "#ffaa00";
    } else {
      relleno = "#ffffff";
      borde = "#ffffff";
    }

    this.ctx.beginPath();
    this.ctx.moveTo(20, 0);
    this.ctx.lineTo(-15, -10);
    this.ctx.lineTo(-15, 10);
    this.ctx.closePath();

    this.ctx.fillStyle = relleno;
    this.ctx.fill();
    this.ctx.strokeStyle = borde;
    this.ctx.stroke();

    this.ctx.restore();
  }

  dibujarDisparos(disparos) {
    for (let i = 0; i < disparos.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        disparos[i].x,
        disparos[i].y,
        disparos[i].radio,
        0,
        Math.PI * 2,
      );
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fill();
    }
  }

  dibujarAsteroides(asteroides) {
    for (let i = 0; i < asteroides.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        asteroides[i].x,
        asteroides[i].y,
        asteroides[i].radio,
        0,
        Math.PI * 2,
      );
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.stroke();
    }
  }

  renderizar(modelo) {
    this.limpiarPantalla();
    this.actualizarVidas(modelo.vidas);
    this.actualizarPuntaje(modelo.puntaje);
    this.dibujarNave(modelo.nave, modelo.invulnerable);
    this.dibujarDisparos(modelo.disparos);
    this.dibujarAsteroides(modelo.asteroides);
  }
}
