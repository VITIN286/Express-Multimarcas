const modalContent = document.getElementById('modal-content');
const botoesSaibaMais = document.querySelectorAll('#saiba-mais-btn');
const fecharModal = document.getElementById('fechar-modal');

botoesSaibaMais.forEach(botao => {
    botao.addEventListener('click', function(){
        modalContent.style.display = 'block';
    });
});

fecharModal.addEventListener('click', function(){
    if('click'){
        modalContent.style.display = 'none'
    }
});

