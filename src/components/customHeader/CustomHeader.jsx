

const CustomHeader = ({ name, subject, children }) => {
    return (
        <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-2xl text-primary-main  tracking-widest font-semibold title-font mb-1">{name}</h2>
            <h1 className="sm:text-4xl text-3xl title-font mb-10 font-semibold text-primary-text">{subject}</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">

                {children}
            </p>
        </div>
    );
};

export default CustomHeader;