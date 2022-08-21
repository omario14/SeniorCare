import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TabTitle } from "../../utils/GeneralFunctions";

import TopBar from "../../components/TopBar/TopBar";
import './Food.css';
import chefService from "../../services/chef.service";
import { format } from "date-fns";

class Food extends Component {
    constructor(props) {
        super(props);

        this.state={
            activeType:"All",
            filtered:[],
            menu:[],
        }

    }
    componentDidMount = ()=>{
        try {
           
            chefService.getAllMenus().then((result) => {
                this.setState({
                    menu:result.data,
                })
            });           
        } catch (e) {
            console.log(e);
        }
    }

   
    
    render() {
        TabTitle("Food");
        const { user: currentUser } = this.props;
        if (!currentUser ) {
            return <Navigate to="/login"/>
        }else if(currentUser.roles[0].name!=="ROLE_ACCOMPAGNANT"){
            return <Navigate to="/notFound" />;
          }
          
        return (
            <div className="food">
                <main className="main-content  position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    <TopBar title={"Food"} />
                    <div className="container-fluid py-4">
                        <section id="menu" className="menu section-bg">
                            <div className="container" data-aos="fade-up">

                                <div className="section-title">
                                    <h2>Menu</h2>
                                    <p>Check Our Tasty Menu</p>
                                </div>

                                <div className="row" data-aos="fade-up" data-aos-delay="100">
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <ul id="menu-flters">
                                            <li  className={this.state.activeType==="All" ? 'filter-active':''} onClick={()=>this.setState({activeType:"All"})}>All</li>
                                            <li  className={this.state.activeType==="BREAKFAST" ? 'filter-active':''} onClick={()=>this.setState({activeType:"BREAKFAST"})}>BreakFast</li>
                                            <li  className={this.state.activeType==="LUNCH" ? 'filter-active':''} onClick={()=>this.setState({activeType:"LUNCH"})}>Lunch</li>
                                            <li  className={this.state.activeType==="DINNER" ? 'filter-active':''} onClick={()=>this.setState({activeType:"DINNER"})}>Dinner</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">

                                    {this.state.menu
                                        .map((m,index)=>{
                                            return(
                                            <div key={index} className="col-lg-6 menu-item filter-starters">
                                            <img src="../../../assets/img/menu/lobster-bisque.jpg" className="menu-img" alt="" />
                                            <div className="menu-content">
                                                <a href="#"> {format(new Date(m.date),'eeee, PP')}</a><span>{m.id}</span>
                                            </div>
                                            <div className="menu-ingredients">
                                               zeaffffffffffffffffffffffffffffffffffffffffff
                                            </div>
                                            </div>
                                        )
                                        })
                                        
                                    }
                                    

                                  

                                </div>

                            </div>
                        </section>
                    </div>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(Food);
