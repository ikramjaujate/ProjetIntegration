import '../css/Grades.css';


const ButtonGrade = ({id, className, text, targetToggle, dataToggle, dataDismiss, ariaLabel, func1, param1, func2, param2}) => {

    if (func1 === undefined) {
        return (
            <button type="button" id={id} className={`btn modal-button col-11 col-sm-5 ${className}`} data-bs-target={targetToggle} data-bs-toggle={dataToggle} 
            data-bs-dismiss={dataDismiss} aria-label={ariaLabel}>{text}</button>
        );
    }
    else {
        if (func2 === undefined) {
            return (
                <button type="button" id={id} className={`btn modal-button col-11 col-sm-5 ${className}`} data-bs-target={targetToggle} data-bs-toggle={dataToggle} 
                data-bs-dismiss={dataDismiss} aria-label={ariaLabel} onClick={() => {func1(param1)}}>{text}</button>
            );
        }
        else {
            return (
                <button type="button" id={id} className={`btn modal-button col-11 col-sm-5 ${className}`} data-bs-target={targetToggle} data-bs-toggle={dataToggle} 
                data-bs-dismiss={dataDismiss} aria-label={ariaLabel} onClick={() => {func1(param1);func2(param2)}}>{text}</button>
            );
        }
    }
}

export default ButtonGrade;
