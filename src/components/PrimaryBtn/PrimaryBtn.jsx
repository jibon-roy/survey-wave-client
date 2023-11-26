import { Button } from "@mui/material";


const PrimaryBtn = ({ children, variant, main, btn }) => {
    return (
        <Button
            variant={variant ? variant : `contained`}
            sx={main ? { color: '#009EFF', fontWeight: 'bold', fontSize: '20px' } : btn ? { color: '#009EFF' } : { color: 'white' }}>
            {children}
        </Button>
    );
};

export default PrimaryBtn;