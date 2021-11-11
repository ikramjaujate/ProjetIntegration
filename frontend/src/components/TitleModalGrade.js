import '../css/Grades.css';


const TitleModalGrade = ({id, bgColor, text}) => {
    return (
        <div className="modal-header row justify-content-center">
            <h5 id={id} className="modal-title p-1 shadow-sm rounded col-10 col-sm-11 col-lg-9" style={{backgroundColor:bgColor}}>{text}</h5>
        </div>
    );
}

export default TitleModalGrade;