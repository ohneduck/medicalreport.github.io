// Инициализация даты
document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date();
    document.getElementById('currentDate').value = currentDate.toISOString().split('T')[0];
});

// Константы для генерации случайных значений
const CLINIC_MIN = 15;
const CLINIC_MAX = 18;
const HOME_MIN = 5;
const HOME_MAX = 9;

// Функция для генерации случайного числа
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для расчета коэффициента
const calculateCoefficient = (done, plan, coefficient) => {
    if (!done || !plan || coefficient === 'x' || coefficient === '×') return '×';
    const value = (done / plan) * coefficient;
    return value.toFixed(2);
};

// Расчет распределения для пункта 1 (поликлиника)
const distributeClinic = (total) => {
    if (!total) return null;
    
    // Пропорции из шаблона: 250/380 для здоровых, 130/380 для больных
    const healthyTotal = Math.floor(total * (250/380));
    const sickTotal = total - healthyTotal;

    // Распределение здоровых детей
    const earlyAge = Math.floor(healthyTotal * (80/250));
    const olderAge = healthyTotal - earlyAge;

    // Распределение больных детей
    const somaticDiseases = Math.floor(sickTotal * (70/130));
    const chronicPatients = sickTotal - somaticDiseases;

    return {
        healthyTotal,
        earlyAge,
        olderAge,
        sickTotal,
        somaticDiseases,
        chronicPatients
    };
};

// Расчет распределения для пункта 2 (дом)
const distributeHome = (total) => {
    if (!total) return null;
    
    // Распределение согласно пропорциям из шаблона
    const somaticDiseases = Math.floor(total * (25/215));
    const infectiousDiseases = Math.floor(total * (90/215));
    const newbornPatronage = Math.floor(total * (50/215));
    // Оставшееся количество для первого года жизни
    const firstYearPatronage = total - somaticDiseases - infectiousDiseases - newbornPatronage;

    return {
        somaticDiseases,
        infectiousDiseases,
        newbornPatronage,
        firstYearPatronage
    };
};

// Расчет распределения для пункта 16 (документы)
const distributeDocs = (total) => {
    if (!total) return null;

    // Распределение по пропорциям из шаблона
    const afterIllness = Math.floor(total * (100/815));
    const kindergarten = Math.floor(total * (25/815));
    const hospitalization = Math.floor(total * (25/815));
    const spaRequest = Math.floor(total * (25/815));
    const spaCard = Math.floor(total * (15/815));
    const outpatientCard = Math.floor(total * (595/815));
    // Оставшееся количество для экстренных извещений
    const emergencyNotice = total - afterIllness - kindergarten - hospitalization - 
                          spaRequest - spaCard - outpatientCard;

    return {
        afterIllness,
        kindergarten,
        hospitalization,
        spaRequest,
        spaCard,
        outpatientCard,
        emergencyNotice
    };
};

// Обработка изменений основных показателей
const handleMainInputChange = (inputId, value) => {
    const numValue = parseInt(value) || 0;
    
    switch(inputId) {
        case '1':
            const clinicDist = distributeClinic(numValue);
            if (clinicDist) {
                document.querySelector('input[data-id="1A"]').value = clinicDist.healthyTotal;
                document.querySelector('input[data-id="1A1"]').value = clinicDist.earlyAge;
                document.querySelector('input[data-id="1A2"]').value = clinicDist.olderAge;
                document.querySelector('input[data-id="1B"]').value = clinicDist.sickTotal;
                document.querySelector('input[data-id="1B1"]').value = clinicDist.somaticDiseases;
                document.querySelector('input[data-id="1B2"]').value = clinicDist.chronicPatients;

                // Автоматическое заполнение других полей на основе общего количества
                const inputs = {
                    '3': numValue,
                    '4': Math.floor(numValue * (80/380)),
                    '5': Math.floor(numValue * (150/380)),
                    '6': Math.floor(numValue * (150/380)),
                    '7': Math.floor(numValue * (100/380)),
                    '8': Math.floor(numValue * (80/380)),
                    '9': Math.floor(numValue * (80/380)),
                    '10': Math.floor(numValue * (80/380)),
                    '11': Math.floor(numValue * (25/380)),
                    '12': Math.floor(numValue * (250/380)),
                    '13': Math.floor(numValue * (15/380)),
                    '14': numValue
                };

                Object.entries(inputs).forEach(([id, value]) => {
                    const input = document.querySelector(`input[data-id="${id}"]`);
                    if (input) input.value = value;
                });
            }
            break;
            
        case '2':
            const homeDist = distributeHome(numValue);
            if (homeDist) {
                document.querySelector('input[data-id="2A"]').value = homeDist.somaticDiseases;
                document.querySelector('input[data-id="2B"]').value = homeDist.infectiousDiseases;
                document.querySelector('input[data-id="2C"]').value = homeDist.newbornPatronage;
                document.querySelector('input[data-id="2D"]').value = homeDist.firstYearPatronage;

                // Заполнение связанных полей
                const homeInputs = {
                    '17': Math.floor(numValue * (30/215)),
                    '18': Math.floor(numValue * (50/215)),
                    '19': Math.floor(numValue * (25/215))
                };

                Object.entries(homeInputs).forEach(([id, value]) => {
                    const input = document.querySelector(`input[data-id="${id}"]`);
                    if (input) input.value = value;
                });
            }
            break;
            
        case '16':
            const docsDist = distributeDocs(numValue);
            if (docsDist) {
                document.querySelector('input[data-id="16A"]').value = docsDist.afterIllness;
                document.querySelector('input[data-id="16B"]').value = docsDist.kindergarten;
                document.querySelector('input[data-id="16C"]').value = docsDist.hospitalization;
                document.querySelector('input[data-id="16D"]').value = docsDist.spaRequest;
                document.querySelector('input[data-id="16E"]').value = docsDist.spaCard;
                document.querySelector('input[data-id="16F"]').value = docsDist.outpatientCard;
                document.querySelector('input[data-id="16G"]').value = docsDist.emergencyNotice;
            }
            break;
    }
    
    calculateAllCoefficients();
};

// Функция генерации случайных значений
document.getElementById('randomBtn').addEventListener('click', () => {
    const clinicTotal = getRandomNumber(CLINIC_MIN, CLINIC_MAX);
    const homeTotal = getRandomNumber(HOME_MIN, HOME_MAX);
    const docsTotal = Math.floor((clinicTotal + homeTotal) * 1.2); // примерное количество документов
    
    document.querySelector('input[data-id="1"]').value = clinicTotal;
    document.querySelector('input[data-id="2"]').value = homeTotal;
    document.querySelector('input[data-id="16"]').value = docsTotal;
    
    handleMainInputChange('1', clinicTotal);
    handleMainInputChange('2', homeTotal);
    handleMainInputChange('16', docsTotal);
});

// Функция очистки полей
document.getElementById('clearBtn').addEventListener('click', () => {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
    });
    document.querySelectorAll('td.result, td:last-child').forEach(td => {
        td.textContent = td.textContent === '×' ? '×' : '';
    });
    document.getElementById('totalCoefficient').textContent = '';
});

// Расчет всех коэффициентов
const calculateAllCoefficients = () => {
    let totalSum = 0;

    document.querySelectorAll('tr').forEach(row => {
        const input = row.querySelector('input');
        if (!input) return;

        const done = parseFloat(input.value) || 0;
        const planCell = row.querySelector('td:nth-child(3)');
        const coeffCell = row.querySelector('td:nth-child(5)');
        const resultCell = row.querySelector('td:nth-child(6)');

        if (!planCell || !coeffCell || !resultCell) return;

        const plan = parseFloat(planCell.textContent) || 0;
        const coeff = coeffCell.textContent.trim();

        if (coeff !== '×' && coeff !== 'x') {
            const result = calculateCoefficient(done, plan, parseFloat(coeff));
            if (result !== '×') {
                resultCell.textContent = result;
                totalSum += parseFloat(result);
            }
        }
    });

    document.getElementById('totalCoefficient').textContent = totalSum.toFixed(2);
};

// Добавляем обработчики событий
document.getElementById('calculateBtn').addEventListener('click', calculateAllCoefficients);

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', (e) => {
        const id = e.target.getAttribute('data-id');
        if (id === '1' || id === '2' || id === '16') {
            handleMainInputChange(id, e.target.value);
        }
        calculateAllCoefficients();
    });
});

document.getElementById('exportPdfBtn').addEventListener('click', () => {
    window.print();
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.removeAttribute('readonly');
    });
});