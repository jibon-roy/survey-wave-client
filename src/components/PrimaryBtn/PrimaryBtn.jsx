import { Button } from "@mui/material";
import { PropTypes } from "prop-types";

const PrimaryBtn = ({ children, variant, main, btn }) => {
    return (
        <Button
            variant={variant ? variant : `contained`}
            sx={main ? { color: '#009EFF', fontWeight: 'bold', fontSize: '20px' } : btn ? { color: '#009EFF' } : { color: 'white' }}>
            {children}
        </Button>
    );
};

PrimaryBtn.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrimaryBtn;