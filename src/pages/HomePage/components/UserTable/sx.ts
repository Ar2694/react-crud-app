const sx = (theme:any) =>({
    [theme.breakpoints.down('md')]: {
        display: "none"
      },
    "& .sort-icon":{
        verticalAlign: "bottom",
        cursor: "pointer"
    }
})

export default sx;