function Photos({nomPhoto,counta}) {    
    
    return (
        <>
        <div className="container row justify-content-center col-xl-12 ">
            <div className="row bg-light shadow rounded m-1 col-12 col-md-8 col-sm-8 col-lg-8 justify-content-center   ">
                <div className="row col-xl-4 justify-content-center mx-auto d-block hovereffect p-1" data-bs-toggle="modal" data-bs-target={`#modal-${counta}`}>
                    <img class = "img-responsive" href={nomPhoto} src={nomPhoto}></img>
                    <div class="row col-12 justify-content-center overlay mx-auto" >
                        <i class="col-7 col-md-7 align-self-center bi bi-eye info p-0"></i>
                    </div>
                </div>
                <div className="photo row col-xl-3 col-sm-12 justify-content-sm-center justify-content-center align-self-center">{nomPhoto}</div>
                <div className="row col-xl-3 justify-content-sm-center justify-content-center photo align-self-center">{nomPhoto.substr(6,10)}</div>
                <div className="row col-xl-3 justify-content-sm-center justify-content-center p-1">
                    <button className={"col col-5 col-xl-5 align-self-center btn btn-outline-secondary photo"} type="button" onClick ={()=>console.log("supprimer")} >
                        <i class="bi bi-trash"></i>
                    </button>
                    <button className={"col col-5 col-xl-5 align-self-center btn btn-outline-secondary ms-2 photo"} type="button" onClick ={()=>console.log("télécharger")} >
                        <i class="bi bi-arrow-down-circle"></i>
                    </button>
                </div>
            </div>

            <div class="modal fade imgModal" id={`modal-${counta}`} tabindex="-1" aria-labelledby="imgModalLabel" aria-hidden="true">          
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="imgModalLabel">{nomPhoto}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img class="imgModal" href={nomPhoto} src={nomPhoto}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
               
        </>

    )
}

export default Photos;
