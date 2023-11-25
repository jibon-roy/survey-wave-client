import { Button } from "@mui/material";


const PrimaryBtn = ({ children, variant, main }) => {
    return (
        <Button
            variant={variant ? variant : `contained`}
            sx={main ? { color: '#009EFF', fontWeight: 'bold', fontSize: '20px' } : { color: 'white' }}>
            {children}
        </Button>
    );
};

export default PrimaryBtn;