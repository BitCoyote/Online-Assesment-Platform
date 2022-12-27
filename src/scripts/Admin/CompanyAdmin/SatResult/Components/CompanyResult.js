import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const CompanyResultChart = ({data}) => {
    const options = {
        responsive: true,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 20,
                ticks: {
                    stepSize: 5
                  }
            },
            x: {
                barThickness: 20,
                ticks: {
                    callback: function(tick) {
                        return (questions[tick].substring(0, 40)+"...");
                    }
                 }
            }
        },
        layout: {
            padding: {
                left: 50
            }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average Result Chart',
          },
        },
      };

    const questions = [];
    const averageScore = [];
    data.forEach(item => {
        questions.push(item['question_title'])
        averageScore.push(item['average_score'])
    });
    const chartData = {
        labels: questions,
        datasets: [
            {
                label: "Score",
                data: averageScore,
                backgroundColor: "#ed4e1d",
                barPercentage: 0.8,
                barThickness: 30,
                maxBarThickness: 30,
                minBarLength: 2,
            }
          ]
    }
    const styles = {
        conta: {
            overflowX : "scroll",
            width:"800px"
        },
        main: {
            position: "relative",
            width:"1500px",
            height:"500px",
        }
    }
    return (
    <div style={styles.conta}>
        <div style={styles.main}>
            <Bar options={options} data={chartData} height={500} width={1500}/>
        </div>
    </div>
    );
}
export default CompanyResultChart;