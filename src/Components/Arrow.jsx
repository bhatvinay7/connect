import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faGreaterThan} from '@fortawesome/free-solid-svg-icons';
 function NextArrow(props) {
    const {onClick } = props;
    return (
        <div  className={`${""}"  bottom-auto mr-1 p-2 flex  justify-center items-center ml-auto hover:bg-amber-100 w-8 h-8    bg-slate-400 rounded-full "`}
        onClick={onClick}
        > 
        <FontAwesomeIcon  className="  text-xs  hover:bg-amber-100 rounded-full w-full h-full " icon={faGreaterThan}  />
        </div>
    );
}
export default function LeftArrow(props) {
    const {onClick } = props;
    return (
        <div  className={`${""} " mt-8 ml-1 mr-aoto p-2 flex justify-center items-center hover:bg-amber-100  w-8 h-8  place-content-center bg-slate-400 rounded-full " `}
        onClick={onClick}
    > 
    <FontAwesomeIcon  className="  text-xl hover:bg-amber-100 rounded-full w-full h-full " icon={faLessThan}  />
    </div>
    );
}
export {NextArrow, LeftArrow}