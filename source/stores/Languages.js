import {observable,computed,action} from 'mobx';
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 
import {I18nManager,AsyncStorage} from 'react-native';
import { Updates } from 'expo';
const translationGetters = {
    ar: () => require('../translations/ar.json'),
    en: () => require('../translations/en.json'),
};
export default class Languages {
    /*--Global Value--*/
    @observable serverUri = 'http://moonworld.cf/';
    /*--Static Value--*/
    @observable locale = {lang:'en',isRTL:false};

    @action translate = memoize(
        (key, config) => i18n.t(key, config),
        (key, config) => (config ? key + JSON.stringify(config) : key)
    );

    @action setI18nConfig = (lang,isRTL) => {
        I18nManager.forceRTL(isRTL);
        i18n.translations = { [lang]: translationGetters[lang]() };
        i18n.locale = lang;
    };

    @action install =  async() => {
        try {
            const locale = await AsyncStorage.getItem('locale');
            if(!locale) {
                this.locale = {lang:'en',isRTL:false};
            }else {
                if(locale == 'en') {
                    this.locale = {lang:'en',isRTL:false};
                }else if(locale == 'ar') {
                    this.locale = {lang:'ar',isRTL:true}
                }
            }
            this.setI18nConfig(this.locale.lang,this.locale.isRTL);
        } catch(error) {
            console.log(error)
        } 
    }

    @action changeLanguage = async(lang,isRTL) => {
        await AsyncStorage.setItem('locale',lang);
        I18nManager.forceRTL(isRTL);
        i18n.translations = { [lang]: translationGetters[lang]() };
        i18n.locale = lang;
        Updates.reload();
    }

   constructor() {
    /*--When-Fire--*/
    this.install();
   }
}