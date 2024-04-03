import Stars from "../Stars";
import '../styles/BackgroundAnimation.css'
import Comet from "../Comet";
const BackgraundField =()=>{
    return(
        <div className="background-container">

        <div className="space-background">
            <Comet/>
            <Stars/>
        </div>
        </div>
    )
}

export default BackgraundField;