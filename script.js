let selectedWeight = '';
let selectedCargoSize = '';

document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeRequestForm();
    initializeServicesModals();
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('services-modal');
    const modalTitle = document.getElementById('services-modal-title');
    const modalDescription = document.getElementById('services-modal-description');
    const closeButtons = document.querySelectorAll('.close');

    const servicesInfo = {
        'info1': {
            title: 'Перевозка малогабаритных грузов',
            description: `
                Наша компания предлагает профессиональные услуги по перевозке малогабаритных грузов по всей России.
                
                • Быстрая и надежная доставка
                • Профессиональная упаковка
                • Выгодные тарифы для постоянных клиентов
            `
        },
        'info2': {
            title: 'Междугородние перевозки',
            description: `
                Осуществляем междугородние грузоперевозки с гарантией сохранности вашего груза.
                
                • Доставка между любыми городами России
                • Современный автопарк
                • Опытные водители
                
                
            `
        },
        'info3': {
            title: 'Перевозка тяжелых грузов',
            description: `
                Специализируемся на перевозке крупногабаритных и тяжелых грузов с использованием специальной техники.
                
                • Специальное разрешение на перевозку
                • Современное погрузочное оборудование
                • Индивидуальный подход к каждому заказу
                
            `
        }
    };

    function openModal(infoId) {
        const info = servicesInfo[infoId];
        if (info) {
            modalTitle.textContent = info.title;
            modalDescription.innerHTML = info.description.split('\n').join('<br>');
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); 
    }

    document.querySelectorAll('[data-info]').forEach(button => {
        button.addEventListener('click', function() {
            const infoId = this.getAttribute('data-info');
            openModal(infoId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    modal.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

function initializeCalculator() {
    const weightButton = document.getElementById('weight-button');
    const weightModal = document.getElementById('weight-modal');
    const sizeButton = document.getElementById('size-button');
    const sizeModal = document.getElementById('size-modal');
    
    if (weightButton && weightModal) {
        weightButton.addEventListener('click', () => {
            weightModal.style.display = 'block';
        });
    }

    if (sizeButton && sizeModal) {
        sizeButton.addEventListener('click', () => {
            sizeModal.style.display = 'block';
        });
    }

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    const deliveryForm = document.getElementById('delivery-calculator');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            calculateDelivery();
        });
    }
}

function calculateDelivery() {
    const distance = parseFloat(document.getElementById('distance').value);
    let sizeCoefficient = 0;
    let weightCoefficient = 0;

    if (selectedCargoSize === 'Маленький груз') {
        sizeCoefficient = 20;
    } else if (selectedCargoSize === 'Большой груз') {
        sizeCoefficient = 60;
    }

    if (selectedWeight === 'light') {
        weightCoefficient = 10;
    } else if (selectedWeight === 'heavy') {
        weightCoefficient = 25;
    }

    const totalCoefficient = sizeCoefficient + weightCoefficient;
    const cost = distance * totalCoefficient;

    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.textContent = `Примерная стоимость доставки на расстояние ${distance} км составляет ${cost} рублей.`;
    }
}

function selectWeight(weight) {
    const weightButton = document.getElementById('weight-button');
    const weightModal = document.getElementById('weight-modal');

    selectedWeight = weight;
    if (weightButton) {
        weightButton.textContent = weight === 'light' 
            ? 'Вес груза: Легкий груз (до 100 кг)'
            : 'Вес груза: Тяжелый груз (больше 100 кг)';
    }
    if (weightModal) {
        weightModal.style.display = 'none';
    }
}

function selectCargoSize(size) {
    const sizeButton = document.getElementById('size-button');
    const sizeModal = document.getElementById('size-modal');

    selectedCargoSize = size === 'small' ? 'Маленький груз' : 'Большой груз';
    if (sizeButton) {
        sizeButton.textContent = `Размер груза: ${selectedCargoSize} 📦`;
    }
    if (sizeModal) {
        sizeModal.style.display = 'none';
    }
}

function initializeRequestForm() {
    const requestBtn = document.querySelector('.request-btn');
    const requestModal = document.getElementById('requestModal');
    
    if (requestBtn && requestModal) {
        requestBtn.addEventListener('click', () => {
            requestModal.style.display = 'block';
        });

        const closeBtn = requestModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                requestModal.style.display = 'none';
            });
        }

        const requestForm = document.getElementById('requestForm');
        if (requestForm) {
            requestForm.addEventListener('submit', handleRequestFormSubmit);
        }
    }
}

function handleRequestFormSubmit(e) {
    e.preventDefault();
    
    const requestModal = document.getElementById('requestModal');
    const modalContent = requestModal.querySelector('.modal-content');
    
    if (modalContent) {
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <div class="success-message">
                <p>Спасибо за заявку!</p>
                <p>В течение 5 минут мы вам позвоним.</p>
            </div>
        `;

        const newCloseBtn = modalContent.querySelector('.close');
        if (newCloseBtn) {
            newCloseBtn.addEventListener('click', () => {
                requestModal.style.display = 'none';
            });
        }

        setTimeout(() => {
            requestModal.style.display = 'none';
        }, 3000);
    }
}
function validatePhone(input) {
    
    let value = input.value.replace(/[^\d+]/g, '');
    
    
    if (!value.startsWith('+7')) {
        value = '+7' + value.substring(Math.min(value.length, 1));
    }
    
    
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    
    
    input.value = value;
}

function checkPhoneLength(input) {
    const errorElement = document.getElementById('phone-error');
    
    
    if (input.value.length !== 12) {
        errorElement.textContent = 'Возможно, номер телефона введен неправильно';
        errorElement.classList.add('show');
        input.setCustomValidity('Пожалуйста, введите корректный номер телефона');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        input.setCustomValidity('');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value === '') {
        phoneInput.value = '+7';
    }
});