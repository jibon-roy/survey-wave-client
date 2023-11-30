

const Rpt = ({ rpt }) => {
    return (
        <div>
            <div className="flex gap-1 mt-2 items-center ">
                <img src={rpt?.photo} className="w-5 h-5 rounded-full" />
                <p className="font-medium">{rpt?.userName}</p>
            </div>
            <p><span className="text-red-500">Report:</span> {rpt?.report}</p>
            <div className="h-px w-12 bg-red-500"></div>
        </div>
    );
};

export default Rpt;