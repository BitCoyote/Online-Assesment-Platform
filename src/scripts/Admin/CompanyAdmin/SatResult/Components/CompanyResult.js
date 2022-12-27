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
              backgroundColor: "#ed4e1d"
            }
          ]
    }
    const styles = {
        conta: {
            overflowX : "scroll"
        },
        main: {
            position: "relative",
            width:"1000px",
            height:"500px",
        }
    }
    return (
    <div style={styles.conta}>
        <div style={styles.main}>
            <Bar options={options} data={chartData} height={500} width={1000}/>
        </div>
    </div>
    );
}
export default CompanyResultChart;