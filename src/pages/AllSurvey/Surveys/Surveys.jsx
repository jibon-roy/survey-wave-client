import 'flowbite';
import Cards from '../../../components/Cards/Cards';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CardPlaceHolder from '../../../components/cardPlaceHolder/CardPlaceHolder';
import { useEffect, useState } from 'react';


const Surveys = () => {

    const axiosPublic = useAxiosPublic();
    const { data: datas, isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })
    const [data, setData] = useState([])

    useEffect(() => {
        if (!isLoading) {
            const sortedData = datas.slice().sort((a, b) => a.title.localeCompare(b.title));
            setData(sortedData);
        }
    }, [datas, isLoading]);



    const handleTitleChange = (e) => {
        if (e.currentTarget.value === 'A - Z') {
            const sortedData = datas.slice().sort((a, b) => a.title.localeCompare(b.title));
            setData(sortedData);
        } else if (e.currentTarget.value === 'Z - A') {
            const sortedData = datas.slice().sort((a, b) => b.title.localeCompare(a.title));
            setData(sortedData);
        }
    }
    const handleCategoryChange = (e) => {
        const selectedCategory = e.currentTarget.value;

        if (selectedCategory === 'All') {
            setData(datas);
        } else {
            const filteredData = datas.filter(item => item?.category === selectedCategory);
            setData(filteredData);
        }
    }
    const handleVoteChange = (e) => {
        const selectedOption = e.currentTarget.value;
        if (selectedOption === 'Max') {
            const sortedData = datas.slice().sort((a, b) => (b?.totalTrueVote?.length + b?.totalFalseVote?.length) - (a?.totalTrueVote?.length + a?.totalFalseVote?.length));
            setData(sortedData);
        } else if (selectedOption === 'Min') {
            const sortedData = datas.slice().sort((a, b) => (a?.totalTrueVote?.length + a?.totalFalseVote?.length) - (b?.totalTrueVote?.length + b?.totalFalseVote?.length));
            setData(sortedData);
        }
    }

    return (
        <div>
            <div className='text-center mt-10 font-bold text-4xl'>
                <CustomHeader subject=' All Surveys'></CustomHeader>
            </div>
            <form className='-mt-10'>
                <div className='ml-4 text-center font-semibold mr-2'>Filter by:</div>
                <div className="flex items-center justify-center mb-10 px-2">
                    <select id="title" defaultValue='A - Z' onChange={handleTitleChange} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'A - Z'}>A - Z</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Z - A'}>Z - A</option>
                    </select>
                    <select id="categories" onChange={handleCategoryChange} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'All'}>All categories</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Education'}>Education</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Health'}>Health</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Technology'}>Technology</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Entertainment'}>Entertainment</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Travel'}>Travel</option>
                    </select>
                    <select id="vote" onChange={handleVoteChange} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Max'}>Max Vote</option>
                        <option className="py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value={'Min'}>Min Vote</option>
                    </select>

                </div>
            </form>

            {
                isLoading ? <div>
                    <CardPlaceHolder></CardPlaceHolder>
                </div>
                    :
                    <div>
                        <div className='mb-20 mx-4'>
                            <Cards data={data}></Cards>
                        </div>
                        <div className='text-center mb-10 mx-2'>
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex -space-x-px text-base h-10">
                                    <li>
                                        <button className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                                    </li>
                                    <li>
                                        <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</button>
                                    </li>
                                    <li>
                                        <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</button>
                                    </li>
                                    <li>
                                        <button aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</button>
                                    </li>
                                    <li>
                                        <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</button>
                                    </li>
                                    <li>
                                        <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</button>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Surveys;