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

    const styles = {
        chartCard: {
            // width: '100vw',
            height: '900px',
            backgroundColor: '#f1f1f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        chartBox: {
            width: '800px',
            padding: '20px',
            borderRadius: '20px',
            backgroundColor: 'white'
        },
        chartContainer: {
          width: '800px',
          maxWidth: '800px',
          paddingLeft:'20px',
          overflowX: 'scroll'
        },
        chartContainerBody: {
            height: '1000px',
            marginLeft: '20px'

        },
      };
    const options = {
        responsive: true,
        // cornerRadius: 8,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average Result Chart',
          },
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 20
            }
        }
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
              backgroundColor: "blue"
            }
          ]
    }
    return (
        <div className='chartCard' style={styles.chartCard}>
            <div className='chartBox' style={styles.chartBox}>
                <div className='chartContainer' style={styles.chartContainer}>
                    <div className='chartContainerBody>' style={styles.chartContainerBody}>
                        <Bar options={options} data={chartData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CompanyResultChart;