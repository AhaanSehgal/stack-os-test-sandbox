import { useTranslation } from 'next-i18next';
import {
  footerSocialMediasLinks as socialMedias,
  footerAnotherLinks as anotherLinks,
} from '../helpers';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mx-auto mt-24 flex max-w-[23rem] flex-col items-end px-5 sm:max-w-[33.75rem] md:max-w-[45rem] md:flex-row md:justify-between md:px-0 lg:max-w-[60rem] xl:max-w-[71.25rem]">
        <div>
          <ul className="flex text-sm font-extralight text-stk-grey-400">
            {anotherLinks.map((link) => (
              <li key={`link-${link.id}`}>
                <a
                  href={link.href}
                  target="blank"
                  className="group mr-4 flex duration-200 hover:text-stk-green"
                >
                  <i className={`fa-light ${link.icon} text-base group-hover:text-stk-green`} />
                  <p className="ml-[0.44rem]">{t(link.text)}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-7 flex space-x-6 text-2xl child:rounded-full md:mt-auto">
          {socialMedias.map((socialMedia) => (
            <li key={`socialMedia-${socialMedia.id}`}>
              <a href={socialMedia.href} target="blank">
                <i
                  className={`fa-brands ${socialMedia.icon} text-xl text-stk-grey-400 duration-300 hover:text-stk-green`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 border-t border-stk-grey-500 pt-6 text-center">
        <p className="text-sm font-normal text-stk-grey-400">{t('FOOTER_COPYRIGHT')}</p>
      </div>
    </div>
  );
};

export default Footer;
