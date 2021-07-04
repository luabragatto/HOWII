(function () {

    var autoUpdate = false,
        timeTrans = 4000;

    var cdSlider = document.querySelector('.cd-slider'),
        item = cdSlider.querySelectorAll("li"),
        nav = cdSlider.querySelector("nav");

    item[0].className = "current_slide";

    for (var i = 0, len = item.length; i < len; i++) {
        var color = item[i].getAttribute("data-color");
        item[i].style.backgroundColor = color;
    }


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    if (msie > 0) {
        var version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
        if (version === 9) { cdSlider.className = "cd-slider ie9"; }
    }

    if (item.length <= 1) {
        nav.style.display = "none";
    }

    function prevSlide() {
        var currentSlide = cdSlider.querySelector("li.current_slide"),
            prevElement = currentSlide.previousElementSibling,
            prevSlide = (prevElement !== null) ? prevElement : item[item.length - 1],
            prevColor = prevSlide.getAttribute("data-color"),
            el = document.createElement('span');

        currentSlide.className = "";
        prevSlide.className = "current_slide";

        nav.children[0].appendChild(el);

        var size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2,
            ripple = nav.children[0].querySelector("span");

        ripple.style.height = size + 'px';
        ripple.style.width = size + 'px';
        ripple.style.backgroundColor = prevColor;

        ripple.addEventListener("webkitTransitionEnd", function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        });

        ripple.addEventListener("transitionend", function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        });

    }

    function nextSlide() {
        var currentSlide = cdSlider.querySelector("li.current_slide"),
            nextElement = currentSlide.nextElementSibling,
            nextSlide = (nextElement !== null) ? nextElement : item[0],
            nextColor = nextSlide.getAttribute("data-color"),
            el = document.createElement('span');

        currentSlide.className = "";
        nextSlide.className = "current_slide";

        nav.children[1].appendChild(el);

        var size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2,
            ripple = nav.children[1].querySelector("span");

        ripple.style.height = size + 'px';
        ripple.style.width = size + 'px';
        ripple.style.backgroundColor = nextColor;

        ripple.addEventListener("webkitTransitionEnd", function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        });

        ripple.addEventListener("transitionend", function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        });

    }

    updateNavColor();

    function updateNavColor() {
        var currentSlide = cdSlider.querySelector("li.current_slide");

        var nextColor = (currentSlide.nextElementSibling !== null) ? currentSlide.nextElementSibling.getAttribute("data-color") : item[0].getAttribute("data-color");
        var prevColor = (currentSlide.previousElementSibling !== null) ? currentSlide.previousElementSibling.getAttribute("data-color") : item[item.length - 1].getAttribute("data-color");

        if (item.length > 2) {
            nav.querySelector(".prev").style.backgroundColor = prevColor;
            nav.querySelector(".next").style.backgroundColor = nextColor;
        }
    }

    nav.querySelector(".next").addEventListener('click', function (event) {
        event.preventDefault();
        nextSlide();
        updateNavColor();
    });

    nav.querySelector(".prev").addEventListener("click", function (event) {
        event.preventDefault();
        prevSlide();
        updateNavColor();
    });


    setInterval(function () {
        if (autoUpdate) {
            nextSlide();
            updateNavColor();
        };
    }, timeTrans);


})();

//BOTÃO SUBIR AO TOPO

var btn = document.querySelector("#back-to-top");
btn.addEventListener("click", function() {
    window.scrollTo(0, 0);
});


//FORMULÁRIO


class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
  
    // inicia a validação de todos os campos
    validate(form) {
  
      // limpa todas as validações antigas
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar todos inputs
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em arr
      let inputsArray = [...inputs];
  
      // loop nos inputs e validação mediante aos atributos encontrados
      inputsArray.forEach(function(input, obj) {
  
        // fazer validação de acordo com o atributo do input
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valor do input
            let value = input.getAttribute(this.validations[i])
  
            // invoca o método
            this[method](input,value);
  
          }
        }
  
      }, this);
  
    }
  
    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar strings que só contem letras
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Este campo não aceita números nem caracteres especiais`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar e-mail
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão luabragatto@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // verificar se um campo está igual o outro
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    
    // método para exibir inputs que são necessários
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // validando o campo de senha
    passwordvalidate(input) {
  
      // explodir string em array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para imprimir mensagens de erro
    printMessage(input, msg) {
    
      // checa os erros presentes no input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // evento de envio do form, que valida os inputs
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });