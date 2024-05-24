import style from './Input.module.scss'

interface Props{
    label:string
    register:any
    registerValue:string
    placeholder:string
    type:"text" | "password"
}

export function Input({label,register,registerValue,placeholder,type}:Props){
    return(
    <div className={style.inputGroup}>
        <label className={style.inputGroupLabel} htmlFor="myInput">{label}</label>
        <input type={type} id={style.myInput} className={style.inputGroupInput}  placeholder={placeholder}  {...register(registerValue)}/>
    </div>)
}