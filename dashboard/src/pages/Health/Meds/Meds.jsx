import React, { useEffect, useState, useRef } from 'react'
import { GiEyedropper, GiPill, GiReturnArrow, GiSpoon, GiSyringe } from 'react-icons/gi';
import { Button, ButtonGroup } from '@mui/material'
import Select, { components } from 'react-select';
import seniorService from '../../../services/senior.service';
import Pagination from '../../Chef/Pagination';
import Dialog from '../../Seniors/dialogDelete';
import './Meds.css';
import { useForm } from 'react-hook-form';
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import chefService from '../../../services/chef.service';



export default function Meds({ onChangeStepperLoading }) {
    const [seniorList, setSeniorList] = useState([]);
    const [senior, setSenior] = useState(null);
    const [seniorMedications, setSeniorMedications] = useState([]);
    const [loading, setLoading] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const [endDate, setEndDate] = useState(new Date(date).toISOString().split("T")[0]);
    const [medLabel, setMedLabel] = useState(null);
    const [dose, setDose] = useState("");
    const [num, setNum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [medsPerPage, setMedsPerPage] = useState(3);
    const [message, setMessage] = useState("");
    const [deleteModel, setDeleteModel] = useState(false);
    const [order, setOrder] = useState("DSC");
    const [seniorError, setSeniorError] = useState(false);
    const [doseTError,setDoseTError]=useState(false);
    const [dateError,setDateError]=useState(false);

    const { Option } = components;
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    const section = useRef(null);
    const myRef = useRef(null);

    let incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
            clearErrors("dose");
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

    /************************* Delete Meds ***********************/
    const deleteMed = (med) => {
        handleDialog("Are you sure you want to delete ?", true)
        myRef.current = med;
    }

    const handleDialog = (message, isLoading) => {

        setMessage(message);
        setDeleteModel(isLoading);


    };
    const areUSureDelete = (choose) => {
        if (choose) {
            const Meds = seniorMedications.filter(item => item.idmed !== myRef.current.idmed);
            seniorService.removeMedById(myRef.current.idmed)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (Math.ceil(seniorMedications.length / medsPerPage) != Math.ceil(Meds.length / medsPerPage)) {
                        setCurrentPage(Math.ceil(Meds.length / medsPerPage))
                    }

                    setSeniorMedications(Meds);

                });

            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };



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

    const retrieveMeds = (senior) => {

        try {
            seniorService.getMedicationBySenior(senior.id)
                .then((res) => {
                    if (order === "ASC") {
                        const sorted = [...res.data].sort((a, b) =>
                            a["idmed"] > b["idmed"] ? 1 : -1
                        );

                        setSeniorMedications(sorted);

                    }
                    if (order === "DSC") {
                        const sorted = [...res.data].sort((a, b) =>
                            a["idmed"] < b["idmed"] ? 1 : -1
                        );

                        setSeniorMedications(sorted);

                    }
                })

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        retrieveMeds(senior);

    }, [senior]);
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
    useEffect(() => {
        sorting("idmed")


    }, [order]);
    const sorting = (col) => {

        if (order === "ASC") {
            const sorted = [...seniorMedications].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );

            setSeniorMedications(sorted);

        }
        if (order === "DSC") {
            const sorted = [...seniorMedications].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );

            setSeniorMedications(sorted);

        }
    }
    const customStylesAsc = {
        control: base => ({
            ...base,
            marginTop: 6,
            width: 150,
            height: 41,
            size: 30,
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

    

    const seniorValidation = () => {

        if (!senior) {
            setSeniorError(true);
        }
        if (!dose){
          setDoseTError(true);
        }
        if (startDate>endDate){
         setDateError(true);
        }else{setDateError(false)}
    }

    function getDatesInRange(startDate, endDate) {
      const date = new Date(startDate);
    
      const dates = [];
    
      while (date <= endDate) {
        dates.push(new Date(date).toISOString().split("T")[0]);
        date.setDate(date.getDate() + 1);
      }
    
      return dates;
    }

    const archiveAdd=(meds)=>{
      const dates = getDatesInRange(new Date(startDate),new Date(endDate));
         console.log("datesss",dates)
      dates.forEach(d=>{
        let archive = {
          idArch: `arch-${senior.id}-${d}`,
          senior: senior,
          date: new Date(d).toISOString().split("T")[0],
         
          
          
  
      }
  
  
      seniorService.addToArchive(archive).then(()=>{
        console.warn("Archiveid : ",meds.idmed," Med Id : ",meds.idmed-1)
        seniorService.putMedsToArchive(archive.idArch,meds.idmed,false);
      })
      
      })
      
    }
    const saveMedication = (e) => {
       
      

        let medic = {
            label: medLabel,
            dose: num,
            doseType: dose.value,
            startDate: startDate,
            endDate: endDate,
            senior: senior,

        }
        seniorService.addMedication(medic).then(
            (res) => {
                console.log(res)
                const newMedication = [res.data, ...seniorMedications];
                setSeniorMedications(newMedication);
                archiveAdd(res.data)
               
            }
        )
        clearInput();
        
        window.scrollTo({
            top: section.current.offsetTop,
            behavior: 'smooth',
        });
        console.log("startDate: ",startDate," enDate : ", endDate)



    }
    const clearInput = ()=>{
      /********** Clear inputs *********/
      setStartDate(new Date().toISOString().split("T")[0]);
    
      setEndDate(new Date(date).toISOString().split("T")[0]);
    
      setMedLabel("");
      setDose("");
      setNum(0);
      if (order === "ASC") {
          setCurrentPage(Math.ceil(seniorMedications.length / medsPerPage))
      }
      if (order === "DSC") {
          setCurrentPage(1)
      }

    }
    // Get current meals
    const indexOfLastMed = currentPage * medsPerPage;
    const indexOfFirstMed = indexOfLastMed - medsPerPage;
    const currentMeds = seniorMedications.slice(indexOfFirstMed, indexOfLastMed);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const seniorStyle = {
        control: base => ({
            ...base,
            borderColor: '#f31111',
            // This line disable the blue border
            boxShadow: ' 0 0 0 1px #f31111'
        })
    };
    const AscorDsc = [
        {
            value: "ASC",
            label: (
                <span>
                    <RiSortAsc /> ASC                </span>
            ),
        },
        {
            value: "DSC",
            label: (
                <span>
                    <RiSortDesc /> DSC
                </span>
            ),
        },]
    /*************Dose Type ********************/
    const doseTypeOptions = [
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
        {
          value: "INJECTION",
          label: (
              <span>
                  <GiSyringe /> Injection(s)
              </span>
          ),
      },
    ]

    return (
      <div className="meds ">
        <div className="timeline_area section_padding_130">
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "26px",
            }}
          >
            <ButtonGroup variant="text" aria-label="text button group">
              <Button onClick={() => onChangeStepperLoading("health")}>
                <GiReturnArrow /> &nbsp;&nbsp; Return
              </Button>
            </ButtonGroup>
          </div>

          <div className="container-fluid py-5 ">
            <div className="personalInfoMed">
              <h2 className="ui-heading ui-heading--h2 ui-question__title">
                Who is the checkup for?
              </h2>
              <Select
                getOptionLabel={(e) => e.name + "  " + e.lastname}
                getOptionValue={(e) => e.id}
                key={(e) => e.id}
                onChange={(value) => {
                  setSenior(value);
                  setCurrentPage(1);
                  setSeniorError(false);
                  setDoseTError(false);
                  setDateError(false);
                  clearErrors();
                  clearInput();
                }}
                options={seniorList}
                components={{ Option: renderCustomItem }}
                styles={seniorError&& seniorStyle}
              />
              <div>
                {seniorError && (
                  <span className="text-sm text-danger">
                    Please select senior first !
                  </span>
                )}
              </div>
            </div>
            <form>
              <div className="rowMed">
                <div className="column">
                  <label htmlFor="name">Meds</label>
                  <input
                    value={medLabel}
                    {...register("medLabel",  {required:"Medication's name is required! "})}
                    onChange={(e) => {
                      setMedLabel(e.target.value);
                      clearErrors("medLabel");
                    }}
                    type="text"
                    id="name"
                    placeholder="Medication name here"
                  />
                  <div>
                    {errors.medLabel && (
                      <span className="text-sm text-danger">
                        {errors.medLabel.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="column">
                  <label htmlFor="email">Dose a day</label>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      style={{ width: "35px", height: "35px" }}
                      type="button"
                      value="-"
                      className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                      onClick={decNum}
                      data-field="quantity"
                    />
                    <input
                      style={{ width: "65px", paddingLeft: "30px" }}
                      type="number"
                      className="form-control"
                      value={num}
                      readOnly
                      {...register("dose", {
                        required: "Dose requierd !",
                        pattern: /^[0-9+-]+$/,
                        min: {
                          value: 1,
                          message:
                            "Dose value must be greater than or equal to 1 !",
                        },
                       
                      })}
                      onChange={handleChange}
                    />
                    <input
                      style={{ width: "35px", height: "35px" }}
                      type="button"
                      value="+"
                      className="button-plus border rounded-circle icon-shape icon-sm "
                      onClick={incNum}
                      data-field="quantity"
                    />

                    <div style={{ width: "40%" }}>
                      
                      <Select
                        
                        options={doseTypeOptions}
                        onChange={(value) => {
                          setDose(value);
                          setDoseTError(false);
                        }}
                        value={dose}
                        styles={doseTError?seniorStyle:customStyles}
                      />
                    </div>
                   
                  </div>
                  <div>
                    {errors.dose && (
                      <span className="text-sm text-danger">
                        {errors.dose.message}
                      </span>
                    )}
                    <br/>
                    {doseTError && (
                  <span className="text-sm text-danger">
                    Please select Dose type !
                  </span>
                )}
                  </div>
                </div>
              </div>
              <div className="rowMed">
                <div className="column">
                  <label htmlFor="subject">Treatment Start Date</label>
                  <div className="input-groupp-icon">
                    <input
                      value={startDate}
                      onChange={(e) => {setStartDate(e.target.value);if(e.target.value<endDate){setDateError(false)}}}
                      className="input--style-4"
                      type="date"
                      name="Date"
                      format="{yyyy-MM-dd}"
                      min={new Date().toISOString().split("T")[0]}
                      style={{ borderColor:dateError&& '#f31111',
                      // This line disable the blue border
                      boxShadow: dateError&& ' 0 0 0 1px #f31111'}}

                    />
                   
                   
                  </div>
                  <div style={{position:"absolute",bottom:"55px"}}>
                    {dateError && (
                  <span className="text-sm text-danger">
                    EndDate must be greater than StartDate
                  </span>
                )}
                    </div>
                </div>
                <div className="column">
                  <label htmlFor="contact">Treatment End Date</label>
                  <div className="input-groupp-icon">
                    <input
                      value={endDate}
                      onChange={(e) => {setEndDate(e.target.value);setDateError(false);}}
                      className="input--style-4"
                      type="date"
                      name="Date"
                      format="{yyyy-MM-dd}"
                      min={startDate}
                      style={{ borderColor:dateError&& '#f31111',
                      // This line disable the blue border
                      boxShadow: dateError&& ' 0 0 0 1px #f31111'}}
                    />
                  </div>
                  
                </div>
              
              </div>

              <div class="col-6 text-end mt-7 " style={{ marginLeft: "7%" }}>
                <a
                  class="btn bg-gradient-dark mb-0"
                  onClick={handleSubmit(saveMedication, seniorValidation)}
                  href="javascript:;"
                >
                  <i class="fas fa-plus"></i>&nbsp;&nbsp;Add{" "}
                </a>
              </div>
            </form>
            <div className="row " style={{ height: "500px" }} ref={section}>
              <div className="col-12 mt-4 mb-8">
                <div className="card">
                  <div className="card-header pb-0 px-3">
                    <h6 className="mb-0">Medication Table</h6>
                    <div
                      style={{
                        position: "absolute",
                        right: "50px",
                        top: "8px",
                      }}
                    >
                      <Select
                        menuPlacement="top"
                        options={AscorDsc}
                        value={{
                          label:
                            order === "ASC" ? (
                              <span>
                                <RiSortAsc /> ASC{" "}
                              </span>
                            ) : (
                              <span>
                                <RiSortDesc /> DSC
                              </span>
                            ),
                          value: order,
                        }}
                        onChange={(value) => {
                          setOrder(value.value);
                        }}
                        styles={customStylesAsc}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "50%",
                        top: "-30px",
                      }}
                    >
                      <Pagination
                        currentPage={currentPage}
                        mealsperpage={medsPerPage}
                        totalmeals={seniorMedications.length}
                        paginate={paginate}
                      />
                    </div>
                  </div>
                  <div className="card-body pt-4 p-3">
                    <ul className="list-group">
                      {currentMeds && currentMeds.map((meds, index) => (
                        <li
                          key={index}
                          className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                        >
                          <div className="d-flex flex-column">
                            <h6 className="mb-3 text-sm">{meds.idmed}</h6>
                            <span className="mb-2 text-xs">
                              Drug Name:{" "}
                              <span className="text-dark font-weight-bold ms-sm-2">
                                {meds.label}
                              </span>
                            </span>
                            <span className="mb-2 text-xs">
                              Drug Dose:{" "}
                              <span className="text-dark ms-sm-2 font-weight-bold">
                                {meds.dose} {meds.doseType}
                              </span>
                            </span>
                            <span className="text-xs">
                              Treatment Start Date:{" "}
                              <span className="text-dark ms-sm-2 font-weight-bold">
                                {meds.startDate}
                              </span>
                            </span>
                            <span className="text-xs">
                              Treatment End Date:{" "}
                              <span className="text-dark ms-sm-2 font-weight-bold">
                                {meds.endDate}
                              </span>
                            </span>
                          </div>

                          <div className="ms-auto text-end">
                            <a
                              className="btn btn-link text-danger text-gradient px-3 mb-0"
                              onClick={(e) => deleteMed(meds, e)}
                              href="javascript:;"
                            >
                              <i className="far fa-trash-alt me-2"></i>Delete
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {deleteModel && <Dialog onDialog={areUSureDelete} message={message} />}
      </div>
    );
}
