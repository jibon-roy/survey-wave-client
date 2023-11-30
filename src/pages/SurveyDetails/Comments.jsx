

const Comments = ({ comment }) => {
    return (
        <div className="mt-10">

            <div className="flex gap-2">
                <img src={comment?.userPhoto} alt="user" className="w-9 h-8 rounded-full" />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{comment?.userName}</h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 "><span className="font-semibold">Comment:</span> {comment?.comment}</p>
            <div className="w-full sm:w-[40%] bg-gray-400 h-px"></div>
        </div>
    );
};

export default Comments;