import { Box } from "@mui/material";
import { Button, ButtonGroup } from "react-bootstrap";

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
          
          
          
          <Box
                                mt={5}
                                mb={5}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <ButtonGroup
                                    style={{ textAlign: "center", height: "40px" }} color="outlined" aria-label="outlined primary button group"
                                >
                                    <Button 
                                        style={{
                                            border: "2px solid ",
                                            alignItems: "center",
                                            borderRadius: "12px",
                                            cursor: "pointer",
                                            width :"120px"
                                        }} onClick={() => onDialog(true)}>
                                        Yes
                                    </Button> <Button style={{
                                        border: "2px solid ",
                                        alignItems: "center",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        width :"120px"

                                    }} onClick={() => onDialog(false)}>
                                        No
                                    </Button>
                                </ButtonGroup >
                            </Box>
           
          </div>
        </div>
      
    );
  }
  export default Dialog;
  