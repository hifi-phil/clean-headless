import { TranslationModel } from "@/api-clean/model";
import { HomeContentResponseModel } from "@/api/model";
import { getNavigation } from "@/umbraco";
import { getDictionValue } from "@/helpers/dictionary";
import { MainNavigationCollapse } from "./mainNavigationCollapse";

export const MainNavigation = async (props: { dictionary?: TranslationModel[], homePage?: HomeContentResponseModel }) => {
    const navigation = await getNavigation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href={props.homePage?.route?.path}>{getDictionValue(props.dictionary, "Navigation.SiteName")}</a>
                <MainNavigationCollapse navigation={navigation} dictionary={props.dictionary} homePage={props.homePage} />
            </div>
        </nav>
    );
}