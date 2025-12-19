import { useLanguage } from '@/contexts/LanguageContext';

export const useRTL = () => {
  const { isRTL, direction } = useLanguage();

  const rtlClass = (ltrClass: string, rtlClass: string) => {
    return isRTL ? rtlClass : ltrClass;
  };

  const rtlStyle = (ltrStyle: React.CSSProperties, rtlStyle: React.CSSProperties) => {
    return isRTL ? rtlStyle : ltrStyle;
  };

  const marginX = (left: string, right: string) => {
    return isRTL ? { marginRight: left, marginLeft: right } : { marginLeft: left, marginRight: right };
  };

  const paddingX = (left: string, right: string) => {
    return isRTL ? { paddingRight: left, paddingLeft: right } : { paddingLeft: left, paddingRight: right };
  };

  const textAlign = (ltrAlign: 'left' | 'right' | 'center', rtlAlign: 'left' | 'right' | 'center') => {
    return isRTL ? rtlAlign : ltrAlign;
  };

  const flexDirection = (ltrDirection: 'row' | 'row-reverse', rtlDirection: 'row' | 'row-reverse') => {
    return isRTL ? rtlDirection : ltrDirection;
  };

  return {
    isRTL,
    direction,
    rtlClass,
    rtlStyle,
    marginX,
    paddingX,
    textAlign,
    flexDirection,
  };
};
