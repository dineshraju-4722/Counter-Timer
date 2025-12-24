import { useEffect, useState } from 'react'
import './App.css'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import moment from 'moment'
import CounterComponent from './components/CounterComponent'
import TimeSpentComponent from './components/TimeSpentComponent'

function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const [timersList, setTimersList] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [editTime, setEditTime] = useState({});

  function create(time) {
    const id = Math.random().toString(36).substr(2, 9);
    let ab = { 'id': id, 'time': time };
    setTimersList([...timersList, ab]);
  }
  function deleteTimer(id) { setTimersList(timersList.filter(e => e.id != id)); }
  function update(id, time) { setTimersList(timersList.map(e1 => e1.id == id ? { ...e1, time } : e1)); }

  function secondsTimer(date) {
    const future = moment(date, "YYYY-MM-DD HH:mm:ss");
    const diffSec = future.diff(moment(), "seconds");
    return showformat(diffSec);
  }

  function showformat(sec) {
    const diffSec = sec;
    const days = Math.floor(diffSec / (24 * 60 * 60));
    const hours = Math.floor((diffSec % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    if (editTime.id == undefined) {
      create(form.get('date-time'));
    }
    else {
      update(editTime.id, form.get('date-time'));
      setEditTime({});
    }
    setOpenModal(false);
  }


  useEffect(() => {
    const stored = localStorage.getItem("timers");
    if (stored) {
      setTimersList(JSON.parse(stored));
    }


  }, [])

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timersList));
  }, [timersList])

  return (
    <>
      <div className='w-[100vw] h-[100vh] box-border flex flex-col  items-center p-[4vw] bg-[#02a16f]'>
        <section className=' flex flex-wrap   p-[2vw] gap-[5vw] sm:w-[80vw] md:w-[60vw] justify-center items-center rounded-md bg-[#287cb3ef]'>
          <section className='flex  gap-[1rem] justify-center items-center border-box bg-gray-200 p-[1vw] rounded-md '>
            <p className='text-center text-xl font-bold'>count is : {count}</p>
            <p className='flex gap-[1rem]'>
              <button className=' w-[2.5rem] h-[2.5rem]   rounded-md text-3xl font-bold bg-sky-600 cursor-pointer hover:scale-110' onClick={() => { setCount(count + 1) }}>+</button>
              <button className=' w-[2.5rem] h-[2.5rem]  rounded-md text-3xl font-bold bg-sky-600 cursor-pointer hover:scale-110' onClick={() => { if (count != 0) setCount(count - 1) }}>-</button>
            </p>
          </section>

          <section className='font-bold  flex flex-col justify-center items-center border-box bg-gray-200 p-[1vw] rounded-md'>
            <p>Time Spend at this site :</p>
            <span ><TimeSpentComponent showformat={showformat} /> </span>
          </section>
        </section>
        <button onClick={() => { setOpenModal(true); }} className='mt-[1rem] bg-[#287cb3ef] border-box p-[0.4rem] rounded-md cursor-pointer hover:scale-110 font-semibold '>Add Timer</button>


        <section className='w-100vw h-auto p-[1vw] flex flex-wrap gap-[2vw] justify-center  mt-[1rem] overflow-scroll overflow-y-scroll
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden'>
          {timersList.length !== 0 && (
            timersList.map(e => {
              return <CounterComponent e={e} setEditTime={setEditTime} setOpenModal={setOpenModal} deleteTimer={deleteTimer} secondsTimer={secondsTimer} />
            })
          )}

        </section>
      </div>

      {openModal && <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-white p-[2vw] rounded-md'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className='absolute right-3 font-bold cursor-pointer'
          onClick={() => setOpenModal(false)}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>

        <form onSubmit={HandleSubmit} className='flex flex-col gap-[1rem] mt-[2.4rem]'>
          <input name='date-time' type="datetime-local" className='cursor-pointer outline-none border border-box p-[0.1vw] rounded-md' defaultValue={editTime.time} placeholder='Enter time' />
          <button type='submit' className='bg-red-500 p-[0.3rem] rounded-md cursor-pointer'>Submit</button>
        </form>
      </section>}
    </>
  )
}

export default App
