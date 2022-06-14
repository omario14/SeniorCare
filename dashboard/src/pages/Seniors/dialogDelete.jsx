function Dialog({ message, onDialog }) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex:9999,
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)"
          
        }}
        onClick={() => onDialog(false)}
      >
        <div className="dialogg"
          onClick={(e) => e.stopPropagation()}
         
        >
          <h3 className="text-uppercase" stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3>
          
          <div style={{ display: "flex", alignItems: "center" ,marginTop:"80px"}}>
            <button
              onClick={() => onDialog(true)}
              className="btn  btn-rounded"
              style={{
                border: "2px solid ",
               
                marginRight: "10px",
               backgroundColor:"#D24548",
                cursor: "pointer"
              }}
            >
              Yes
            </button>
            <button
              onClick={() => onDialog(false)}
              className="btn  btn-rounded"
              style={{
                
                border: "2px solid ",
                marginLeft: "10px",
                backgroundColor:"#45d263",
                cursor: "pointer"
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default Dialog;
  