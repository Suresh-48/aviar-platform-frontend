import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function  Table() {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}  style={{ color: '#2b753f' }} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ color: '#ba2727' }}/>),
        DetailPanel: forwardRef((props, ref) => <FontAwesomeIcon  {...props} ref={ref} icon={faChevronRight} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => { console.log('NextPage:',props);return(
          <FontAwesomeIcon {...props} ref={ref} icon={faChevronRight} className="custom-chevron"  style={{ fontSize: "18px !important", color: "#000 !important" }}/>)
     }),
        PreviousPage: forwardRef((props, ref) => {
          console.log('PreviousPage props:',props); return (
       
          <FontAwesomeIcon {...props} ref={ref} icon={faChevronLeft} className="custom-chevron" />) }),
        
        // NextPage: forwardRef((props, ref) => <FontAwesomeIcon {...props} ref={ref} icon={faChevronRight} /> ),
        // PreviousPage: forwardRef((props, ref) => <FontAwesomeIcon {...props} ref={ref}  icon={faChevronLeft} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
    }