import { Button } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { FunctionComponent } from "react";


export const CustomizedSnackbar: FunctionComponent = () => {
    return <SnackbarProvider action={(key) => (
        <Button
            onClick={() => closeSnackbar(key)}
            sx={{
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%'
            }}
        />
    )}
        anchorOrigin={{
            horizontal: 'center',
            vertical: 'top'
        }}
        dense
        maxSnack={10}
    />
}