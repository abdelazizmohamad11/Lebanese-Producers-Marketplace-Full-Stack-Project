import sytles from './Card.module.css'
const Card=(props)=>{
    return(
        <div className={`${sytles.card} ${props.className}`}>
            {props.children}
        </div>
    )
}
export default Card