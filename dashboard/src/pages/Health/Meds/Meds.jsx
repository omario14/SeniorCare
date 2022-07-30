import React, { useEffect, useState } from 'react'
import { GiEyedropper, GiPill, GiSpoon } from 'react-icons/gi';
import Select, { components } from 'react-select';
import seniorService from '../../../services/senior.service';
import './Meds.css';
export default function Meds() {
    const [seniorList, setSeniorList] = useState([]);
    const [senior, setSenior] = useState(null)
    const [loading, setLoading] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const [endDate, setEndDate] = useState(new Date(date).toISOString().split("T")[0]);
    const [medLabel, setMedLabel] = useState("");
    const [dose, setDose] = useState("");

    let [num, setNum] = useState(0);




    let incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
        }
    };
    let decNum = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    }
    let handleChange = (e) => {
        setNum(e.target.value);
    }

    const { Option } = components;
    const retrieveSeniors = () => {
        try {
            setLoading(false);
            seniorService.getAll().then((result) => {
                setSeniorList(result.data);
            });

            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveSeniors();
        return () => {
            setSeniorList([]);
        };
    }, []);
    const customStyles = {
        control: base => ({
            ...base,
            marginTop: 6,
            height: 41,
            minHeight: 41,
        })
    };
    const renderCustomItem = (props) => {
        return <Option  {...props}>
            <img
                src={`http://localhost:8080/files/${props.data.file}`}
                style={{ width: 36, height: 36, marginRight: 20 }}
                alt={props.data.name}
            />
            {props.data.name}
        </Option >;
    }
    const saveMedication = (e) => {
        e.preventDefault();
        let medication = {
            label: medLabel,
            dose: num,
            doseType: dose,
            startDate: startDate,
            endDate: endDate,
            senior: senior,

        }
        console.log("medication",medication)
        seniorService.addMedication(medication)

    }

    /*************Dose Type ********************/
    const doseType = [
        {
            value: "PILL",
            label: (
                <span>
                    <GiPill /> Pill(s)
                </span>
            ),
        },
        {
            value: "SPOON",
            label: (
                <span>
                    <GiSpoon /> Spoon(s)
                </span>
            ),
        },
        {
            value: "DROP",
            label: (
                <span>
                    <GiEyedropper /> Drop(s)
                </span>
            ),
        },
    ]

    return (
        <div className='meds '>


            <div className="container-fluid py-4 ">

                <h1>ADD Meds To :</h1>
                <div className="personalInfo" >
                    <h2 className="ui-heading ui-heading--h2 ui-question__title">Who is the checkup for?</h2>
                    <Select
                        getOptionLabel={e => e.name + '  ' + e.lastname}
                        getOptionValue={e => e.id}
                        key={e => e.id}
                        onChange={(value) => { setSenior(value); console.log(senior) }}
                        options={seniorList}
                        components={{ Option: renderCustomItem }} />
                </div>
                <form>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="name">Meds</label>
                            <input onChange={(e) => { setMedLabel(e.target.value) }} type="text" id="name" placeholder="Medication name here" />
                        </div>
                        <div className="column">

                            <label htmlFor="email">Dose a day</label>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>




                                <input style={{ width: "35px", height: "35px" }} type="button" value="-" className="button-minus border rounded-circle  icon-shape icon-sm mx-1 " onClick={decNum} data-field="quantity" />
                                <input style={{ width: "65px", paddingLeft: "30px" }} type="number" className="form-control" value={num} onChange={handleChange} />
                                <input style={{ width: "35px", height: "35px" }} type="button" value="+" className="button-plus border rounded-circle icon-shape icon-sm " onClick={incNum} data-field="quantity" />





                                <div style={{ width: "40%" }}>
                                    <Select


                                        options={doseType}
                                        onChange={(value) => { setDose(value.value) }}
                                        styles={customStyles} />
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="subject">Treatment Start Date</label>
                            <div className="input-groupp-icon">
                                <input
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input--style-4"
                                    type="date"
                                    name="Date"
                                    format="{yyyy-MM-dd}"
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>



                        </div>
                        <div className="column">
                            <label htmlFor="contact">Treatment End Date</label>
                            <div className="input-groupp-icon">
                                <input
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="input--style-4"
                                    type="date"
                                    name="Date"
                                    format="{yyyy-MM-dd}"
                                    min={startDate}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="issue">Reason</label>
                            <textarea id="issue" placeholder="Describe your issue in detail here" rows="3"></textarea>
                        </div>
                    </div>
                    <button onClick={(e)=>saveMedication}>Submit</button>
                </form>


            </div>
        </div>
    )
}
