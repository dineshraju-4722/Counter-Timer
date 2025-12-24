import { useEffect, useState } from "react"

export default function ({ showformat }) {

    const [reload, setReload] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setReload(reload => reload + 1);
        }, 1000);
    }, [])
    return (<>{showformat(reload)} s</>)
}