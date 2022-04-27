import Chart from 'chart.js';

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Разочарован', 'Удовлетворительно', 'Хорошо', 'Великолепно'],
        datasets: [{
            label: 'Votes',
            backgroundColor: [
                'rgba(144, 144, 144)', 
                'rgba(188, 156, 255)', 
                'rgba(111, 207, 151)', 
                'rgba(255, 227, 156)'
            ],
            borderColor: 'white',
            borderWidth: 2,
            data: [0, 65, 65, 130]
        }]
    },
    options: {
        legend: {
           display: false
        }, 
        tooltips: {
            enabled: false
        }
    }
});