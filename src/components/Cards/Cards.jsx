import Card from "../Card/Card";


const Cards = ({ data }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {
                data?.map(survey => <Card key={survey?._id} survey={survey}></Card>)
            }
        </div>
    );
};

export default Cards;