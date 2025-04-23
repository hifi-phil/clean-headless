import { TranslationModel } from "@/api-clean/model";
import { HomeContentResponseModel } from "@/api/model"
import { getNavigation } from "@/umbraco";
import { getDictionValue } from "@/helpers/dictionary";

export const MainNavigation = async (props: { dictionary?: TranslationModel[], homePage?: HomeContentResponseModel }) => {

    const navigation = await getNavigation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href={props.homePage?.route?.path}>{getDictionValue(props.dictionary, "Navigation.SiteName")}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    {getDictionValue(props.dictionary, "Navigation.MenuTitle")}
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href={props.homePage?.route?.path}>{props.homePage?.name}</a>
                        </li>
                        {navigation.map((page, index) => (
                            <li key={index} className="nav-item">
                                <a className="nav-link px-lg-3 py-3 py-lg-4" href={page.route?.path}>{page.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>        
    )
}