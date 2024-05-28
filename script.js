const mp = new MercadoPago("TEST-a30ba31c-55fe-4020-8825-2927d425ba31");

const modalContent = document.getElementById('modal-content');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const fecharModal = document.getElementById('fechar-modal');
let produto1 = document.getElementById('produto1');
let produto2 = document.getElementById('produto2');
let produto3 = document.getElementById('produto3');
let produto4 = document.getElementById('produto4');
let produto5 = document.getElementById('produto5');
let produto6 = document.getElementById('produto6');
let valorModal = document.getElementById('valor-modal')
const barraLateral = document.getElementById('barra-lateral')
const abrirBarra = document.getElementById('abrir-barra-lateral')
const fecharBarra = document.getElementById('fechar-barra-lateral')
const comprar = document.getElementById('comprar')
const checkout = document.getElementById('modal-checkout')
const fecharCheckout = document.getElementById('fechar-checkout')

produto1.innerHTML = 'R$10,00'
btn1.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$10,00'
})

produto2.innerHTML = 'R$20,00'
btn2.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$20,00'
})

produto3.innerHTML = 'R$30,00'
btn3.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$30,00'
})

produto4.innerHTML = 'R$40,00'
btn4.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$40,00'
})

produto5.innerHTML = 'R$50,00'
btn5.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$50,00'
})

produto6.innerHTML = 'R$60,00'
btn6.addEventListener('click', function(){
    modalContent.style.display = 'block'
    valorModal.innerHTML = 'R$60,00'
})

fecharModal.addEventListener('click', function(){
    if('click'){
        modalContent.style.display = 'none';
    }
})

abrirBarra.addEventListener('click', function(){
    if('click'){
        barraLateral.style.display = 'block'
    }
})

fecharBarra.addEventListener('click', function(){
    if('click'){
        barraLateral.style.display = 'none'
    }
})

comprar.addEventListener('click', function(){
    if('click'){
        modalContent.style.display = 'none';
        checkout.style.display = 'block'
    }
})

fecharCheckout.addEventListener('click', function(){
    if('click'){
        modalContent.style.display = 'block';
        checkout.style.display = 'none'
    }
})

const cardForm = mp.cardForm({
    amount: "100.5",
    iframe: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de segurança",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular do cartão",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Parcelas",
      },        
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número do documento",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
    },
    callbacks: {
      onFormMounted: error => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },
      onSubmit: event => {
        event.preventDefault();

        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();

        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            issuerId: issuer_id,
            paymentMethodId: payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Descrição do produto",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }),
        });
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource);

        // Animate progress bar
        const progressBar = document.querySelector(".progress-bar");
        progressBar.removeAttribute("value");

        return () => {
          progressBar.setAttribute("value", "0");
        };
      }
    },
  });