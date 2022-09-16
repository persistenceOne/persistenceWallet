import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
    background: ${({theme}) => theme.bodyBackground};
    }
    .header .navbar{
    background: ${({theme}) => theme.navigationBackground};
    }
    .header .navbar .navbar-nav li a:hover, .header .navbar .navbar-nav li a.active, .header .navbar .navbar-nav li a:focus,
    .navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link{
    color: ${({theme}) => theme.navItemActiveColor};
    }
   .txns-container .MuiPaper-root{
    background-color: ${({theme}) => theme.tableBackground} !important;
    border: 1px solid ${({theme}) => theme.tableBorderColor} !important;
   }
   .validators-section table{
    border: 1px solid ${({theme}) => theme.tableBorderColor} !important;
    }
   .txns-container table thead, .validators-section table thead{
    border-bottom: 1px solid ${({theme}) => theme.tableBorderColor} !important;
    }
    
    .wallet-main-section .tabs-section .nav-tabs, .validators-section .main-header{
      border: 1px solid ${({theme}) => theme.tableBorderColor} !important;  
    }           
    .wallet-main-section .tabs-section .nav-tabs .nav-link:nth-child(2), 
    .validators-section .main-header .left .nav-pills .nav-item:nth-child(2){
        border-left: 1px solid ${({theme}) => theme.tableBorderColor} !important;
        border-right: 1px solid ${({theme}) => theme.tableBorderColor} !important;
    }
    .wallet-main-section .tabs-section .nav-tabs .nav-link:nth-child(3){
    border-right: 1px solid ${({theme}) => theme.tableBorderColor} !important;
    }
    .wallet-main-section .send-container, .wallet-main-section .receive-container{
    border: 1px solid ${({theme}) => theme.tableBorderColor} !important;  
    }
    .wallet-main-section .tabs-section .nav-tabs .nav-link.active,
    .validators-section .main-header .left .nav-pills .nav-link.active, 
    .validators-section .main-header .left .nav-pills .show > .nav-link{
        color: ${({theme}) => theme.activeTabTextColor};
    }
    .wallet-main-section .tabs-section .nav-tabs .nav-link:focus, 
    .wallet-main-section .tabs-section .nav-tabs .nav-link:hover,
    .wallet-main-section .tabs-section .nav-tabs .nav-link.active,
    .validators-section .main-header .left .nav-pills .nav-link.active, 
    .validators-section .main-header .left .nav-pills .show > .nav-link{
    border-bottom: 2px solid ${({theme}) => theme.activeTabBorderColor};
    }
    .wallet-main-section .txns-container table thead th, .validators-section table thead th{
        border-color: ${({theme}) => theme.tableRowBorder};
    }
    .wallet-main-section .txns-container table tbody td{
      color: ${({theme}) => theme.lineValueColor};
    }
    .wallet-main-section .txns-container table tbody td, .validators-section table tbody td{
    border-color: ${({theme}) => theme.tableRowBorder};
     color: ${({theme}) => theme.lineValueColor};
    }
    .token-info-section .info-heading, .token-info-section .heading-section .address-section .address{
    color: ${({theme}) => theme.infoHeadingColor};
    }
    .token-info-section .info-box, .advanced-wallet-accordion .card .collapse.show{
    border-color:${({theme}) => theme.tableBorderColor} !important;;
    }
    .validators-section .main-tab-content .active-inactive-validators .left .nav-pills .nav-link,
    .wallet-main-section .tabs-section .tab-content .tab-header .left .nav-pills .nav-link{
      border-color:${({theme}) => theme.tableBorderColor};
    }
    .token-info-section .info-box .line .value, .token-info-section .heading-section .address-section .dropdown-toggle{
     color: ${({theme}) => theme.lineValueColor};
    }
    .header{
        border-bottom: 1px solid ${({theme}) => theme.tableBorderColor};
    }
    .wallet-main-section .txns-container .pagination-custom{
     background-color: ${({theme}) => theme.tableBackground} !important;
    }
    .form-field .label, .mnemonic-result, .custom-file-section .custom-file .file-name {
    color: ${({theme}) => theme.labelColor} !important;
    }
    .modal-content{
        background-color: ${({theme}) => theme.tableBackground} !important; 
    }
    .modal-custom .modal-header, .create-wallet-modal.seed .modal-header .heading{
     color: ${({theme}) => theme.lineValueColor};
    }
    .pagination-custom .buttons button svg{
      fill:${({theme}) => theme.paginationIconColor};
    }
   .pagination-custom .buttons button:disabled svg,
    .pagination-custom .buttons button[disabled] svg{
      fill:${({theme}) => theme.paginationDisabledIconColor};
    }
    .validators-section table tbody .voting{
     color: ${({theme}) => theme.votingPowerColor};
    }
    .validators-section table thead th span button .MuiButton-label div{
    color:#8D9CB5 !important;
    }
    .validators-section .info .info-name{
    color: ${({theme}) => theme.infoHeadingColor};
    }
    .actions-modal .actions-modal-body .moniker-box .info .name{
     color: ${({theme}) => theme.infoHeadingColor};
    }
    .actions-modal .actions-modal-body .moniker-box .info .commission,
    .actions-modal .actions-modal-body .website .name,
    .advanced-wallet-accordion .card .card-header p,
    .actions-modal .actions-modal-body .description p,
    .modal-list-data table th, table td,
    .modal-custom .modal-header .heading,
    .fee{
     color: ${({theme}) => theme.infoHeadingColor};
    }
    .validators-list-selection, .copy-section .copy-result{
      color: #8D9CB5 !important;
    }
    .form-control, .validators-list-selection, .claim-rewards-modal .rewards-modal-body input, .rewards-validators-list >
     div > div:nth-child(2), .rewards-validators-list > div button, .rewards-validators-list .react-select__control ,
     .rewards-validators-list .react-select__menu, .react-select__menu .react-select__option:active{
        background-color: ${({theme}) => theme.inputBackground} !important;
    }
    
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
    {
      -webkit-box-shadow: 0 0 0 30px ${({theme}) => theme.inputBackground}  inset !important;
    }
    
    input:-webkit-autofill
    {
      -webkit-text-fill-color: #8D9CB5 !important;
    }

    .rewards-validators-list > div button{
     color: #8D9CB5 !important;
    }

    .rewards-validators-list > div > div:nth-child(2) div:first-child input, {
     color: #8D9CB5 !important;
     background-color: #F5F6FA !important;
     border-color:#F5F6FA !important;
    }
    .rewards-validators-list > div > div:nth-child(2) > div > div,  .react-select__menu .react-select__option:active, 
    .react-select__menu .react-select__menu-list .react-select__option{
     color: #8D9CB5 !important;
    }
    .list-modal-body .unbonding-schedule-list p{
      color: ${({theme}) => theme.infoHeadingColor};
    }   
    .claim-rewards-modal .rewards-modal-body .available-tokens .tokens, .result-container p{
     color: ${({theme}) => theme.lineValueColor};
    }
    .refresh-button svg{
        fill:${({theme}) => theme.refreshButtonColor} !important;
    }
    .form-field .info-data .value, .fee-alert, .fee-title, .form-field .info-data{
     color: ${({theme}) => theme.lineValueColor};
    }
    .wallet-main-section .receive-container .address{
    color: ${({theme}) => theme.lineValueColor};
    }
    .faq-modal-body .nav-pills .box .nav-link{
     border-color: ${({theme}) => theme.modalBorderColor};
    }
    .faq-modal-body .nav-pills .box p{
     color: ${({theme}) => theme.lineValueColor};
    }
    .faq-modal-body .accordion .card{
        border-color: ${({theme}) => theme.modalBorderColor};
    }
    .faq-modal-body .accordion .card-header p{
      color: ${({theme}) => theme.lineValueColor};
    }
    .faq-modal-body .accordion .card-body p{
        color: ${({theme}) => theme.lineValueColor};
    }
    .claim-rewards-modal .rewards-modal-body .available-tokens .usd, .fee-container .fee-box .title, .fee-container .fee-box .gas, .fee-container .fee-box .xprt{
    color: ${({theme}) => theme.lineValueColor};
    }
    .navigate-buttons .button-secondary, .modal-header .previous-section .button{
     background: ${({theme}) => theme.backButtonBgColor};
    }
    .navigate-buttons .button-secondary .icon, .modal-header .previous-section .button .icon{
    fill:${({theme}) => theme.refreshButtonColor} !important;
    }
    .header .profile-section .profile-dropdown .dropdown-menu,
    .header .help-section .profile-dropdown .dropdown-menu{
     background: ${({theme}) => theme.tableBackground};
      border-color: ${({theme}) => theme.profileDropDownBorder};
    }
    .header .profile-section .profile-dropdown .dropdown-menu .dropdown-footer{
     border-color: ${({theme}) => theme.profileDropDownBorder};
    }
    .header .profile-section .profile-dropdown .dropdown-menu .dropdown-footer p:first-child{
     border-color: ${({theme}) => theme.profileDropDownBorder};
    }
    .note-section{
    background: ${({theme}) => theme.noteBackground};
    }
      .note-section p{
    color: ${({theme}) => theme.noteFontColor};
    }
    .header .profile-section .profile-dropdown .dropdown-menu .dropdown-footer .generate-keystore{
       color: ${({theme}) => theme.lineValueColor};
    }
    .modal-header button.close{
     color: ${({theme}) => theme.lineValueColor};
    }
    .available-tokens .info-data{
      color: ${({theme}) => theme.lineValueColor};
    }
    .header .profile-section .profile-dropdown .copy-button .icon, .copy-button .icon{
      fill:${({theme}) => theme.copyIconColor};
    }
    .fee-container .fee-box{
     background: ${({theme}) => theme.feeBoxBackground};
    }
    .sidebar-section, .sidebar-container .MuiPaper-root{
    background: ${({theme}) => theme.bodyBackground};
    }
    .MuiSelect-icon{
    fill:${({theme}) => theme.selectIconColor} !important;
    }
    .MuiPaper-root.MuiMenu-paper {
       background-color: ${({theme}) => theme.tableBackground} !important;
    };
   .MuiPaper-root.MuiMenu-paper .validator-item, .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover, .MuiMenuItem-root{
     border-bottom: 1px solid ${({theme}) => theme.selectItemBorderColor} !important;
     color: ${({theme}) => theme.infoHeadingColor};
   };
   .modal-content .form-check label{
     color: ${({theme}) => theme.selectIconColor};
   }
`;
