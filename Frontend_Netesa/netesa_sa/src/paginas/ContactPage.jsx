import { React } from "react";
import neider from "../media/neider.jpg";
import john from "../media/john.jpg";
import santiago from "../media/santiago.jpg";

function ContactPage() {
    return (
        <div className="contendor">
            <div className="separador1">
                <h3 className="text-center my-5">Desarrolladores del Sistema</h3>
            </div>
            <div className="separador2 d-flex justify-content-around">
                <div className="card w-25 text-center py-4">
                    <img className="card-img-top rounded-circle" style={{width:200, marginLeft:100, paddingTop:20}} src={neider} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Neider Neme</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a className="btn btn-primary">+57 300 2577170</a>
                    </div>
                </div>
                <div className="card w-25 text-center py-4">
                    <img className="card-img-top rounded-circle" style={{width:200, marginLeft:100, paddingTop:20}} src={john} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">John Taborda</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a className="btn btn-primary">+57 321 3930957</a>
                    </div>
                </div>
                <div className="card w-25 text-center py-4">
                    <img className="card-img-top rounded-circle" style={{width:200, marginLeft:100, paddingTop:20}} src={santiago} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Santiago Parra</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a className="btn btn-primary">+57 320 5663674</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export { ContactPage }