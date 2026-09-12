document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Menu Hambúrguer (Mobile)
  const menuBotao= document.getElementById('botao-menu');
  const menuPrincipal = document.getElementById('menu-principal');

  if (menuBotao && menuPrincipal) {
    menuBotao.addEventListener('click', () => {
      menuPrincipal.classList.toggle('open');
      
      // Altera o ícone do botão entre hambúrguer (☰) e fechar (✕)
      const isOpen = menuPrincipal.classList.contains('open');
      menuBotao.textContent = isOpen ? '✕' : '☰';
      menuBotao.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Atualização Automática do Rodapé
  const anoElemento = document.getElementById('anoAtual');
  if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }
  // Data de modificação
    const modificacaoElemento = document.getElementById("ultimaModificacao");
    if (modificacaoElemento) {
    const data = new Date(document.lastModified); 

     // Exibe data e hora: DD/MM/AAAA HH:mm:ss
    const dataFormatada = data.toLocaleString("pt-BR");
    modificacaoElemento.textContent = `Última Modificação: ${dataFormatada}`;
    }
});




