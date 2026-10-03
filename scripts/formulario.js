document.addEventListener('DOMContentLoaded', () => {
    const anoElemento = document.getElementById('anoAtual');
    if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }

    const modificacaoElemento = document.getElementById("ultimaModificacao");
    if (modificacaoElemento) {
        const data = new Date(document.lastModified); 
        const dataFormatada = data.toLocaleString("pt-BR");
        modificacaoElemento.textContent = `Última Modificação: ${dataFormatada}`;
    }

    const form = document.getElementById('evaluationForm');
    const productSelect = document.getElementById('productSelect');
    const installDate = document.getElementById('installDate');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContent = document.getElementById('modalContent');

    const productError = document.getElementById('productError');
    const ratingError = document.getElementById('ratingError');
    const dateError = document.getElementById('dateError');

    if (productSelect) {
        productSelect.style.color = '#757575';
        productSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#222222';
                productError.style.display = 'none';
            }
        });
    }

    if (installDate) {
        installDate.addEventListener('input', function() {
            if (this.value) {
                dateError.style.display = 'none';
            }
        });
    }

    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            ratingError.style.display = 'none';
        });
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            if (!productSelect.value) {
                productError.style.display = 'block';
                isValid = false;
            } else {
                productError.style.display = 'none';
            }

            const selectedRating = document.querySelector('input[name="rating"]:checked');
            if (!selectedRating) {
                ratingError.style.display = 'block';
                isValid = false;
            } else {
                ratingError.style.display = 'none';
            }

            if (!installDate.value) {
                dateError.style.display = 'block';
                isValid = false;
            } else {
                dateError.style.display = 'none';
            }

            if (isValid) {
                const productName = productSelect.value;
                const ratingValue = selectedRating.value;
                const nameInput = document.getElementById('userName');
                const name = nameInput ? nameInput.value.trim() : '';
                const reviewerName = name ? name : 'Anônimo';

                const checkedResources = Array.from(document.querySelectorAll('input[name="resources"]:checked'))
                    .map(cb => cb.value);

                let resourcesText = checkedResources.length > 0 
                    ? checkedResources.join(', ') 
                    : 'Nenhum recurso específico marcado';

                modalContent.innerHTML = `
                    <strong>Obrigado, ${reviewerName}!</strong><br><br>
                    Sua avaliação para <strong>${productName}</strong> com nota <strong>${ratingValue}/5 ⭐</strong> foi recebida com sucesso.<br><br>
                    <em>Recursos destacados:</em> ${resourcesText}.
                `;

                modal.classList.add('active');
                form.reset();
                productSelect.style.color = '#757575';
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});