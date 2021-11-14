import '../css/Grades.css';


const TitleModalGrade = ({bgColor, text}) => {
    return (
        <div className="modal-header row justify-content-center">
            <h5 className="modal-title test p-1 shadow-sm rounded col-10 col-sm-11 col-lg-9" style={{backgroundColor:bgColor}}>{text}</h5>
        </div>
    );
}

TitleModalGrade.defaultProps = {
    bgColor : 'var(--text-loading)', 
    text : 'Chargement'
}

export default TitleModalGrade;