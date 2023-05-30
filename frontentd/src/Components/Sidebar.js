import React from "react";
import './Sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = ()=> {
    /*const {pathname} = useLocation();
    const [active, setActive]=useState();
    const navigate= useNavigate();
    useEffect(()=>{
        setActive(pathname.substring(1));
    }, [pathname])*/
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="bg-dark col-auto col-md-3 min-vh-100 d-flex justify-content between flex-column">
                    <div>
                        <a className="text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2">
                            <span className="ms-1 fs-4">Admin Visualize</span>
                        </a>
                        <hr className="text-secondary"/>
                        <ul className="nav nav-pills flex-column">
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/datausers" class="nav-link text-white fs-5" aria-current="page">
                                    <span className="ms-2">Empleados</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/nuevousuario" class="nav-link text-white fs-5" aria-current="page">
                                    <span className="ms-2">Cursos</span>
                                </a>
                            </li>

                        </ul>
                    </div>                    
                </div>
            </div>
        </div>

    );
}

export default Sidebar;