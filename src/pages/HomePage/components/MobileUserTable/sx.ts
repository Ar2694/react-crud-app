const sx = (theme:any) =>({
    display: "none",
    [theme.breakpoints.down('md')]: {
        display: "flex"
      },
    "& .table":{
        padding: "20px",
    },
    "& .sort-icon":{
        verticalAlign: "bottom",
        cursor: "pointer"
    },
    "b":{
        fontWeight: 700,
    },
    "& .label":{
        minWidth: "155px"
    },
    "& .label-container":{
        margin: "20px 0"
    },
    "& .user-row":{
        padding: "10px",
        borderBottom: "1px solid #000000"
    },
    "& .user-info-label":{
        wordBreak:"break-all"
    },
    "& .no-user-box":{
        margin: "20px 0 0 0"
    }
})

export default sx;