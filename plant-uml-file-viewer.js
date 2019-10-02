function markupChanged() {
    let markupElement = document.getElementById("markup");

    let compressedData = compress(markupElement.value);
    fetch("https://www.plantuml.com/plantuml/svg/" + compressedData)
        .then(value => value.text()
        .then(text => {
            localStorage.setItem('tempDiagram', JSON.stringify(text));
            let svgBox = document.getElementById("diagram");
            svgBox.innerHTML = JSON.parse(localStorage.getItem('tempDiagram'));
            }
        ));
}

var returnedFunction = debounce(function() {
    markupChanged()
  }, 300);

let markupElement = document.getElementById("markup");
markupElement.addEventListener('keyup', returnedFunction);

function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };
