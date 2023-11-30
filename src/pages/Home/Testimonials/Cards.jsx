import { Rating } from "@mui/material";


const Cards = ({ data }) => {
    return (

        <div className="flex border-2 rounded-md shadow-md shadow-[#808080] p-1 border-primary-main h-full">
            <div className="p-4 flex flex-col bg-primary-bg2 hover:bg-blue-200 transition text-center items-center">
                <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <img src={data?.avatar} className="rounded-full border-2 p-1 border-primary-main w-28 h-28" alt="" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-gray-900 text-xl mt-2 title-font font-medium mb-3">{data?.name}</h2>
                    <Rating name="read-only" value={data?.star} readOnly />
                    <p className="leading-relaxed text-base">{data?.comment}</p>

                </div>
            </div>
        </div>
    );
};

export default Cards;