import React from 'react';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TableCellWithToolTip from '../../../../AssessmentResults/Components/TableCellWithToolTip';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
    return (
        <div className="custom-tooltip bg-slate-50 p-5 text-xl">
        <p className="label">{`Question: ${payload[0].payload.question_title}`}</p>
        <p className="average_socre">{`Average Score: ${payload[0].payload.average_score}`}</p>
        </div>
    );
    } else {
        return <div></div>
    }
}

const CustomizedAxisTick = (props) => {
    console.log(props)
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                width={20}
                fill="#666"
                textAnchor="end"
                verticalAnchor="end"
                transform="rotate(-35)"
            >
                {props.payload.value}
            </text>
        </g>
        //<TableCellWithToolTip content={props.payload.value} length={true} />
    )
}

const CompanyResultChart = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart width="100%" height={250} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    width={20} 
                    height={230} 
                    dataKey="question_title" 
                    interval={0} 
                    angle={-60} 
                    dx={10} 
                    allowDataOverflow={true} 
                    textAnchor="end" 
                    verticalAnchor="end"
                    />
                <YAxis domain={[0, 20]}/>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="average_score" fill="#0095FF" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CompanyResultChart;