import { type FunctionComponent } from "preact";
import formatDate from "helpers/formatDate";
import useTranslation from "hooks/useTranslation";
import useAppState from "hooks/useAppState";

const FormattedDate: FunctionComponent<IFormattedDateProps> = ({ date }) => {
  const { userLang } = useTranslation();
  const { visitorCountry } = useAppState();
  let locale = userLang || "en";
  if (userLang === "en" && visitorCountry !== "US") {
    locale = "en-GB";
  }

  return <span>{date ? formatDate(date, locale) : "---"}</span>;
};

export interface IFormattedDateProps {
  date: string;
}

export default FormattedDate;
