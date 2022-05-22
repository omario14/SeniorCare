import React from 'react'

export default function SecondField({page,setPage,formData,setFormData}) {
  return (
    <div>
        
        <fieldset  id="form2">
                <div className="sub__title__container">
                    <p>Step {page + 1} /3</p>
                    <h2>What best describes you ?</h2>
                    <p className='ui-text '>Please let us know what type of business best describes you as entreprenuer or businessman.</p>
                </div>
                <div className="input__container">
                    <div className="selection newB">
                        <div className="imoji">
                            <ion-icon name="happy"></ion-icon>
                        </div>
                        <div className="descriptionTitle">
                            <h3>New Business</h3>
                            <p>Started trading in last 12 months</p>
                        </div>
                    </div>
                    <div className="selection exitB">
                        <div className="imoji">
                            <ion-icon name="business"></ion-icon>
                        </div>
                        <div className="descriptionTitle">
                            <h3>Existing Business</h3>
                            <p>Have been operating beyond 12 months</p>
                        </div>
                    </div>
                    
                </div>
            </fieldset>
    </div>
  );
}
