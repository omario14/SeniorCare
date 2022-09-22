import React from 'react'
import "./Accordion.scss"
export default function Accordion() {
    return (


        <div class="accordion-wrap">
            <a class="accordion" data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" >
                <div class="teaser">
                    <div class="time">
                        <h5>10:15 – 11:00 Uhr</h5>
                    </div>

                    <div class="title">
                        <h3>Unterthema Y</h3>
                        <h6 class="theme">Themenblock 4</h6>
                    </div>
                </div>

                <div class="collapse" id="collapseOne">
                    <div class="content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>

                <div class="accordion-toggle">
                    <span class="one"></span>
                    <span class="two"></span>
                </div>
            </a>



            <a class="accordion" data-toggle="collapse" href="#collapseTwo" role="button" aria-expanded="false" >
                <div class="teaser">
                    <div class="time">
                        <h5>10:15 – 11:00 Uhr</h5>
                    </div>

                    <div class="title">
                        <h3>Unterthema Y</h3>
                        <h6 class="theme">Themenblock 4</h6>
                    </div>
                </div>

                <div class="collapse" id="collapseTwo">
                    <div class="content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>

                <div class="accordion-toggle">
                    <span class="one"></span>
                    <span class="two"></span>
                </div>
            </a>



            <a class="accordion" data-toggle="collapse" href="#collapseThree" role="button" aria-expanded="false" >
                <div class="teaser">
                    <div class="time">
                        <h5>10:15 – 11:00 Uhr</h5>
                    </div>

                    <div class="title">
                        <h3>Unterthema Y</h3>
                        <h6 class="theme">Themenblock 4</h6>
                    </div>
                </div>

                <div class="collapse" id="collapseThree">
                    <div class="content">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>

                <div class="accordion-toggle">
                    <span class="one"></span>
                    <span class="two"></span>
                </div>
            </a>
        </div>

    )
}
