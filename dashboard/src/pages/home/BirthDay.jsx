import React, { useEffect, useState } from 'react'
import seniorService from '../../services/senior.service';
import { getAge, getBithdate } from '../../utils/GeneralFunctions';

export default function BirthDay() {
    const [seniors,setSeniors] = useState([]);


    useEffect(() => {
        seniorService.getAll().then((response) => {
            setSeniors(response.data.filter((s) => (getBithdate(s.dateOfBirth)===true)).sort((a, b) =>
                a.dateOfBirth < b.dateOfBirth ? 1 : -1
            ).map((d) => {
                 
           
                return {
                    id: d.id,
                    name:d.name,
                    lastname:d.lastname,
                    age: getAge(d.dateOfBirth),
                    image:d.file,
                    sex:d.sex,
                }
            }))
        })

    }, [])
  return (
    <div className="card">
    <div className="card-header pb-0">
      <div className="row">
        <div className="col-lg-6 col-7">
          <h6>Birthdays</h6>
          <p className="text-sm mb-0">
            <i className="fa fa-check text-info" aria-hidden="true"></i>
            <span className="font-weight-bold ms-1">{seniors.length} birthday</span> for this day
          </p>
        </div>
       
      </div>
    </div>
    <div className="card-body px-0 pb-2">
    <div className="wrap">
    <div className="gift">
      <div className="giftcard">{
        seniors.length!==0 ?
     seniors.map((s,i)=>
        <div key={i}>
        {s.image === null ?
                    <>
                      {s.sex === "male" ?
                        <img
                          src="..\..\..\assets\img\images\avatarNoimage.jpg"
                          style={{ borderRadius: "50%",padding:"5px" }} width="30px" height="30px"
                          alt="user1"
                        />
                        :
                        <img
                          src="..\..\..\assets\img\images\avatarW.jpg"
                          style={{ borderRadius: "50%",padding:"5px" }} width="30px" height="30px"
                          alt="user1"
                        />

                      }

                    </>
                    :
                    <img style={{ borderRadius: "50%",padding:"5px" }} width="30px" height="30px" src={process.env.REACT_APP_API_URL + `/files/${s.image}`} alt='seniorImage' />
                  }
   {s.name + " "+s.lastname +" "+ s.age+" years old" }
   
        <br /></div> )
        :
        <div>
        no parties for today 😔
        </div>
        }</div>
      <div className="gift_top">
        <div className="ribbon_right"></div>
        <div className="ribbon_left"></div>
        <div className="gift_box_top"></div>
        <div className="gift_ribbon_left"></div>
      </div>
      <div className="gift_ribbon_center"></div>
      <div className="gift_box_bottom_top"></div>
      <div className="gift_box_bottom">
        <div className="gift_box_bottom_ribbon" id="ribbon1"></div>
        <div className="gift_box_bottom_ribbon" id="ribbon2"></div>
        <div className="gift_box_bottom_ribbon" id="ribbon3"></div>
        <div className="gift_box_bottom_ribbon" id="ribbon4"></div>
      </div>
    </div>
    <div className="cake">
      <div className="one_number">
        <div className="one_flame"></div>
      </div>
      <div className="seven_number">
        <div className="seven_flame"></div>
      </div>
      <div className="cake_top2">
        <div className="cake_top1_creams">
          <div className="cake_top1_cream1"></div>
          <div className="cake_top1_cream2"></div>
          <div className="cake_top1_cream3"></div>
          <div className="cake_top1_cream4"></div>
          <div className="cake_top1_cream5"></div>
          <div className="cake_top1_cream6"></div>
          <div className="cake_top1_cream7"></div>
          <div className="cake_top1_cream8"></div>
          <div className="cake_top1_cream9"></div>
          <div className="cake_top1_cream10"></div>
          <div className="cake_top1_cream11"></div>
          <div className="cake_top1_cream12"></div>
          <div className="cake_top1_cream13"></div>
        </div>
      </div>
      <div className="cake_top1">
        <div className="cherry" id="cherry1"></div>
        <div className="cherry" id="cherry2"></div>
        <div className="cherry" id="cherry3"></div>
        <div className="cherry" id="cherry4"></div>
        <div className="cherry" id="cherry5"></div>
        <div className="circles">
          <div className="cake_circle" id="circle1"></div>
          <div className="cake_circle" id="circle2"></div>
          <div className="cake_circle" id="circle3"></div>
          <div className="cake_circle" id="circle4"></div>
          <div className="cake_circle" id="circle5"></div>
        </div>
        <div className="cake_line" id="cake_line1"></div>
        <div className="cake_line" id="cake_line2"></div>
        <div className="cake_line" id="cake_line3"></div>
        <div className="cake_line" id="cake_line4"></div>
        <div className="cake_line" id="cake_line5"></div>
        <div className="cake_line" id="cake_line6"></div>
        <div className="cake_line" id="cake_line7"></div>
        <div className="cake_line" id="cake_line8"></div>
        <div className="cake_line" id="cake_line9"></div>
        <div className="cake_line" id="cake_line10"></div>
        <div className="cake_line" id="cake_line11"></div>
        <div className="cake_line" id="cake_line12"></div>
        <div className="cake_line" id="cake_line13"></div>
        <div className="cake_line" id="cake_line14"></div>
        <div className="cake_line" id="cake_line15"></div>
        <div className="cake_line" id="cake_line16"></div>
        <div className="cake_line" id="cake_line17"></div>
        <div className="cake_line" id="cake_line18"></div>
        <div className="cake_line" id="cake_line19"></div>
        <div className="cake_line" id="cake_line20"></div>
        <div className="cake_line" id="cake_line21"></div>
        <div className="cake_line" id="cake_line22"></div>
        <div className="cake_line" id="cake_line23"></div>
        <div className="cake_line" id="cake_line24"></div>
      </div>
      <div className="cake_bottom3">
        <div className="cake_bottom3_creams">
          <div className="cake_bottom3_cream1"></div>
          <div className="cake_bottom3_cream2"></div>
          <div className="cake_bottom3_cream3"></div>
          <div className="cake_bottom3_cream4"></div>
          <div className="cake_bottom3_cream5"></div>
          <div className="cake_bottom3_cream6"></div>
          <div className="cake_bottom3_cream7"></div>
          <div className="cake_bottom3_cream8"></div>
          <div className="cake_bottom3_cream9"></div>
          <div className="cake_bottom3_cream10"></div>
          <div className="cake_bottom3_cream11"></div>
          <div className="cake_bottom3_cream12"></div>
          <div className="cake_bottom3_cream13"></div>
          <div className="cake_bottom3_cream14"></div>
          <div className="cake_bottom3_cream15"></div>
          <div className="cake_bottom3_cream16"></div>
          <div className="cake_bottom3_cream17"></div>
          <div className="cake_bottom3_cream18"></div>
          <div className="cake_bottom3_cream19"></div>
          <div className="cake_bottom3_cream20"></div>
          <div className="cake_bottom3_cream21"></div>
          <div className="cake_bottom3_cream22"></div>
          <div className="cake_bottom3_cream23"></div>
        </div>
      </div>
      <div className="cake_bottom2">
        <div className="cake_bottom1_creams">
          <div className="cake_bottom1_cream1"></div>
          <div className="cake_bottom1_cream2"></div>
          <div className="cake_bottom1_cream3"></div>
          <div className="cake_bottom1_cream4"></div>
        </div>
      </div>
      <div className="cake_bottom">
      </div>
    </div>
    <div className="line"></div>
  </div>
  </div>
                </div>
  )
}
