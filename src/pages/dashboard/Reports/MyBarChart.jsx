import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const MyBarChart = ({ data: survey }) => {


    const numberOfYes = survey?.totalTrueVote?.length;
    const numberOfNo = survey?.totalFalseVote?.length;
    const numberOfLike = survey?.totalLike?.length;
    const numberOfDislike = survey?.totalDisLike?.length;

    const chartData = [
        { id: 1, name: 'Yes', "Survey-Data": numberOfYes + 0.01 },
        { id: 2, name: 'No', "Survey-Data": numberOfNo + 0.02 },
        { id: 3, name: 'Like', "Survey-Data": numberOfLike + 0.03 },
        { id: 4, name: 'Dislike', "Survey-Data": numberOfDislike + 0.05 },
    ]

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis ticks={[5, 10, 15, 20, 25]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Survey-Data" fill="#009EFF" className='text-lg' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;