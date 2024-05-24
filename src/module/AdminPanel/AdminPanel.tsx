import { Button } from "antd";
import { AdminCategory } from "./AdminCategory/AdminCategory";
import { AdminProduct } from "./AdminProduct/AdminProduct";
import { useState } from "react";
import style from './AdminPanel.module.scss'
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
export function AdminPanel(){

    const isAuthenticated = Cookies.get('admin_access') === 'true';
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    enum adminPanelSwich {
        Продукты,
        Категории
    }
    const [switchComponent, setSwitchComponent] = useState<string>(adminPanelSwich.Продукты.toString())
    
    return(
    <div className={style.adminPanel}>
        <div className="container">
            <div className={style.adminPanelButton}>
                <Button onClick={() => setSwitchComponent(adminPanelSwich.Продукты.toString())}>Продукты</Button>
                <Button onClick={() => setSwitchComponent(adminPanelSwich.Категории.toString())}>Категории</Button>
            </div>
            {switchComponent === adminPanelSwich.Продукты.toString() && (
                <AdminProduct/>
            )}
            {switchComponent === adminPanelSwich.Категории.toString() && (
                <AdminCategory/> 
            )}
        </div>
    </div>
    )
}