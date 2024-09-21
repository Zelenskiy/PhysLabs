// Дані з таблиці
const temperatureData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];  // Температура в градусах Цельсія
let chart;  // Зберігаємо екземпляр графіка

function getResistanceData() {
    return [
        null,  // 0°C
        null,  // 10°C
        null,  // 20°C
        parseFloat(document.getElementById('r2c3').value) || null,  // 30°C
        parseFloat(document.getElementById('r2c4').value) || null,  // 40°C
        parseFloat(document.getElementById('r2c5').value) || null,  // 50°C
        parseFloat(document.getElementById('r2c6').value) || null,  // 60°C
        parseFloat(document.getElementById('r2c7').value) || null,  // 70°C
        parseFloat(document.getElementById('r2c8').value) || null,  // 80°C
        null   // 90°C
    ];
}

function linearRegression(x, y) {
    const filteredData = x.reduce((acc, curr, i) => {
        if (y[i] !== null) {
            acc.push({ x: curr, y: y[i] });
        }
        return acc;
    }, []);

    const n = filteredData.length;

    if (n === 0) {
        throw new Error("Немає достатніх даних для розрахунку регресії.");
    }

    const sumX = filteredData.reduce((acc, { x }) => acc + x, 0);
    const sumY = filteredData.reduce((acc, { y }) => acc + y, 0);
    const sumXY = filteredData.reduce((acc, { x, y }) => acc + x * y, 0);
    const sumX2 = filteredData.reduce((acc, { x }) => acc + x * x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}

function drawChart() {
    const resistanceData = getResistanceData();

    // Обчислення параметрів лінії регресії
    const { slope, intercept } = linearRegression(temperatureData, resistanceData);

    // Створюємо дані для лінії регресії
    const regressionLine = temperatureData.map(temp => slope * temp + intercept);

    // Отримуємо контекст для canvas
    const ctx = document.getElementById('tempResistanceChart').getContext('2d');

    // Якщо графік вже існує, оновлюємо його
    if (chart) {
        chart.data.datasets[0].data = resistanceData;
        chart.data.datasets[1].data = regressionLine;
        chart.update();
    } else {
        // Створення нового графіка
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: temperatureData,  // Масштаб по осі X (температура)
                datasets: [
                    {
                        label: 'Опір (Ом)',  // Підпис графіка
                        data: resistanceData,  // Дані для точок
                        borderColor: 'blue',  // Колір лінії для точок
                        fill: false,
                        showLine: false,  // Не з'єднувати точки лініями
                        pointBackgroundColor: 'blue',
                        pointRadius: 5
                    },
                    {
                        label: 'Лінія регресії',  // Підпис графіка для лінії
                        data: regressionLine,  // Дані для лінії регресії
                        borderColor: 'red',  // Колір лінії регресії
                        fill: false,
                        tension: 0,  // Пряма лінія без згладжування
                        pointRadius: 0,  // Сховати точки для лінії регресії
                        spanGaps: true,  // Дозволити пропуски між точками
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Температура (°C)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Опір (Ом)'
                        },
                        beginAtZero: true  // Починати вісь Y з нуля
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const temp = tooltipItem.label;
                                let resistance;
                                if (tooltipItem.datasetIndex === 0) {
                                    resistance = resistanceData[tooltipItem.dataIndex];
                                } else {
                                    resistance = (slope * temp + intercept).toFixed(2);
                                }
                                return `Температура: ${temp} °C, Опір: ${resistance || 'N/A'} Ом`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Додаємо обробник подій для полів введення
const inputFields = [
    'r2c3', 'r2c4', 'r2c5', 'r2c6', 'r2c7', 'r2c8'
];

inputFields.forEach(id => {
    document.getElementById(id).addEventListener('input', drawChart);
});

// Початковий малюнок графіка
drawChart();
