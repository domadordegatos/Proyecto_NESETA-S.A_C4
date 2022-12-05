import { React } from "react";

function HomePage() {
    return (
        <div class="jumbotron border mx-5 p-3 w-50 rounded mt-5">
            <h1 class="display-4">Bienvenido a gestión de Netesa Papelería</h1>
            <p class="lead">Desde aqui podras gestionar cualquier apartado del software y vender productos desde cualquier parte del mundo</p>
            <hr class="my-4"/>
                <p>Para mas informacion de contacto puedes dirigirte a nuestro apartado de información.</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" href="/#/contacto" role="button">Contactanos</a>
                </p>
        </div>
    )
}

export { HomePage }