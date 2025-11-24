const TWO_DIGIT = "2-digit";
const NUMERIC = "numeric";
const IntlOptions: Intl.DateTimeFormatOptions = {
  hour: TWO_DIGIT,
  minute: TWO_DIGIT,
  year: NUMERIC,
  month: NUMERIC,
  day: NUMERIC,
};

const formatDate = (
  timestamp: number | string,
  userLang: string = "en"
) => {
  const date = new Date(timestamp);
  return date.toLocaleString([userLang, "en"], IntlOptions);
};

export default formatDate;
