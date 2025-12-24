import moment from "moment";
import { useEffect, useState } from "react"

export default function CounterComponent({ e, setEditTime, setOpenModal, deleteTimer, secondsTimer }) {
    const [reload,setReload]=useState(0);
    useEffect(() => {
        setInterval(() => {
            setReload(reload => reload + 1);
        }, 1000);
    }, [])
    return (
       moment().isSameOrAfter(moment(e.time).format("YYYY-MM-DD HH:mm:ss")) ? deleteTimer(e.id) :
        <p className=' w-[14rem] h-[4rem] bg-[#b9ca81] flex justify-evenly items-center font-bold rounded-md'>
            {secondsTimer(moment(e.time).format("YYYY-MM-DD HH:mm:ss"))} <i class="ri-edit-2-line cursor-pointer hover:scale-130" 
            onClick={() => { setEditTime(e); setOpenModal(true) }}></i>  <i class="ri-delete-bin-7-line cursor-pointer hover:scale-130" onClick={() => { deleteTimer(e.id); }}></i>
        </p>
        
    )
}
