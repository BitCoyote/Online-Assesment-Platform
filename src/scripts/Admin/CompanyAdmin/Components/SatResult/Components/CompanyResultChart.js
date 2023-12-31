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
  const maxValueOnGraph = data[0].average_score;
    const options = {
        responsive: true,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: Math.min(parseInt(maxValueOnGraph)+2.0,20),
                ticks: {
                    stepSize: 2
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
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
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
            }
          ]
    }
    return (
    <div className='w-[70vw] overflow-x-scroll border-gray-100 mx-[30px]'>
        <div className='relative w-[1800px] h-[500px]'>
            <Bar options={options} data={chartData} height={500} width={1800}/>
        </div>
    </div>
    );
}
export default CompanyResultChart;
