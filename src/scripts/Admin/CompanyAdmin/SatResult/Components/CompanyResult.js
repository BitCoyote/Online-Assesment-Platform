import React from 'react';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompanyResultChart = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart width="100%" height={250} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question_number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average_score" fill="#0095FF" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CompanyResultChart;