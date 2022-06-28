import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import { TabTitle } from "../../utils/GeneralFunctions";

class Meal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mealImg:'../../../../assets/img/images/CategoryImages/output-onlinegiftools.gif',
      addMeal: false,
    };
  }



  render() {

    TabTitle('Meal');
    const { user: currentUser } = this.props;
    if (!currentUser || !currentUser.roles.includes("ROLE_CHEF")) {
      return <Navigate to="/notFound" />;

    }
    return (
      <div className="ingredients">
        <TopBar title={'Meal'} />

        {!this.state.addMeal ?
          <>
            <div className="addIng">
              <div style={{ marginBottom: "80px" }}>

                <h1 className='text-uppercase'>Meal</h1>
                <p className='text-uppercase'>LET'S prepare today's Meal</p>
              </div>
              <form onSubmit={this.handleSave}>
                <div className="addIngRow">
                  <div className="addIngRowImage">
                    <figure className="image-containeer">
                      <img src={this.state.mealImg} id="chosen-image" />
                      <figcaption id="file-name"></figcaption>
                    </figure>

                    <input type="file" id="upload-button" accept="image/*" onChange={this.imageHandler} />
                    <label className='imageIconIng' htmlFor="upload-button">
                      <i className="fas fa-upload"></i> &nbsp; Choose A Photo
                    </label>
                  </div>
                </div>
                <div className="addIngRow">
                  <div className="column">
                    <label htmlFor="name">Label</label>
                    <input type="text" id="name" value={this.state.label}
                      onChange={this.onChangeLabel} placeholder="Ingredient name here" />
                  </div>

                  <div className="column">
                    <label htmlFor="name">Label</label>
                    <input type="text" id="name" value={this.state.label}
                      onChange={this.onChangeLabel} placeholder="Ingredient name here" />
                  </div>
                  <div className="column">
                    <label htmlFor="name">Label</label>
                    <input type="text" id="name" value={this.state.label}
                      onChange={this.onChangeLabel} placeholder="Ingredient name here" />
                  </div>

                 
                </div>

                <div className="addIngRow">
                  <div className="column">
                    <label htmlFor="issue">Describe your ingredient</label>
                    <textarea id="issue" value={this.state.description}
                      onChange={this.onChangeDescription} placeholder="Describe your issue in detail here" rows="3"></textarea>
                  </div>
                </div>

                <button type='submit'>Submit</button>
              </form>
            </div>
          </>
          :
          <>
          </>
        }


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
export default connect(mapStateToProps)(Meal);
