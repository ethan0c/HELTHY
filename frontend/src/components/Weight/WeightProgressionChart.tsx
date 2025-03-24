import React from 'react';
import {Line} from 'react-chartjs-2';
import '../../utils/chartSetup'; // Make sure this is imported somewhere in your app (once is enough)

type WeightLog = {
    date: string;
    weight: number;
};

function WeightProgressionChart({weightLogs}: { weightLogs: WeightLog[] }) {
    const data = {
        labels: weightLogs.map(log => log.date),
        datasets: [
            {
                label: 'Weight (lbs)',
                data: weightLogs.map(log => log.weight),
                borderColor: 'rgba(99, 102, 241, 1)', // Tailwind indigo-500
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.4,
                pointRadius: 4,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'white',
                }
            },
            title: {
                display: true,
                text: 'Weight Progression Over Time',
                color: 'white',
                font: {
                    size: 18,
                }
            }
        },
        scales: {
            x: {
                ticks: {color: 'white'},
                grid: {color: 'rgba(255,255,255,0.1)'}
            },
            y: {
                ticks: {color: 'white'},
                grid: {color: 'rgba(255,255,255,0.1)'}
            }
        }
    };

    return (
        <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
            <Line data={data} options={options}/>
        </div>
    );
}

export default WeightProgressionChart;
