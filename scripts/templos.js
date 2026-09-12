/* ==============================================================
                Interatividade e Responsividade
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Menu Hambúrguer (Mobile)
  const menuButton = document.getElementById('menu-button');
  const listaMenu = document.getElementById('menu');

  if (menuButton && listaMenu) {
    menuButton.addEventListener('click', () => {
      listaMenu.classList.toggle('open');
      
      // Altera o ícone do botão entre hambúrguer (☰) e fechar (✕)
      const isOpen = listaMenu.classList.contains('open');
      menuButton.textContent = isOpen ? '✕' : '☰';
      menuButton.setAttribute('aria-expanded', isOpen);
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




