/*  Esercizio di oggi, Simon Says repo/cartella:
js-simon
Un alert espone 5 numeri casuali diversi.
Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
Una volta inseriti i 5 numeri, il software dice quanti e quali numeri sono stati ricordati.
Consigli del giorno:
* Pensate prima in italiano.
* Dividete in piccoli problemi la consegna.
* Individuate gli elementi di cui avete bisogno per realizzae il programma. */


$(function () {
//Genero 5 numeri casuali e li conservo in un array 


  /**
 * Questa funzione permette di generare un numero random compreso in un intervallo definito tra due numeri interi, min e max
 * @param {int} min 
 * @param {*} max 
 * @return {int} numero random
 *  */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//creo una funzione riutilizzabile nei vari casi in cui mi servirà effettuare comparazioni e verifiche

/**
 * Questa funzione effettua in loop un confronto tra gli elementi presenti in un array e l'elemento cercato
 * se c'è corrispondenza e l'elemento cercato si trova nell'array esso restituisce il booleano true, altrimenti false;
 * @param {*} arr  è un array che può contenere un qualsiasi elemento, nel caso specifico usato come contenitore di numeri
 * @param {*} getNumber è l'elemento che si confronta e ricerca nell'array, nel caso specifico il valore generato dalla funzione getRandomNumber();
 * @returns {i} posizione in cui è stata trovata la corrispondenza
 * @returns {-1} corrispondenza non trovata
 */
function checkedArrayNumber(arr, getNumber) {
  for (var j = 0; j < arr.length; j++) {
    if (getNumber == arr[j] ) {
      return j;
    }
  }
  return -1;
}

//Effettuo una prima dichiarazione delle variabili necessarie al primo step di generazione e visualizzazione dei valori numerici random univoci

var maxNumber = 5,
arrayRandomNumbers = [],
min = 1,
max = 50,
randomNumber,
infoGame,
displayNumber,
timeSec = 30;

//genero un alert per dare informazioni all'utilizzatore

infoGame = alert("Hai 30 ⏲ secondi per memorizzare quanti più numeri possibili tra i "+ maxNumber + " che ti mostrerò. Essi sono generati dal Pc in modo del tutto casuale in un intervallo che va da "+ min + " a "+ max + " . Successivamente potrai inserire, uno alla volta i tuoi valori. Tranquillo la sequenza può esser del tutto casuale, ma stai attento a rispettare le regole o non potrai proseguire. Se indovinerai tutti i numeri avrai vinto 🏅. Che la forza 💪 sia con te e la materia 'oscura' anche 💡");

/*effettuo un ciclo while sfruttando le due funzioni precedentemente
create per generare 5 valori random in modo da riempire un array, precedentemente creato,
mediante il metodo .push() per poter prima mostrare a video in stringa separata da uno spazio mediante il metodo .join(" ") */
while (arrayRandomNumbers.length < maxNumber) {
    randomNumber = getRandomNumber(min, max);

    //Per non duplicare i numeri
    if (checkedArrayNumber(arrayRandomNumbers, randomNumber) < 0) {
      arrayRandomNumbers.push(randomNumber);
    }
    console.log(arrayRandomNumbers);
    console.log(checkedArrayNumber(arrayRandomNumbers, randomNumber));
  }

  displayNumber = (arrayRandomNumbers.join(" "));

  /*per poter  mostrare nell'html i valori generati in maniera random con il metodo .html() 
  applicato al selettore jquery riportante l'id del tag all'interno andrò ad operare, 
  mi ricreo un <p></p> che successivamente mediante il metodo .text() andrò a compilare con il valore della variabile
  displayNumber che contiene i valori dell'array trasformati in stringa con separatore */
  $("#message").html('<p id="random_sequence"></p>');
  $("#random_sequence").text(displayNumber);

  /*il metodo setTimeout() permette di richiamare una funzione o valutare un'espressione dopo un numero di millisicondi dichiarati -
  in questo caso è stata usata per far scomparire, mediante un'animazione temporizzata dataci dal metodo .fadeOut(),
  l'elemento precedentemente generato #random_sequence */

  setTimeout(function() {
  $("#random_sequence").fadeOut(200);
  }, (timeSec * 1000));

  /*poiché qualsiasi elemento sincrono verrebbe eseguito nel tempo di attesa del metodo asincrono precedentemente utilizzato, setTimeout(),
  si è pensapo potesse esser utile racchiudere tutti gli eventi successivi in un'altro evento asincrono setTimeout(), con un time maggiore del precedente in modo da evitare si potessero avere sovrapposizioni o anticipazioni e da definire a monte le priorità di caricamento*/

  setTimeout(function() {

    /*con il metodo setInterval() si è provato a ricreare l'effetto di un ciclo temporizzato che facesse avviare le finestre prompt
    con una certa cadenza a meno che lutente non impieghi troppo tempo nell'inserimento dei valori,
    in quel caso la coda si accorci e i prompt si susseguono rapidamente sino al riequilibrio temporale in quanto il prompt ha la caratteristica di fermare il flusso di caricamento a meno di effettuare il submit. Non solo per questo motivo ma anche come effetto loop sfruttando la caratteristica del metodo che genera temporizzazioni infinite, che si possono interrompere mediante ulteriore metodo clearInterval(), che inserito in un if(){} condizionale ha permesso di ottenere l'effetto desiderato*/
    var intervalli = setInterval( getUserArrayComparative, 300),
    userArray =[],
    userArrayComparative =[],
    userNumber,
    displayUserNumber,
    guessedNumbers;

    //questa funzione va generalizzata per rispettare i criteri cardini - creata localmente per esser richiamata nel setInterval()
    function getUserArrayComparative() {
    displayUserNumber = (userArray.join(" "));
    guessedNumbers = (userArrayComparative.join(" "));
    //ad ogni intervallo successivo aggiorna i valori inseriti - ulteriore livello di difficoltà - nel caso l'utente inserisca valori non validi non prosegue
    $("#random_sequence").text("Questi sono i tuoi valori " + displayUserNumber).show();

      if (userArray.length == maxNumber ) {
        clearInterval(intervalli);

        //terminato il loop temporizzato generato dal setInterval() essendo stata soddisfatta l'ultima condizione si fa partire un if(){if(){}else{}}, un annidamento che ci permette di ricevere sia mediante alert che come elementi dell'html i risultati voluti
        if (userArray.length === arrayRandomNumbers.length) {
          if (userArrayComparative.length == arrayRandomNumbers.length) {
            var youWin = alert("🏆 Complimenti, hai una memoria di ferro 🏆");
            $("#message").html('<p id="win_message"></p><p id="pc_numbers"></p><p id="user_numbers"></p><p id="guessed_numbers"></p>');
            $("#win_message").text("🏆 Complimenti, hai una memoria di ferro 🏆 hai ricordato: " + (0 + userArrayComparative.length) + " dei " + arrayRandomNumbers.length + " valori generati random dal Pc");
            $("#pc_numbers").text("Questi erano i valori che il pc ha generato 💻: "  + displayNumber);
            $("#user_numbers").text("Questi sono i valori che hai inserito 👉: "  + displayUserNumber);
            $("#guessed_numbers").text("Questi sono i tuoi valori esatti ✔ : "  + guessedNumbers);
          } else {
            var youLose = alert("Mi dispiace hai perso, una cura di fosforo 🐟 🐟 🐟 potrebbe aiutare");
            $("#message").html('<p id="lose_message"></p><p id="pc_numbers"></p><p id="user_numbers"></p><p id="guessed_numbers"></p>');
            $("#lose_message").text("Mi dispiace non hai vinto, hai ricordato : " + (0 + userArrayComparative.length) + " dei " + arrayRandomNumbers.length + " valori generati random dal Pc");
            $("#pc_numbers").text("Questi erano i valori che il pc ha generato 💻: "  + displayNumber);
            $("#user_numbers").text("Questi sono i valori che hai inserito 👉: "  + displayUserNumber);
            $("#guessed_numbers").text("Questi sono i tuoi valori esatti ✔ : "  + guessedNumbers);
          }
        }
        return userArray, userArrayComparative, displayUserNumber;
      } else {
        userNumber = parseInt(prompt(" Inserisci un numero"));
        if (checkedArrayNumber(userArray,userNumber) < 0 && !isNaN(userNumber) && max >= userNumber && min <= userNumber) {
        userArray.push(userNumber);

          if (checkedArrayNumber(arrayRandomNumbers,userNumber) >= 0) {
            userArrayComparative.push(userNumber);
            console.log(userArrayComparative);
          }

        } else {
          alert("🚨⛔😫 Non è un valore accettabile❗❗❗😫⛔🚨");
          console.log(userArray, userNumber); 
        }
        console.log(userArray);
      }
    }
  console.log(userArrayComparative);
  }, (timeSec * 1000));
});
