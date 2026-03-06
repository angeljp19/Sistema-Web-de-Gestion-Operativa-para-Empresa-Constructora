import { empleados } from "../api/empleados"
import { useEffect, useState } from "react"

interface cardProps{
    title: string,
    value: string,
    color: string
}
function Card(props: cardProps){
    return(
        <div className="flex w-full rounded-r-2xl rounded-l-lg bg-gray-200 justify-between">
            <div className={`h-full rounded-l-2xl ${props.color} w-2 `}></div>
            <div className="w-full flex justify-between items-center p-4">
                <h2 className="text-md lg:text-lg font-semibold">{props.title}</h2>
                <p className={`text-lg `}>{props.value}</p>
            </div>
        </div>
    )
}

export function PersonalSummary() {
    const [empleadosData, setEmpleadosData] = useState<any[]>([])

    useEffect(() => {
        async function fetchEmpleados() {
            await empleados.getAll().then((data) => {
                setEmpleadosData(data)
            }).catch((error) => {                console.error("Error fetching empleados:", error);
            })
        }
        fetchEmpleados()
    }, [])


    return(
        <div className="flex flex-col w-full gap-4">
            <h1 className="text-lg lg:text-2xl font-bold">Personal de la empresa</h1>
            <div className="flex flex-col gap-4">
                <Card title="Empleados" value={empleadosData.length.toString()} color="bg-yellow-300" />
                <Card title="Trabajadores en planta" value={empleadosData.filter((e) => e.en_planta).length.toString()} color="bg-green-500" />
                <Card title="Trabajadores fuera de planta" value={empleadosData.filter((e) => !e.en_planta).length.toString()} color="bg-red-500" />
            </div>
        </div>
    )
}