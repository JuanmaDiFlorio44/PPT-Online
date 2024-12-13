import { Router } from "../../../node_modules/@vaadin/router";
import { state } from "../../state";

function timerJugada() {
  let counter = 10; // Empieza desde 10 para la cuenta regresiva

  const intervalId = setInterval(() => {
    const cuentaRegresiva = document.querySelector(
      ".container-cuenta-regresiva"
    ) as any;

    // Verificar si ambos jugadores ya presionaron 'start'
    const ambosStart = state.playersStart();
    if (ambosStart) {
      clearInterval(intervalId);  // Detener la cuenta regresiva si ambos están listos
      Router.go("/game");  // Redirigir al juego
      return;  // Terminar el intervalo y salir de la función
    }

    // Actualiza el texto de la cuenta regresiva con el valor de counter
    cuentaRegresiva.textContent = counter.toString();

    // Si el contador llega a 0, ir a la pantalla de instrucciones
    if (counter === 0) {
      clearInterval(intervalId);  // Detener el intervalo
      state.pushEnd();  // Si no se presionó 'start' en el tiempo adecuado
      Router.go("/instructions");  // Redirigir a las instrucciones
    }

    // Decrementar el contador
    counter--;
  }, 1000);  // Intervalo de 1 segundo
}


class WaitRoom extends HTMLElement {
  connectedCallback() {
    this.render();

    timerJugada();
  }

  render() {
    const dataCs = state.getState();
    const roomCod = dataCs.usersData.roomIdCorto;

    this.innerHTML = `
              <div class="container">
                  <p class="room-cod"> codigo-room: ${roomCod}</p>
                  <h3 class="texto-instructions">Esperando al oponente.</h3>
                  <h1 class="container-cuenta-regresiva">10</h1>
              </div>

          `;

    let style = document.createElement("style");
    style.textContent = `
                      .container {
                          height: 100vh;
                          width: 100%;
                          padding: 0 30px;
                      }
                      
                      @media (min-width: 600px) {
                          .container {
                          height: 80vh;
                          width: 450px;
                          margin: 0 auto;
                          }
                      }

                      .container-cuenta-regresiva{
                        font-family: "Poppins", sans-serif;
                        font-weight: bold;
                        font-size: 200px;
                        text-align: center;
                        color: var(--titulos);
                        margin-top: 40px;
                    }
                      
                      .texto-instructions {
                          font-family: "Poppins", sans-serif;
                          font-weight: 700;
                          font-size: 36px;
                          text-align: center;
                          color: black;
                          margin-top: 40px;
                          margin-bottom: 60px;
                      }
                      
                      @media (min-width: 600px) {
                          .texto-instructions {               
                          font-size: 36px;                         
                          margin-top: 40px;
                          margin-bottom: 60px;
                          }
                      } 

                      .room-cod{
                        font-family: "Poppins", sans-serif;
                        font-weight: 700;
                        font-size: 28px;
                        text-align: center;
                        color: black;
                        margin-top: 10px;
                       
                      }

                      @media (min-width: 600px) {
                        .room-cod {               
                        font-size: 28px;                         
                        margin-top: 20px;
                        margin-bottom: 20px;
                        }
                      
                      .piedra-img {
                        height: 150px;
                        position: fixed;
                        bottom: -50px;
                        left: 160px;
                    }
                    @media (min-width: 600px) {
                      .piedra-img {
                        left: 640px;
                      }
                    }

                    .papel-img {
                        height: 150px;
                        position: fixed;
                        bottom: -50px;
                        left: 275px;
                    }
                    @media (min-width: 600px) {
                      .papel-img {
                        left: 755px;
                      }
                    }

                    .tijeras-img {
                        height: 150px;
                        position: fixed;
                        bottom: -50px;
                        left: 50px;
                    }
                    @media (min-width: 600px) {
                      .tijeras-img {
                        left: 530px;
                      }
                    }
                    `;
    this.appendChild(style);
  }
}
customElements.define("wait-room-page", WaitRoom);
