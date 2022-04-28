import Chart from "chart.js";

const pieChart = document.querySelector('.js-pie-chart');
const labels = JSON.parse(pieChart.dataset.labels);
const colors = JSON.parse(pieChart.dataset.colors);
const counts = JSON.parse(pieChart.dataset.counts).map((item) => Number(item))

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Votes',
            backgroundColor: colors,
            borderColor: 'white',
            borderWidth: 2,
            data: counts
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