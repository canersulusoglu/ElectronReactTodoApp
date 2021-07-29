import { useTranslation } from "react-i18next";

function Header(props){
    const { t } = useTranslation();
    return(
        <div className="Header">
            <h2>{t('Header')}</h2>
        </div>
    )
}

export default Header;