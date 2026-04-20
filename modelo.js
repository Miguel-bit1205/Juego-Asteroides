export class Modelo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;

    this.nave = {
      x: ancho / 2,
      y: alto / 2,
      angulo: 0,
    };

    this.disparos = [];
    this.asteroides = [];
    this.vidas = 3;
    this.gameOver = false;
    this.puedeDisparar = true;
  }

  actualizarLimites(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }

  girarIzquierda() {
    this.nave.angulo -= 10;
  }

  girarDerecha() {
    this.nave.angulo += 10;
  }

  moverNave() {
    const radianes = (this.nave.angulo * Math.PI) / 180;
    this.nave.x += Math.cos(radianes) * 5;
    this.nave.y += Math.sin(radianes) * 5;
  }

  crearDisparo() {
    const radianes = (this.nave.angulo * Math.PI) / 180;

    const disparo = {
      x: this.nave.x + Math.cos(radianes) * 20,
      y: this.nave.y + Math.sin(radianes) * 20,
      dx: Math.cos(radianes) * 8,
      dy: Math.sin(radianes) * 8,
      radio: 3,
    };

    this.disparos.push(disparo);
  }

  actualizarDisparos() {
    for (let i = 0; i < this.disparos.length; i++) {
      this.disparos[i].x += this.disparos[i].dx;
      this.disparos[i].y += this.disparos[i].dy;
    }
  }

  limpiarDisparos() {
    this.disparos = this.disparos.filter((disparo) => {
      return (
        disparo.x >= 0 &&
        disparo.x <= this.ancho &&
        disparo.y >= 0 &&
        disparo.y <= this.alto
      );
    });
  }

  crearAsteroide() {
    let borde = Math.floor(Math.random() * 4);
    let x, y;

    if (borde === 0) {
      x = Math.random() * this.ancho;
      y = 0;
    } else if (borde === 1) {
      x = this.ancho;
      y = Math.random() * this.alto;
    } else if (borde === 2) {
      x = Math.random() * this.ancho;
      y = this.alto;
    } else {
      x = 0;
      y = Math.random() * this.alto;
    }

    let angulo = Math.atan2(this.alto / 2 - y, this.ancho / 2 - x);
    let velocidad = 2;

    return {
      x: x,
      y: y,
      radio: 20,
      vx: Math.cos(angulo) * velocidad,
      vy: Math.sin(angulo) * velocidad,
    };
  }

  agregarAsteroide() {
    this.asteroides.push(this.crearAsteroide());
  }

  actualizarAsteroides() {
    for (let i = 0; i < this.asteroides.length; i++) {
      this.asteroides[i].x += this.asteroides[i].vx;
      this.asteroides[i].y += this.asteroides[i].vy;
    }
  }

  limpiarAsteroides() {
    this.asteroides = this.asteroides.filter((ast) => {
      return (
        ast.x + ast.radio > 0 &&
        ast.x - ast.radio < this.ancho &&
        ast.y + ast.radio > 0 &&
        ast.y - ast.radio < this.alto
      );
    });
  }

  verificarSalidaNave() {
    return (
      this.nave.x < 0 ||
      this.nave.x > this.ancho ||
      this.nave.y < 0 ||
      this.nave.y > this.alto
    );
  }

  perderVida() {
    if (this.gameOver) return;

    this.vidas--;

    if (this.vidas <= 0) {
      this.vidas = 0;
      this.gameOver = true;
    } else {
      this.nave.x = this.ancho / 2;
      this.nave.y = this.alto / 2;
      this.nave.angulo = 0;
    }
  }

  actualizar() {
    if (this.gameOver) return;

    if (this.verificarSalidaNave()) {
      this.perderVida();
    }

    this.actualizarDisparos();
    this.limpiarDisparos();
    this.actualizarAsteroides();
    this.limpiarAsteroides();
  }
}
