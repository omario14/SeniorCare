import React, { useRef, useState } from "react";
import {

    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Body from "./Body";
import SelectSenior from "./SelectSenior";
import SelectSymptoms from "./Symptoms";
import { useReactToPrint } from "react-to-print";
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form'
import symptomsService from "../../../services/symptoms.service";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { FaPrint } from "react-icons/fa";



const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0),

    },
}));




function getSteps() {
    return [
        "Introduction",
        "Personal Information",
        "Symptoms",
        "More Informations",
    ];
}
const Introduction = () => {
    return (
        <>


            <div className="ui-container" >
                <div className="ui-message__content" style={{ flex: "1", padding: "15% 2%" }}>
                    <h2 className="ui-heading ui-heading--h2 ui-message__title">Hello!</h2>
                    <p className="ui-text">You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.</p>
                </div>
                <div className="ui-message__aside" style={{ flex: "1" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 204" className="ui-icon ui-message__illustration" id="message-illustration" >
                        <path fillRule="evenodd" clipRule="evenodd" d="M205.697 204C226.916 182.355 240 152.705 240 120 240 53.726 186.274 0 120 0S0 53.726 0 120c0 32.705 13.084 62.355 34.303 84h171.394z" fill="#EDF6FD"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M188 183h12l4 20h-12l-4-20z" fill="#FEDDB8" stroke="#333D48" strokeWidth="2"></path><path opacity=".15" d="M190 189l10-2.5" stroke="#1F262C" strokeWidth="2"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M142 153h9v50h-17v-22l-3 7-15-4c0-31 26-31 26-31zm34 0h-9v50h17v-22l3 7 15-4c0-31-26-31-26-31z" fill="#71B5F0"></path>
                        <path d="M151 153h1a1 1 0 00-1-1v1zm0 50v1a1 1 0 001-1h-1zm-17 0h-1a1 1 0 001 1v-1zm0-22h1a1 1 0 00-1.919-.394L134 181zm-3 7l-.258.966a1 1 0 001.177-.572L131 188zm-15-4h-1a1 1 0 00.742.966L116 184zm51-31v-1a1 1 0 00-1 1h1zm0 50h-1a1 1 0 001 1v-1zm17 0v1a1 1 0 001-1h-1zm0-22l.919-.394A1.001 1.001 0 00183 181h1zm3 7l-.919.394a1 1 0 001.177.572L187 188zm15-4l.258.966A1 1 0 00203 184h-1zm-51-32h-9v2h9v-2zm1 51v-50h-2v50h2zm-18 1h17v-2h-17v2zm-1-23v22h2v-22h-2zm-1.081 7.394l3-7-1.838-.788-3 7 1.838.788zm-16.177-3.428l15 4 .516-1.932-15-4-.516 1.932zM142 153l-.001-1h-.027l-.066.001a20.292 20.292 0 00-1.108.063c-.743.063-1.795.189-3.055.44-2.517.5-5.882 1.501-9.255 3.512C121.676 160.077 115 168.158 115 184h2c0-15.158 6.324-22.577 12.512-26.266 3.127-1.864 6.262-2.8 8.62-3.269a26.025 26.025 0 012.836-.408c.339-.029.603-.043.78-.05.088-.004.154-.005.197-.006l.046-.001h.01l-.001-1zm25 1h9v-2h-9v2zm1 49v-50h-2v50h2zm16-1h-17v2h17v-2zm-1-21v22h2v-22h-2zm4.919 6.606l-3-7-1.838.788 3 7 1.838-.788zm13.823-4.572l-15 4 .516 1.932 15-4-.516-1.932zM176 153l-.001 1h.01l.046.001c.043.001.109.002.197.006.177.007.441.021.78.05.68.058 1.658.174 2.836.408 2.358.469 5.493 1.405 8.62 3.269C194.676 161.423 201 168.842 201 184h2c0-15.842-6.676-23.923-13.488-27.984-3.373-2.011-6.738-3.012-9.255-3.512a27.795 27.795 0 00-3.055-.44 20.292 20.292 0 00-1.108-.063l-.066-.001h-.027l-.001 1z" fill="#333D48"></path>
                        <path opacity=".15" d="M167 165l5 4" stroke="#1F262C" strokeWidth="3"></path>
                        <path opacity=".15" fillRule="evenodd" clipRule="evenodd" d="M133 154h4l4 48h-8v-48z" fill="#1F262C"></path>
                        <path opacity=".15" d="M151 165l-5 4" stroke="#1F262C" strokeWidth="3"></path>
                        <path fill="#fff" stroke="#333D48" strokeWidth="2" d="M151 153h16v50h-16z"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M151 142v11s0 7 8 7 8-7 8-7v-11h-16z" fill="#FEDDB8" stroke="#333D48" strokeWidth="2"></path>
                        <path opacity=".15" d="M152 145s7 2 14 0" stroke="#1F262C" strokeWidth="3"></path><path fillRule="evenodd" clipRule="evenodd" d="M191 75v36h-4V75h4z" fill="#5F7285" stroke="#333D48" strokeWidth="2"></path><path fillRule="evenodd" clipRule="evenodd" d="M131 116s0 28 28 28 28-28 28-28V80h-56v36z" fill="#FEDDB8" stroke="#333D48" strokeWidth="2"></path><path d="M159 105v8s-3 0-3 3 3 3 3 3h1" stroke="#333D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 203h200" stroke="#333D48" strokeWidth="2" strokeLinecap="round"></path><path d="M62 158a5 5 0 015-5h62a5 5 0 015 5v39H62v-39z" fill="#D6DDE3" stroke="#333D48" strokeWidth="2"></path><path fillRule="evenodd" clipRule="evenodd" d="M60 197c0 6 5.7 6 5.7 6h64.6s5.7 0 5.7-6H60z" fill="#D6DDE3" stroke="#333D48" strokeWidth="2"></path><circle cx="98" cy="175" r="4" fill="#fff" stroke="#333D48" strokeWidth="2"></circle><path fillRule="evenodd" clipRule="evenodd" d="M95.007 111c3.305 0 5.993-2.688 5.993-6.005V43H1v61.995A5.998 5.998 0 006.993 111H74l15 15v-15h6.007z" fill="#fff" stroke="#333D48" strokeWidth="2"></path><path fill="#D6DDE3" d="M16 61h70v2H16zm0 6h35v2H16z"></path>
                        <rect x="17" y="78" width="20" height="18" rx="2" fill="#fff" stroke="#D6DDE3" strokeWidth="2"></rect>
                        <path d="M23 86l3 3 5-5" stroke="#71B5F0" strokeWidth="2"></path>
                        <rect x="41" y="78" width="20" height="18" rx="2" fill="#fff" stroke="#D6DDE3" strokeWidth="2"></rect>
                        <path d="M48 84l6 6m0-6l-6 6" stroke="#71B5F0" strokeWidth="2"></path>
                        <rect x="65" y="78" width="20" height="18" rx="2" fill="#fff" stroke="#D6DDE3" strokeWidth="2"></rect>
                        <path d="M78 87l-3.5 3.5M78 87l-3.5-3.5M78 87h-7" stroke="#71B5F0" strokeWidth="2"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 40a6 6 0 016-6h88a6 6 0 016 6v3H1v-3z" fill="#E7EBEF" stroke="#333D48" strokeWidth="2"></path><circle cx="7.5" cy="38.5" r="1.5" fill="#FA514F"></circle><circle cx="12.5" cy="38.5" r="1.5" fill="#FFC037"></circle><circle cx="17.5" cy="38.5" r="1.5" fill="#2DC692"></circle><path fill="#71B5F0" d="M2 44h98v8H2z"></path>
                        <path d="M141 103s2-2 8-2m29 2s-2-2-8-2" stroke="#333D48" strokeWidth="2" strokeLinecap="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M151 125h16s-.005 7-8.003 7C151 132 151 125 151 125z" fill="#333D48" stroke="#333D48" strokeWidth="2"></path><path fillRule="evenodd" clipRule="evenodd" d="M167 125h-16s0 2.1 1.314 4h13.369c1.315-1.9 1.317-4 1.317-4z" fill="#fff"></path><path d="M151 125v-1h-1v1h1zm16 0l1 .001.001-1.001H167v1zm-14.686 4l-.822.569.298.431h.524v-1zm13.369 0v1h.523l.299-.431-.822-.569zM151 126h16v-2h-16v2zm2.137 2.431c-.561-.811-.849-1.678-.995-2.354a7.033 7.033 0 01-.126-.809 5.5 5.5 0 01-.014-.216l-.002-.048v-.008.003l-1 .001-1 .001v.015l.001.028.002.092a8.65 8.65 0 00.184 1.362c.183.849.552 1.982 1.305 3.071l1.645-1.138zm-.823 1.569h13.369v-2h-13.369v2zM167 125l-1-.001v-.004.008l-.002.048a6.585 6.585 0 01-.141 1.025c-.146.677-.435 1.543-.996 2.355l1.644 1.138c.754-1.088 1.124-2.221 1.307-3.07.092-.427.139-.79.163-1.05a6.058 6.058 0 00.024-.404l.001-.028v-.016l-1-.001z" fill="#333D48"></path>
                        <rect x="171" y="107" width="4" height="6" rx="2" fill="#333D48"></rect>
                        <rect x="144" y="107" width="4" height="6" rx="2" fill="#333D48"></rect>
                        <path opacity=".15" d="M184.098 86.166C179.39 87.818 172.65 89 163 89c-10 0-16-4-20-4s-12 0-12 10" stroke="#1F262C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M131 111h-4V84s0-16 12-14c0 0 0-14 20-14 26 0 36 18.5 36 19s0 13-32 13c-10 0-16-4-20-4s-12 0-12 10v17z" fill="#5F7285" stroke="#333D48" strokeWidth="2"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M124 111a7 7 0 017-7v14a7 7 0 01-7-7zm70 0a7 7 0 01-7 7v-14a7 7 0 017 7z" fill="#FEDDB8"></path>
                        <path d="M131 104h1v-1h-1v1zm0 14v1h1v-1h-1zm56 0h-1v1h1v-1zm0-14v-1h-1v1h1zm-56-1a8 8 0 00-8 8h2a6 6 0 016-6v-2zm1 15v-14h-2v14h2zm-9-7a8 8 0 008 8v-2a6 6 0 01-6-6h-2zm64 8a8 8 0 008-8h-2a6 6 0 01-6 6v2zm-1-15v14h2v-14h-2zm9 7a8 8 0 00-8-8v2a6 6 0 016 6h2z" fill="#333D48"></path>
                        <path d="M169 74s8 1 13-3m-20 9s10 2 18-2" stroke="#333D48" strokeWidth="2" strokeLinecap="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M146 148h5v15l-5 4-4-14 4-5zm26 0h-5v15l5 4 4-14-4-5z" fill="#71B5F0"></path>
                        <path d="M151 148h1v-1h-1v1zm-5 0v-1h-.481l-.3.375.781.625zm5 15l.625.781.375-.3V163h-1zm-5 4l-.962.275.413 1.445 1.174-.939L146 167zm-4-14l-.781-.625-.322.403.141.497L142 153zm25-5v-1h-1v1h1zm5 0l.781-.625-.3-.375H172v1zm-5 15h-1v.481l.375.3L167 163zm5 4l-.625.781 1.174.939.413-1.445L172 167zm4-14l.962.275.141-.497-.322-.403L176 153zm-25-6h-5v2h5v-2zm1 16v-15h-2v15h2zm-5.375 4.781l5-4-1.25-1.562-5 4 1.25 1.562zm-5.587-14.506l4 14 1.924-.55-4-14-1.924.55zm4.181-5.9l-4 5 1.562 1.25 4-5-1.562-1.25zM167 149h5v-2h-5v2zm1 14v-15h-2v15h2zm4.625 3.219l-5-4-1.25 1.562 5 4 1.25-1.562zm2.413-13.494l-4 14 1.924.55 4-14-1.924-.55zm-3.819-4.1l4 5 1.562-1.25-4-5-1.562 1.25z" fill="#333D48"></path>

                    </svg>
                </div>
            </div>





        </>
    );
}
const PersonalInformation = () => {

    return (
        <>

            <div className="personalInfo" >
                <h2 className="ui-heading ui-heading--h2 ui-question__title">Who is the checkup for?</h2>
                <SelectSenior />
            </div>
        </>
    );
}
const SymptomsInformation = () => {

    return (
        <>

            <div className="input__container">

                <div className="searchSymptom">
                    <h2 className="ui-heading ui-heading--h2 ui-question__title">Add your symptoms</h2>
                    <p className="ui-text evidence-search-body-widget__hint">Add as many symptoms as you can for the most accurate results.</p>
                    <SelectSymptoms />
                </div>
                <div className="bodySymptom">

                    <Body />
                </div>


            </div>

        </>
    );
}
const MoreInformation = () => {
    const { control } = useFormContext();

    return (
        <>
            <Controller control={control}
                name="note"
                render={({ field }) => (
                    <TextField
                        id="note"
                        multiline={true}
                        rows={8}
                        label="Note "
                        variant="filled"
                        placeholder="Enter a Note"
                        fullWidth
                        margin="normal"
                        {...field}

                    />
                )} />


        </>
    );
}
function getStepContent(step) {
    switch (step) {
        case 0:
            return <Introduction />

        case 1:
            return <PersonalInformation />
        case 2:
            return <SymptomsInformation />
        case 3:
            return <MoreInformation />
        default:
            return "unknown step";
    }
}

const LinaerStepper = () => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const methods = useForm({
        defaultValues: {
            senior: [],
            note: "",
            symptoms: [],
            symptomss: [],
        }
    });
    const [allsymptoms, setAllSymptoms] = useState();
    const [acccordion, setAcordion] = useState(null);
    const [results, setResults] = useState([]);
    const [expandInfo, setExpandInfo] = useState(false);
    const [buttonPrint, setButtonPrint] = useState(false);
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });


    const handleNext = () => {

        setActiveStep(activeStep + 1);
        setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };



    const onSubmit = (data) => {

        const newState = [...data.symptoms, ...data.symptomss].reduce((res, data, index, arr) => {
            if (res.findIndex(symp => symp.id === data.id) < 0) {
                res.push(data);

            }
            return res;
        }, [])



        console.log("newstate", newState);
        setAllSymptoms(newState)
        console.log("alll", methods.control._formValues);
        allsymptoms.map((symp) => {
            return (
                symptomsService.updateSymptoms(symp.id).then((result) => {
                    console.log(result.data)
                }))
        })


    }
    const handleConfirm = () => {
        symptomsService.checkIllnes()
            .then((result) => {
                const sorted = [...result.data].sort((a, b) => (

                    (a["rate"] / a["symptoms"].length) < (b["rate"] / b["symptoms"].length) ? 1 : -1)
                );

                setResults(sorted);
                setButtonPrint(true);
            })
    }

    const toggleAccordion = (i) => {


        if (acccordion === i) {
            return setAcordion(null)
        }


        return setAcordion(i)


    }


    return (
        <div>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                    const labelProps = {};
                    const stepProps = {};

                    return (
                        <Step {...stepProps} key={index}>
                            <StepLabel {...labelProps}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <div className="symptomResult">


                    {buttonPrint ?
                        <Button onClick={handlePrint}  style={{ width:"50%"}} fileName="Hello" variant="contained" className={classes.button + " position-absolute mt-3  font-weight-bold start-50 translate-middle"}>
                           <FaPrint/> &nbsp;  Print
                        </Button>
                        
                        :
                        <Button
                            onClick={handleConfirm}
                            className={classes.button + " position-absolute mt-3 font-weight-bold   start-50 translate-middle"}
                            variant="contained"
                            color="primary"

                            style={{ width:"60%"}}>
                            Result
                        </Button>


                    }

                    <div ref={ref} className="mt-5">
                        <div className="page-content page-container" id="page-content" >
                            <div className="py-5">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-lg-11 grid-margin stretch-card">
                                        <div className="cardSymptom">
                                            <div className="card-body">
                                                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", marginRight: "25px" }}>
                                                    <div className="text-dark" style={{ color: "black", fontSize: "25px" }} >Informations </div>
                                                    <button onClick={() => setExpandInfo(!expandInfo)} className="btn-link" style={{ background: "none", color: "#1471c9" }}>{expandInfo ? <> Show <MdExpandMore size={20} /></> : <> Hide <MdExpandLess size={20} /></>}</button>

                                                </div>
                                                <div className={expandInfo ? "mt-4 collapse" : "mt-4 collapse show "}>
                                                    <div className="accordion" id="accordion" role="tablist">



                                                        <div className="row mb-5" >
                                                            <h5 >Senior Info </h5>
                                                            <div className="col-3">
                                                                <p className="card-description center" >Name</p>
                                                                <span className="text-capitalize">{methods.control._formValues.senior.name}</span>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6 className="card-description center" >Lastname</h6>
                                                                <span className="text-capitalize">{methods.control._formValues.senior.lastname}</span>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6 className="card-description center">Date of birth</h6>
                                                                <p className="text-capitalize">{methods.control._formValues.senior.dateOfBirth}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <h6 className="card-description center">Sex</h6>
                                                                <span className="text-capitalize">{methods.control._formValues.senior.sex}</span>
                                                            </div>
                                                            {methods.control._formValues.note &&
                                                                <div className="col-3 " style={{ width: "100%" }}>
                                                                    <h6 className="card-description center">Note </h6>
                                                                    <span className="text-capitalize" >
                                                                        {methods.control._formValues.note}
                                                                    </span>


                                                                </div>
                                                            }
                                                        </div>




                                                        <div className="row" >
                                                            <h5 >Symptoms</h5>

                                                            <ul className="o-vertical-spacing " style={{ margin: "5px 0 0 12px" }} >


                                                                {allsymptoms.map((symptom, i) => (
                                                                    <li key={i} style={{ listStyleType: "circle" }} >

                                                                        <span className="text-capitalize">{symptom.label}</span>


                                                                    </li>

                                                                ))}
                                                            </ul>



                                                        </div>



                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-content page-container" id="page-content">
                            <div className="py-5">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-lg-11 grid-margin stretch-card">
                                        <div className="cardSymptom">
                                            <div className="card-body">
                                                <h4>Results</h4>
                                                <p className="card-description center">Possible conditions</p>
                                                <div className="mt-4">
                                                    <div className="accordion" id="accordion" role="tablist">
                                                        {results.filter(result => result.rate !== 0).map((res, index) => (


                                                            <div key={index} className="cardSymptom">
                                                                <div className="card-header" role="tab" id="heading-1">
                                                                    <h6 className="mb-0">
                                                                        <a onClick={() => toggleAccordion(res.id)} className="collapsed" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2" data-abc="true">
                                                                            {res.label}
                                                                        </a>
                                                                    </h6>
                                                                </div>
                                                                <div id="collapse-1" className={acccordion === res.id ? "collapse show " : "collapse "} role="tabpanel" aria-labelledby="heading-1" data-parent="#accordion" >
                                                                    <div className="card-body">
                                                                        <div className="row">

                                                                            <div className="col-3" style={{ marginRight: "60px", width: "100px", height: "100px" }}>
                                                                                <CircularProgressbar

                                                                                    value={(res.rate / res.symptoms.length)}
                                                                                    maxValue={1}
                                                                                    strokeWidth={5}
                                                                                    text={`${Math.floor((res.rate / res.symptoms.length) * 100)}%`}
                                                                                    styles={(res.rate / res.symptoms.length) > 0.5 ? buildStyles({
                                                                                        textColor: "red",
                                                                                        pathColor: "red",


                                                                                    }) : " "}
                                                                                />
                                                                            </div>


                                                                            <div className="col-9 ">
                                                                                <h4>What is {res.label} ?</h4>
                                                                                <p className="mb-0">{res.description}</p>
                                                                                <div className="col-9 mt-5">
                                                                                    <h4>What to Do/Take !</h4>
                                                                                    <p className="mb-0">{res.treatment}</p>
                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>{getStepContent(activeStep)}
                            <Button
                                className={classes.button}
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                back
                            </Button>

                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                type="submit"
                            >
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </form>
                    </FormProvider>


                </>
            )}
        </div>
    );
};

export default LinaerStepper;