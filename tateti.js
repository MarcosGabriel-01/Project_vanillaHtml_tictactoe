let tamaño = 3;
let condicion = 3;
const jugadores = ["x", "o"];
let jugador = jugadores[0];
let ganador = null;
let movimientos = 0;

function generarGrilla() {
  setTamaño();
  setCondicion();
  document.writeln('<h2 id="jugador">jugador ', jugador, "</h2>");
  document.writeln("<table>");
  for (let x = 0; x < tamaño; x++) {
    document.writeln("<tr>");
    for (let y = 0; y < tamaño; y++) {
      document.writeln(
        "<td>",
        '<button id="',
        x,
        ",",
        y,
        '" onclick="marcar(',
        x,
        ",",
        y,
        ')" style="background-color: white; color: white">',
        "a",
        "</button>",
        "</td>"
      );
    }
    document.writeln("</tr>");
  }
  document.writeln("</table>");
}

function marcar(x, y) {
  let casilla = revisarCasilla(x, y);
  if (casilla.innerHTML == "a" && ganador == null) {
    movimientos++;
    {
      if (jugador == jugadores[0]) {
        casilla.innerHTML = jugadores[0];
        casilla.style = "background-color: #40d0ff";
        revisar(jugador, x, y);
        jugador = jugadores[1];
      } else {
        casilla.innerHTML = jugadores[1];
        casilla.style = "background-color: #eca053";
        revisar(jugador, x, y);
        jugador = jugadores[0];
      }
      if (movimientos == tamaño * tamaño && ganador == null) {
        terminarEmpate();
      }
      document.getElementById("jugador").innerHTML = "jugador " + jugador;
    }
  }
}

function revisar(jugador, x, y) {
  if (
    revisarFila(jugador, x) ||
    revisarColumna(jugador, y) ||
    revisarDiagonalCruzado(jugador) ||
    revisarDiagonalDirecto(jugador)
  ) {
    terminarVictoria(jugador);
  }
}

function revisarFila(jugador, x) {
  let contador = 0;
  for (let y = 0; y < tamaño; y++) {
    let casilla = revisarCasilla(x, y);
    if (casilla.innerHTML == jugador) {
      contador++;
    }
  }
  return contador == condicion;
}

function revisarColumna(jugador, y) {
  let contador = 0;
  for (let x = 0; x < tamaño; x++) {
    let casilla = revisarCasilla(x, y);
    if (casilla.innerHTML == jugador) {
      contador++;
    }
  }
  return contador == condicion;
}

function revisarDiagonalCruzado(jugador) {
  let contador = 0;
  let incremental = 0;
  let decremental = tamaño;
  decremental--;
  while (incremental < tamaño) {
    let casilla = revisarCasilla(incremental, decremental);
    if (casilla.innerHTML == jugador) {
      contador++;
    }
    incremental++;
    decremental--;
  }
  return contador == condicion;
}

function revisarDiagonalDirecto(jugador) {
  let contador = 0;
  for (let i = 0; i < tamaño; i++) {
    let casilla = revisarCasilla(i, i);
    if (casilla.innerHTML == jugador) {
      contador++;
    }
  }
  return contador == condicion;
}

function revisarCasilla(x, y) {
  let id = [x, y].toString();
  return document.getElementById(id);
}

function terminarEmpate() {
  document.writeln("<h1>empate 🏳️</h1>");
}

function terminarVictoria(jugador) {
  ganador = jugador;
  document.writeln("<h1>GANO EL JUGADOR ", ganador.toUpperCase(), " 🏆</h1>");
}

function setTamaño() {
  tamaño = document.getElementById("tamaño").value;
  if (tamaño < 3) {
    tamaño = 3;
  } else if (tamaño > 21) {
    tamaño = 21;
  }
}
function setCondicion() {
  condicion = document.getElementById("condicion").value;
  if (condicion < 3) {
    condicion = 3;
  } else if (condicion > 21) {
    condicion = 21;
  } else if (condicion > tamaño) {
    condicion = tamaño;
  }
}
