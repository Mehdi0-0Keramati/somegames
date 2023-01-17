const Square = ({ val, chooseSquare }) => {
    return (
        <>
            <div className="square" onClick={chooseSquare}>{val}</div>
        </>
    );
};

export default Square;