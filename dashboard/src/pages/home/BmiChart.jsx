import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import {  XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import seniorService from '../../services/senior.service';



export default function BmiChart() {
    const [seniors, setSeniors] = useState([]);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    useEffect(() => {
        seniorService.getAll().then((response) => {
            setSeniors(response.data.filter((r) => (r.bmi !== 0)).sort((a, b) =>
                a.dateOfBirth < b.dateOfBirth ? 1 : -1
            ).map((d) => {
                return {
                    id: d.id,
                    bmi: Number(d.bmi.toFixed(1)),
                    age: getAge(d.dateOfBirth),
                    sex: d.sex,
                    name:d.name,
                    image:d.file,
                }
            }))
        })

    }, [])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
              
              <p className="desc">Anything you want can be displayed here.</p>
            </div>
          );
        }
      
        return null;
      };

    const CountBMI = () => {
        let moy = 0;
        seniors.map((s) => {
           return moy = moy + Number(s.bmi);
        })
        return (moy / seniors.length).toFixed(2);
    }
    const CustomizedLine = (value) => {
        

        switch (true) {
            case (value < 18.5):
                return "secondary";
            case (18.5 <= value <= 24.9):
                return "success";
            case (25.0 <= value <= 29.9):
                return "secondary";
            case (30.0 <= value <= 34.9):
                return "warning";
            case (35 < value):
                return "danger";
            default:
                break;
        }
    }
    const CustomizedDot = (value) => {
       


        if (18.5 <= value <= 24.9) {
            return (
                <svg  width={20} height={20} fill="green" viewBox="0 0 1024 1024">
                    <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
                </svg>
            );
        }

        return (
            <svg  width={20} height={20} fill="red" viewBox="0 0 1024 1024">
                <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
            </svg>
        );
    };
    return (
        <div className="card z-index-2">
            <div className="card-header pb-0">
                <h6>Sales overview</h6>
                <p className="text-sm">
                    {CustomizedDot(CountBMI)} &nbsp;
                    <span className="font-weight-bold"> average bmi of seniors is <Badge bg={CustomizedLine(CountBMI)}> {<CountBMI/>} </Badge></span> in {new Date().toISOString().split("T")[0]}
                </p>
            </div>
            <div className="card-body p-3">
                <div className="chart">
                    <AreaChart width={700} height={250} data={seniors}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="age" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                        <Area type="monotone" dataKey="bmi" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="sex" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </div>
            </div>
        </div>



    )
}
