import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const MyBarChart = ({ data }) => {

    const numberOfAdmin = data?.filter(user => user?.role === 'admin')?.length;
    const numberOfUser = data?.filter(user => user?.role === 'user')?.length;
    const numberOfSurveyor = data?.filter(user => user?.role === 'surveyor')?.length;
    const numberOfPro = data?.filter(user => user?.role === 'pro')?.length;

    const chartData = [
        { name: 'User', "Users-Data": numberOfUser },
        { name: 'Pro', "Users-Data": numberOfPro },
        { name: 'Surveyor', "Users-Data": numberOfSurveyor },
        { name: 'Admin', "Users-Data": numberOfAdmin },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis ticks={[5, 10, 15, 20, 25]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users-Data" fill="#009EFF" className='text-lg' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;