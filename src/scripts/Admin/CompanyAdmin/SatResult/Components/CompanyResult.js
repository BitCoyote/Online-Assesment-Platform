// <<<<<<< HEAD
// import React, { useEffect, useState, useRef } from 'react';
// import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';

// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//     return (
//         <div className="custom-tooltip bg-slate-50 p-5 text-xl">
//         <p className="label">{`Question: ${payload[0].payload.question_title}`}</p>
//         <p className="average_socre">{`Average Score: ${payload[0].payload.average_score}`}</p>
//         </div>
//     );
//     } else {
//         return <div></div>
//     }
// }

// const tickFormatter = (value) => {
//     return ""
// };

// const splitStr = (value) => {
//     return value.match(new RegExp('.{1,10}', 'g'));
// }

// const CustomizedXAxis = (props) => {
//     return (
//         <g transform={`translate(${props.x},${props.y})`}>
//             {
//                 splitStr(props.payload.value).map((e, i) => (
//                     <text
//                         key={i}
//                         x={-50}
//                         y={16 * i}
//                         dy={16}
//                         fill="#666"
//                         textAnchor="start"
//                     >
//                         {e}
//                     </text>
//                 ))
//             }
//         </g>
//     )
// }

// const CompanyResultChart = ({data}) => {
//     const [range, setRange] = useState(0);

//     const handleChange = (e) => {
//         const start = e > (data.length - 10) ? data.length - 11 : e;
//         setRange(start);
//     }
//     useEffect(() => {
//         console.log(range)
//     }, [range])
//     return (<div className="w-[1300px] h-[500px] overflow-x-auto scroll-ml-[-60px]" >
//         <ResponsiveContainer width={140 * data.length} height={"100%"}>
//             <BarChart width={140 * data.length} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey={"question_number"} xAxisId={1}/>
//                 <XAxis 
//                     dataKey="question_title"   
//                     xAxisId={2}
//                     tick={<CustomizedXAxis />}
//                     height={200}
//                     label="label"
//                     tickFormatter={tickFormatter}
//                     style={{transform: "translate: (0px, 50px)"}}
//                 />
//                 <YAxis domain={[0, 20]}/>
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="average_score" fill="#ed4e1d" xAxisId={1} />
//             </BarChart>
//         </ResponsiveContainer>
//         </div>
//     )
// }

// export default CompanyResultChart;

// /* 
//             // <div className="">
//         //     <ChartSlider width={1300} tickWidth={Math.ceil(1300 / data.length * 10)} onChange={(e) => handleChange(e)} />
//         // </div>
// */
// =======
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
            }
          ]
    }
    return (
    <div className='w-[1230px] overflow-x-scroll dark:border-gray-100 dark:bg-gray-100'>
        <div className='relative w-[1500px] h-[500px]'>
            <Bar options={options} data={chartData} height={500} width={1500}/>
        </div>
    </div>
    );
}
export default CompanyResultChart;
// >>>>>>> feature/company-dashboard-page
